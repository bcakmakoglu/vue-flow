import type { MaybeRef } from '@vueuse/core'
import { isFunction } from '@vueuse/core'
import type { Connection, Getters, GraphEdge, HandleType, ValidConnectionFunc, XYPosition } from '~/types'
import { ConnectionMode } from '~/types'

interface Result {
  elementBelow: Element | null
  isValid: boolean
  connection: Connection
  isHoveringHandle: boolean
}

interface UseHandleProps {
  handleId: MaybeRef<string | null>
  nodeId: MaybeRef<string>
  type: MaybeRef<HandleType>
  isValidConnection?: ValidConnectionFunc
  elementEdgeUpdaterType?: MaybeRef<HandleType>
  onEdgeUpdate?: (connection: Connection) => void
  onEdgeUpdateEnd?: () => void
}

// checks if element below mouse is a handle and returns connection in form of an object { source: 123, target: 312 }
export const checkElementBelowIsValid = (
  event: MouseEvent | TouchEvent,
  connectionMode: ConnectionMode,
  isTarget: boolean,
  nodeId: string,
  handleId: string | null,
  isValidConnection: ValidConnectionFunc | undefined,
  doc: Document,
  edges: GraphEdge[],
  getNode: Getters['getNode'],
) => {
  const clientX = (event as TouchEvent).touches ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX
  const clientY = (event as TouchEvent).touches ? (event as TouchEvent).touches[0].clientY : (event as MouseEvent).clientY

  const elementBelow = doc.elementFromPoint(clientX, clientY)
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

/**
 * This composable can be used to create custom Handle components
 *
 * It provides an `onClick` and `onMouseDown` handler that you can bind to your custom handle, so it will behave like the default handle.
 *
 */
export default function useHandle({
  handleId,
  nodeId,
  isValidConnection,
  type,
  elementEdgeUpdaterType,
  onEdgeUpdateEnd,
  onEdgeUpdate,
}: UseHandleProps) {
  const {
    edges,
    connectOnClick,
    nodesConnectable,
    connectionClickStartHandle,
    connectionMode,
    emits,
    startConnection,
    updateConnection,
    endConnection,
    getNode,
    vueFlowRef,
  } = $(useVueFlow())

  const isTarget = $computed(() => unref(type) === 'target')

  let recentHoveredHandle: Element

  const onMouseDown = (event: MouseEvent) => {
    if (event.button !== 0) return

    const doc = getHostForElement(event.target as HTMLElement)
    if (!doc) return

    let validConnectFunc = isValidConnection

    const node = getNode(unref(nodeId))

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
        nodeId: unref(nodeId),
        handleId: unref(handleId),
        type: unref(handleType),
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
        unref(isTarget),
        unref(nodeId),
        unref(handleId),
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
        unref(isTarget),
        unref(nodeId),
        unref(handleId),
        validConnectFunc,
        doc,
        edges,
        getNode,
      )

      const isOwnHandle = connection.source === connection.target

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

  const lastTouchPos = ref<XYPosition>({ x: 0, y: 0 })

  const onTouchStart = (event: TouchEvent) => {
    const clientX = event.touches[0].clientX
    const clientY = event.touches[0].clientY

    const doc = getHostForElement(event.target as HTMLElement)
    if (!doc) return

    let validConnectFunc = isValidConnection

    const node = getNode(unref(nodeId))

    if (node && (typeof node.connectable === 'undefined' ? nodesConnectable : node.connectable) === false) return

    if (!isValidConnection) {
      if (node) validConnectFunc = !isTarget ? node.isValidTargetPos : node.isValidSourcePos
    }

    const elementBelow = doc.elementFromPoint(clientX, clientY)
    const elementBelowIsTarget = elementBelow?.classList.contains('target')
    const elementBelowIsSource = elementBelow?.classList.contains('source')

    if (!vueFlowRef || (!elementBelowIsTarget && !elementBelowIsSource && !elementEdgeUpdaterType)) return

    const handleType = elementEdgeUpdaterType ?? (elementBelowIsTarget ? 'target' : 'source')

    const containerBounds = vueFlowRef.getBoundingClientRect()

    startConnection(
      {
        nodeId: unref(nodeId),
        handleId: unref(handleId),
        type: unref(handleType),
      },
      {
        x: clientX - containerBounds.left,
        y: clientY - containerBounds.top,
      },
      event,
    )

    function onTouchMove(event: TouchEvent) {
      updateConnection({
        x: event.touches[0].clientX - containerBounds.left,
        y: event.touches[0].clientY - containerBounds.top,
      })

      lastTouchPos.value = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      }

      const { connection, elementBelow, isValid, isHoveringHandle } = checkElementBelowIsValid(
        event,
        connectionMode,
        unref(isTarget),
        unref(nodeId),
        unref(handleId),
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

    function onTouchEnd(event: TouchEvent) {
      const { connection, isValid } = checkElementBelowIsValid(
        { clientX: lastTouchPos.value.x, clientY: lastTouchPos.value.y } as unknown as MouseEvent,
        connectionMode,
        unref(isTarget),
        unref(nodeId),
        unref(handleId),
        validConnectFunc,
        doc,
        edges,
        getNode,
      )

      const isOwnHandle = connection.source === connection.target

      if (isValid && !isOwnHandle) {
        if (!onEdgeUpdate) emits.connect(connection)
        else onEdgeUpdate(connection)
      }

      if (elementEdgeUpdaterType) onEdgeUpdateEnd?.()

      resetRecentHandle(recentHoveredHandle)

      endConnection(event)

      lastTouchPos.value = { x: 0, y: 0 }

      doc.removeEventListener('touchmove', onTouchMove as EventListenerOrEventListenerObject)
      doc.removeEventListener('touchend', onTouchEnd as EventListenerOrEventListenerObject)
    }

    doc.addEventListener('touchmove', onTouchMove as EventListenerOrEventListenerObject)
    doc.addEventListener('touchend', onTouchEnd as EventListenerOrEventListenerObject)
  }

  const onClick = (event: MouseEvent) => {
    if (!connectOnClick) return

    if (!connectionClickStartHandle) {
      startConnection({ nodeId: unref(nodeId), type: unref(type), handleId: unref(handleId) }, undefined, event, true)
    } else {
      let validConnectFunc: ValidConnectionFunc = isValidConnection ?? (() => true)

      const node = getNode(unref(nodeId))

      if (node && (typeof node.connectable === 'undefined' ? nodesConnectable : node.connectable) === false) return

      if (!isValidConnection) {
        if (node) validConnectFunc = (!isTarget ? node.isValidTargetPos : node.isValidSourcePos) ?? (() => true)
      }

      const doc = getHostForElement(event.target as HTMLElement)

      const { connection, isValid } = checkElementBelowIsValid(
        event as MouseEvent,
        connectionMode,
        connectionClickStartHandle.type === 'target',
        connectionClickStartHandle.nodeId,
        connectionClickStartHandle.handleId || null,
        validConnectFunc,
        doc,
        edges,
        getNode,
      )

      const isOwnHandle = connection.source === connection.target

      if (isValid && !isOwnHandle) emits.connect(connection)

      endConnection(event, true)
    }
  }

  return {
    onMouseDown,
    onTouchStart,
    onClick,
  }
}
