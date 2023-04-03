import type { Actions, Connection, Edge, GraphEdge, GraphNode, Node, State } from '~/types'

type NonUndefined<T> = T extends undefined ? never : T

export function isDef<T>(val: T): val is NonUndefined<T> {
  const unrefVal = unref(val)

  return typeof unrefVal !== 'undefined'
}

export function addEdgeToStore(edgeParams: Edge | Connection, edges: Edge[], onError: State['hooks']['error']['trigger']) {
  if (!edgeParams.source || !edgeParams.target) {
    onError(new VueFlowError(ErrorCode.EDGE_INVALID, (edgeParams as Edge).id))
    return false
  }

  let edge
  if (isEdge(edgeParams)) {
    edge = edgeParams
  } else {
    edge = {
      ...edgeParams,
      id: getEdgeId(edgeParams),
    } as Edge
  }

  edge = parseEdge(edge)

  if (connectionExists(edge, edges)) return false

  return edge
}

export function updateEdgeAction(
  edge: GraphEdge,
  newConnection: Connection,
  edges: GraphEdge[],
  findEdge: Actions['findEdge'],
  shouldReplaceId: boolean,
  onError: State['hooks']['error']['trigger'],
) {
  if (!newConnection.source || !newConnection.target) {
    onError(new VueFlowError(ErrorCode.EDGE_INVALID, edge.id))
    return false
  }

  const foundEdge = findEdge(edge.id)

  if (!foundEdge) {
    onError(new VueFlowError(ErrorCode.EDGE_NOT_FOUND, edge.id))
    return false
  }

  const { id, ...rest } = edge

  const newEdge = {
    ...rest,
    id: shouldReplaceId ? getEdgeId(newConnection) : id,
    source: newConnection.source,
    target: newConnection.target,
    sourceHandle: newConnection.sourceHandle,
    targetHandle: newConnection.targetHandle,
  }

  edges.splice(edges.indexOf(foundEdge), 1, newEdge)

  return newEdge
}

export function createGraphNodes(
  nodes: Node[],
  currGraphNodes: GraphNode[],
  findNode: Actions['findNode'],
  onError: State['hooks']['error']['trigger'],
) {
  const parentNodes: Record<string, true> = {}

  const graphNodes = nodes.map((node) => {
    const parsed = parseNode(node, {
      ...findNode(node.id),
      parentNode: node.parentNode,
    })

    if (node.parentNode) {
      parentNodes[node.parentNode] = true
    }

    return parsed
  })

  const nextNodes = [...graphNodes, ...currGraphNodes]

  graphNodes.forEach((node) => {
    const parentNode = nextNodes.find((n) => n.id === node.parentNode)

    if (node.parentNode && !parentNode) {
      onError(new VueFlowError(ErrorCode.NODE_MISSING_PARENT, node.id, node.parentNode))
    }

    if (node.parentNode || parentNodes[node.id]) {
      if (parentNodes[node.id]) {
        node.isParent = true
      }

      if (parentNode) parentNode.isParent = true
    }
  })

  return graphNodes
}
