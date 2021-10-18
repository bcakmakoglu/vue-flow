import { getHostForElement } from '~/utils'
import { ElementId, ConnectionMode, Connection, HandleType, XYPosition, RevueFlowStore } from '~/types'
import { RevueFlowHooks } from '~/hooks/RevueFlowHooks'

export type ValidConnectionFunc = (connection: Connection) => boolean

type Result = {
  elementBelow: Element | null
  isValid: boolean
  connection: Connection
  isHoveringHandle: boolean
}

// checks if element below mouse is a handle and returns connection in form of an object { source: 123, target: 312 }
function checkElementBelowIsValid(
  event: MouseEvent,
  connectionMode: ConnectionMode,
  isTarget: boolean,
  nodeId: ElementId,
  handleId: ElementId | null,
  isValidConnection: ValidConnectionFunc,
  doc: Document,
) {
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
      const elementBelowNodeId = elementBelow.getAttribute('data-nodeid')
      const elementBelowHandleId = elementBelow.getAttribute('data-handleid')
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

function resetRecentHandle(hoveredHandle: Element): void {
  hoveredHandle?.classList.remove('revue-flow__handle-valid')
  hoveredHandle?.classList.remove('revue-flow__handle-connecting')
}

export function onMouseDown(
  event: MouseEvent,
  store: RevueFlowStore,
  hooks: {
    connectStart: RevueFlowHooks['connectStart']
    connectStop: RevueFlowHooks['connectStop']
    connectEnd: RevueFlowHooks['connectEnd']
    connect: RevueFlowHooks['connect']
    edgeUpdateEnd: RevueFlowHooks['edgeUpdateEnd']
  },
  handleId: ElementId,
  nodeId: ElementId,
  isTarget: boolean,
  isValidConnection: ValidConnectionFunc = () => true,
  elementEdgeUpdaterType?: HandleType,
): void {
  const revueFlowNode = (event.target as Element).closest('.revue-flow')
  // when revue-flow is used inside a shadow root we can't use document
  const doc = getHostForElement(event.target as HTMLElement)

  if (!doc) {
    return
  }

  const elementBelow = doc.elementFromPoint(event.clientX, event.clientY)
  const elementBelowIsTarget = elementBelow?.classList.contains('target')
  const elementBelowIsSource = elementBelow?.classList.contains('source')

  if (!revueFlowNode || (!elementBelowIsTarget && !elementBelowIsSource && !elementEdgeUpdaterType)) {
    return
  }

  const handleType = elementEdgeUpdaterType || (elementBelowIsTarget ? 'target' : 'source')
  const containerBounds = revueFlowNode.getBoundingClientRect()
  let recentHoveredHandle: Element

  const connectionPosition = ref<XYPosition>({
    x: event.clientX - containerBounds.left,
    y: event.clientY - containerBounds.top,
  })

  if (!store.connectionPosition) store.connectionPosition = { x: 0, y: 0 }
  store.connectionPosition.x = event.clientX - containerBounds.left
  store.connectionPosition.y = event.clientY - containerBounds.top

  store.setConnectionNodeId({
    connectionNodeId: nodeId,
    connectionHandleId: handleId,
    connectionHandleType: handleType,
  })
  hooks.connectStart.trigger({ event, params: { nodeId, handleId, handleType } })

  function onMouseMove(event: MouseEvent) {
    connectionPosition.value.x = event.clientX - containerBounds.left
    connectionPosition.value.y = event.clientY - containerBounds.top

    const { connection, elementBelow, isValid, isHoveringHandle } = checkElementBelowIsValid(
      event,
      store.connectionMode,
      isTarget,
      nodeId,
      handleId,
      isValidConnection,
      doc,
    )

    if (!isHoveringHandle) {
      return resetRecentHandle(recentHoveredHandle)
    }

    const isOwnHandle = connection.source === connection.target

    if (!isOwnHandle && elementBelow) {
      recentHoveredHandle = elementBelow
      elementBelow.classList.add('revue-flow__handle-connecting')
      elementBelow.classList.toggle('revue-flow__handle-valid', isValid)
    }
  }

  function onMouseUp(event: MouseEvent) {
    const { connection, isValid } = checkElementBelowIsValid(
      event,
      store.connectionMode,
      isTarget,
      nodeId,
      handleId,
      isValidConnection,
      doc,
    )

    hooks.connectStop.trigger(event)

    if (isValid) {
      hooks.connect.trigger(connection)
    }

    hooks.connectEnd.trigger(event)

    if (elementEdgeUpdaterType) {
      hooks.edgeUpdateEnd.trigger({ event } as any)
    }

    resetRecentHandle(recentHoveredHandle)
    store.setConnectionNodeId({ connectionNodeId: undefined, connectionHandleId: undefined, connectionHandleType: undefined })

    doc.removeEventListener('mousemove', onMouseMove as EventListenerOrEventListenerObject)
    doc.removeEventListener('mouseup', onMouseUp as EventListenerOrEventListenerObject)
  }

  doc.addEventListener('mousemove', onMouseMove as EventListenerOrEventListenerObject)
  doc.addEventListener('mouseup', onMouseUp as EventListenerOrEventListenerObject)
}
