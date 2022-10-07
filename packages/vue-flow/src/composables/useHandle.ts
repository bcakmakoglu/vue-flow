import { isFunction } from '@vueuse/core'
import useVueFlow from './useVueFlow'
import { getHostForElement } from '~/utils'
import type { Connection, Getters, GraphEdge, HandleType, ValidConnectionFunc } from '~/types'
import { ConnectionMode } from '~/types'

interface Result {
  elementBelow: Element | null
  isValid: boolean
  connection: Connection
  isHoveringHandle: boolean
}

// checks if element below mouse is a handle and returns connection in form of an object { source: 123, target: 312 }
export const checkElementBelowIsValid = (
  event: MouseEvent,
  connectionMode: ConnectionMode,
  isTarget: boolean,
  nodeId: string,
  handleId: string | null,
  isValidConnection: ValidConnectionFunc | undefined,
  doc: Document,
  edges: GraphEdge[],
  getNode: Getters['getNode'],
) => {
  const elementBelow = doc.elementFromPoint(event.clientX, event.clientY)
  const elementBelowIsTarget = elementBelow?.classList.contains('target') || false
  const elementBelowIsSource = elementBelow?.classList.contains('source') || false

  const result: Result = {
    elementBelow,
    isValid: false,
    connection: { source: '', target: '', sourceHandle: null, targetHandle: null },
    isHoveringHandle: false,
  }

  if (elementBelow && (elementBelowIsTarget || elementBelowIsSource)) {
    result.isHoveringHandle = true

    // in strict mode we don't allow target to target or source to source connections
    const isValid =
      connectionMode === ConnectionMode.Strict ? (isTarget && elementBelowIsSource) || (!isTarget && elementBelowIsTarget) : true

    if (isValid) {
      const elementBelowNodeId = elementBelow.getAttribute('data-nodeid') ?? ''
      const elementBelowHandleId = elementBelow.getAttribute('data-handleid') ?? ''

      const sourceId = isTarget ? elementBelowNodeId : nodeId
      const sourceHandleId = isTarget ? elementBelowHandleId : handleId
      const targetId = isTarget ? nodeId : elementBelowNodeId
      const targetHandleId = isTarget ? handleId : elementBelowHandleId

      const connection: Connection = {
        source: sourceId,
        sourceHandle: sourceHandleId,
        target: targetId,
        targetHandle: targetHandleId,
      }

      result.connection = connection

      result.isValid =
        (isFunction(isValidConnection)
          ? isValidConnection(connection, { edges, sourceNode: getNode(sourceId)!, targetNode: getNode(targetId)! })
          : true) ||
        !result.connection.target ||
        !result.connection.source
    }
  }

  return result
}

const resetRecentHandle = (hoveredHandle: Element): void => {
  hoveredHandle?.classList.remove('vue-flow__handle-valid')
  hoveredHandle?.classList.remove('vue-flow__handle-connecting')
}

export default () => {
  const {
    edges,
    connectOnClick,
    nodesConnectable,
    connectionStartHandle,
    connectionMode,
    emits,
    startConnection,
    updateConnection,
    endConnection,
    getNode,
    vueFlowRef,
  } = $(useVueFlow())

  let recentHoveredHandle: Element

  const onMouseDown = (
    event: MouseEvent,
    handleId: string | null,
    nodeId: string,
    isTarget: boolean,
    isValidConnection?: ValidConnectionFunc,
    elementEdgeUpdaterType?: HandleType,
    onEdgeUpdate?: (connection: Connection) => void,
    onEdgeUpdateEnd?: () => void,
  ) => {
    const doc = getHostForElement(event.target as HTMLElement)
    if (!doc) return

    let validConnectFunc = isValidConnection

    const node = getNode(nodeId)

    if (node && (typeof node.connectable === 'undefined' ? nodesConnectable : node.connectable) === false) return

    if (!isValidConnection) {
      if (node) validConnectFunc = !isTarget ? node.isValidTargetPos : node.isValidSourcePos
    }

    const elementBelow = doc.elementFromPoint(event.clientX, event.clientY)
    const elementBelowIsTarget = elementBelow?.classList.contains('target')
    const elementBelowIsSource = elementBelow?.classList.contains('source')

    if (!vueFlowRef || (!elementBelowIsTarget && !elementBelowIsSource && !elementEdgeUpdaterType)) return

    const handleType = elementEdgeUpdaterType ?? (elementBelowIsTarget ? 'target' : 'source')

    const containerBounds = vueFlowRef.getBoundingClientRect()

    startConnection(
      {
        nodeId,
        handleId,
        type: handleType,
      },
      {
        x: event.clientX - containerBounds.left,
        y: event.clientY - containerBounds.top,
      },
      event,
    )

    function onMouseMove(event: MouseEvent) {
      updateConnection({
        x: event.clientX - containerBounds.left,
        y: event.clientY - containerBounds.top,
      })

      const { connection, elementBelow, isValid, isHoveringHandle } = checkElementBelowIsValid(
        event,
        connectionMode,
        isTarget,
        nodeId,
        handleId,
        validConnectFunc,
        doc,
        edges,
        getNode,
      )

      if (!isHoveringHandle) return resetRecentHandle(recentHoveredHandle)

      const isOwnHandle = connection.source === connection.target

      if (!isOwnHandle && elementBelow) {
        recentHoveredHandle = elementBelow
        elementBelow.classList.add('vue-flow__handle-connecting')
        elementBelow.classList.toggle('vue-flow__handle-valid', isValid)
      }
    }

    function onMouseUp(event: MouseEvent) {
      const { connection, isValid } = checkElementBelowIsValid(
        event,
        connectionMode,
        isTarget,
        nodeId,
        handleId,
        validConnectFunc,
        doc,
        edges,
        getNode,
      )

      const isOwnHandle = connection.source === connection.target

      console.log(isValid)
      if (isValid && !isOwnHandle) {
        if (!onEdgeUpdate) emits.connect(connection)
        else onEdgeUpdate(connection)
      }

      if (elementEdgeUpdaterType) onEdgeUpdateEnd?.()

      resetRecentHandle(recentHoveredHandle)

      endConnection(event)

      doc.removeEventListener('mousemove', onMouseMove as EventListenerOrEventListenerObject)
      doc.removeEventListener('mouseup', onMouseUp as EventListenerOrEventListenerObject)
    }

    doc.addEventListener('mousemove', onMouseMove as EventListenerOrEventListenerObject)
    doc.addEventListener('mouseup', onMouseUp as EventListenerOrEventListenerObject)
  }

  const onClick = (
    event: MouseEvent,
    handleId: string | null,
    nodeId: string,
    handleType: HandleType,
    isValidConnection?: ValidConnectionFunc,
  ) => {
    if (!connectOnClick) return
    if (!connectionStartHandle) {
      startConnection({ nodeId, type: handleType, handleId }, undefined, event)
    } else {
      let validConnectFunc: ValidConnectionFunc = isValidConnection ?? (() => true)

      const node = getNode(nodeId)

      if (node && (typeof node.connectable === 'undefined' ? nodesConnectable : node.connectable) === false) return

      if (!isValidConnection) {
        if (node) validConnectFunc = (handleType !== 'target' ? node.isValidTargetPos : node.isValidSourcePos) ?? (() => true)
      }

      const doc = getHostForElement(event.target as HTMLElement)

      const { connection, isValid } = checkElementBelowIsValid(
        event as MouseEvent,
        connectionMode,
        connectionStartHandle.type === 'target',
        connectionStartHandle.nodeId,
        connectionStartHandle.handleId || null,
        validConnectFunc,
        doc,
        edges,
        getNode,
      )

      const isOwnHandle = connection.source === connection.target

      if (isValid && !isOwnHandle) emits.connect(connection)

      endConnection(event)
    }
  }

  return {
    onMouseDown,
    onClick,
  }
}
