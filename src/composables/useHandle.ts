import useVueFlow from './useVueFlow'
import { getHostForElement } from '~/utils'
import { Connection, ConnectionMode, HandleType, FlowStore, ValidConnectionFunc } from '~/types'

type Result = {
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
  isValidConnection: ValidConnectionFunc,
  doc: Document,
) => {
  const elementBelow = doc.elementFromPoint(event.clientX, event.clientY)
  const elementBelowIsTarget = elementBelow?.classList.contains('target') || false
  const elementBelowIsSource = elementBelow?.classList.contains('source') || false

  const result: Result = {
    elementBelow,
    isValid: false,
    connection: { source: null, target: null, sourceHandle: null, targetHandle: null },
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
      const connection: Connection = isTarget
        ? {
            source: elementBelowNodeId,
            sourceHandle: elementBelowHandleId,
            target: nodeId,
            targetHandle: handleId,
          }
        : {
            source: nodeId,
            sourceHandle: handleId,
            target: elementBelowNodeId,
            targetHandle: elementBelowHandleId,
          }

      result.connection = connection
      result.isValid = isValidConnection(connection)
    }
  }

  return result
}

const resetRecentHandle = (hoveredHandle: Element): void => {
  hoveredHandle?.classList.remove('vue-flow__handle-valid')
  hoveredHandle?.classList.remove('vue-flow__handle-connecting')
}

export default (store: FlowStore = useVueFlow().store) => {
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
    const flowNode = (event.target as Element).closest('.vue-flow')
    const doc = getHostForElement(event.target as HTMLElement)
    if (!doc) return

    let validConnectFunc: ValidConnectionFunc = isValidConnection ?? (() => true)
    const node = store.getNode(nodeId)

    if (node && (typeof node.connectable === 'undefined' ? store.nodesConnectable : node.connectable) === false) return
    if (!isValidConnection) {
      if (node) validConnectFunc = (!isTarget ? node.isValidTargetPos : node.isValidSourcePos) ?? (() => true)
    }
    const elementBelow = doc.elementFromPoint(event.clientX, event.clientY)
    const elementBelowIsTarget = elementBelow?.classList.contains('target')
    const elementBelowIsSource = elementBelow?.classList.contains('source')

    if (!flowNode || (!elementBelowIsTarget && !elementBelowIsSource && !elementEdgeUpdaterType)) return

    const handleType = elementEdgeUpdaterType ?? (elementBelowIsTarget ? 'target' : 'source')
    const containerBounds = flowNode.getBoundingClientRect()

    store.setState({
      connectionPosition: {
        x: event.clientX - containerBounds.left,
        y: event.clientY - containerBounds.top,
      },
      connectionNodeId: nodeId,
      connectionHandleId: handleId,
      connectionHandleType: handleType,
    })

    store.hooks.connectStart.trigger({ event, nodeId, handleId, handleType })

    function onMouseMove(event: MouseEvent) {
      store.connectionPosition.x = event.clientX - containerBounds.left
      store.connectionPosition.y = event.clientY - containerBounds.top

      const { connection, elementBelow, isValid, isHoveringHandle } = checkElementBelowIsValid(
        event,
        store.connectionMode,
        isTarget,
        nodeId,
        handleId,
        validConnectFunc,
        doc,
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
        store.connectionMode,
        isTarget,
        nodeId,
        handleId,
        validConnectFunc,
        doc,
      )

      store.hooks.connectStop.trigger(event)
      const isOwnHandle = connection.source === connection.target

      if (isValid && !isOwnHandle) {
        onEdgeUpdate?.(connection)
      }

      store.hooks.connectEnd.trigger(event)

      if (elementEdgeUpdaterType) onEdgeUpdateEnd?.()

      resetRecentHandle(recentHoveredHandle)
      store.setState({
        connectionNodeId: null,
        connectionHandleId: null,
        connectionHandleType: null,
        connectionPosition: { x: NaN, y: NaN },
      })

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
    if (!store.connectOnClick) return
    if (!store.connectionStartHandle) {
      store.hooks.connectStart.trigger({ event, nodeId, handleId, handleType })
      store.setState({ connectionStartHandle: { nodeId, type: handleType, handleId } })
    } else {
      let validConnectFunc: ValidConnectionFunc = isValidConnection ?? (() => true)
      const node = store.getNode(nodeId)

      if (node && (typeof node.connectable === 'undefined' ? store.nodesConnectable : node.connectable) === false) return
      if (!isValidConnection) {
        if (node) validConnectFunc = (handleType !== 'target' ? node.isValidTargetPos : node.isValidSourcePos) ?? (() => true)
      }
      const doc = getHostForElement(event.target as HTMLElement)
      const { connection, isValid } = checkElementBelowIsValid(
        event as MouseEvent,
        store.connectionMode,
        store.connectionStartHandle.type === 'target',
        store.connectionStartHandle.nodeId,
        store.connectionStartHandle.handleId || null,
        validConnectFunc,
        doc,
      )

      const isOwnHandle = connection.source === connection.target

      store.hooks.connectStop.trigger(event)

      if (isValid && !isOwnHandle) store.hooks.connect.trigger(connection)

      store.hooks.connectEnd.trigger(event)

      store.setState({ connectionStartHandle: null })
    }
  }

  return {
    onMouseDown,
    onClick,
  }
}
