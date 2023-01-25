import { ConnectionMode } from '~/types'
import type { Connection, GraphNode, HandleType, NodeHandleBounds, ValidConnectionFunc, XYPosition } from '~/types'

export interface ConnectionHandle {
  id: string | null
  type: HandleType
  nodeId: string
  x: number
  y: number
}

// this functions collects all handles and adds an absolute position
// so that we can later find the closest handle to the mouse position
export function getHandles(
  node: GraphNode,
  handleBounds: NodeHandleBounds,
  type: HandleType,
  currentHandle: string,
): ConnectionHandle[] {
  return (handleBounds[type] || []).reduce<ConnectionHandle[]>((res, h) => {
    if (`${node.id}-${h.id}-${type}` !== currentHandle) {
      res.push({
        id: h.id || null,
        type,
        nodeId: node.id,
        x: (node.computedPosition?.x ?? 0) + h.x + h.width / 2,
        y: (node.computedPosition?.y ?? 0) + h.y + h.height / 2,
      })
    }
    return res
  }, [])
}

export function getClosestHandle(
  pos: XYPosition,
  connectionRadius: number,
  handles: ConnectionHandle[],
): ConnectionHandle | null {
  let closestHandle: ConnectionHandle | null = null
  let minDistance = Infinity

  handles.forEach((handle) => {
    const distance = Math.sqrt((handle.x - pos.x) ** 2 + (handle.y - pos.y) ** 2)
    if (distance <= connectionRadius && distance < minDistance) {
      minDistance = distance
      closestHandle = handle
    }
  })

  return closestHandle
}

interface Result {
  handleDomNode: Element | null
  isValid: boolean
  connection: Connection
}

// checks if  and returns connection in fom of an object { source: 123, target: 312 }
export function isValidHandle(
  handle: Pick<ConnectionHandle, 'nodeId' | 'id' | 'type'>,
  connectionMode: ConnectionMode,
  fromNodeId: string,
  fromHandleId: string | null,
  fromType: string,
  isValidConnection: ValidConnectionFunc,
  doc: Document | ShadowRoot,
) {
  const { edges, findNode } = useVueFlow()

  const isTarget = fromType === 'target'
  const handleDomNode = doc.querySelector(`.vue-flow__handle[data-id="${handle?.nodeId}-${handle?.id}-${handle?.type}"]`)
  const result: Result = {
    handleDomNode,
    isValid: false,
    connection: { source: '', target: '', sourceHandle: null, targetHandle: null },
  }

  if (handleDomNode) {
    const handleIsTarget = handle.type === 'target'
    const handleIsSource = handle.type === 'source'
    const handleNodeId = handleDomNode.getAttribute('data-nodeid')
    const handleId = handleDomNode.getAttribute('data-handleid')

    const connection: Connection = {
      source: isTarget ? handle.nodeId : fromNodeId,
      sourceHandle: isTarget ? handle.id : fromHandleId,
      target: isTarget ? fromNodeId : handle.nodeId,
      targetHandle: isTarget ? fromHandleId : handle.id,
    }

    result.connection = connection

    // in strict mode we don't allow target to target or source to source connections
    const isValid =
      connectionMode === ConnectionMode.Strict
        ? (isTarget && handleIsSource) || (!isTarget && handleIsTarget)
        : handleNodeId !== fromNodeId || handleId !== fromHandleId

    if (isValid) {
      result.isValid = isValidConnection(connection, {
        edges: edges.value,
        sourceNode: findNode(connection.source)!,
        targetNode: findNode(connection.target)!,
      })
    }
  }

  return result
}

interface GetHandleLookupParams {
  nodes: GraphNode[]
  nodeId: string
  handleId: string | null
  handleType: string
}

export function getHandleLookup({ nodes, nodeId, handleId, handleType }: GetHandleLookupParams) {
  return nodes.reduce<ConnectionHandle[]>((res, node) => {
    const { handleBounds } = node
    let sourceHandles: ConnectionHandle[] = []
    let targetHandles: ConnectionHandle[] = []

    if (handleBounds) {
      sourceHandles = getHandles(node, handleBounds, 'source', `${nodeId}-${handleId}-${handleType}`)
      targetHandles = getHandles(node, handleBounds, 'target', `${nodeId}-${handleId}-${handleType}`)
    }

    res.push(...sourceHandles, ...targetHandles)
    return res
  }, [])
}

export function getHandleType(edgeUpdaterType: HandleType | undefined, handleDomNode: Element | null): HandleType | null {
  if (edgeUpdaterType) {
    return edgeUpdaterType
  } else if (handleDomNode?.classList.contains('target')) {
    return 'target'
  } else if (handleDomNode?.classList.contains('source')) {
    return 'source'
  }

  return null
}

export function resetRecentHandle(handleDomNode: Element): void {
  handleDomNode?.classList.remove('vue-flow__handle-valid')
  handleDomNode?.classList.remove('vue-flow__handle-connecting')
}

export const isMouseEvent = (event: MouseEvent | TouchEvent): event is MouseEvent => 'clientX' in event

export const getEventPosition = (event: MouseEvent | TouchEvent, bounds?: DOMRect) => {
  const isMouseTriggered = isMouseEvent(event)
  const evtX = isMouseTriggered ? event.clientX : event.touches?.[0].clientX
  const evtY = isMouseTriggered ? event.clientY : event.touches?.[0].clientY

  return {
    x: evtX - (bounds?.left ?? 0),
    y: evtY - (bounds?.top ?? 0),
  }
}
