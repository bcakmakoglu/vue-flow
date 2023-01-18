import type { Actions, Connection, Edge, GraphEdge, GraphNode, Node } from '~/types'

export const isDef = <T>(val: T): val is NonNullable<T> => typeof unref(val) !== 'undefined'

export const addEdgeToStore = (edgeParams: Edge | Connection, edges: Edge[]) => {
  if (!edgeParams.source || !edgeParams.target) {
    warn("Can't create edge. An edge needs a source and a target.")
    return false
  }

  let edge
  if (isEdge(edgeParams)) {
    edge = { ...edgeParams }
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

export const updateEdgeAction = (edge: GraphEdge, newConnection: Connection, edges: GraphEdge[]) => {
  if (!newConnection.source || !newConnection.target) {
    warn("Can't create new edge. An edge needs a source and a target.")
    return false
  }

  const foundEdge = edges.find((e) => isGraphEdge(e) && e.id === edge.id)

  if (!foundEdge) {
    warn(`The old edge with id=${edge.id} does not exist.`)
    return false
  }

  const newEdge = {
    ...edge,
    id: getEdgeId(newConnection),
    source: newConnection.source,
    target: newConnection.target,
    sourceHandle: newConnection.sourceHandle,
    targetHandle: newConnection.targetHandle,
  }

  edges.splice(edges.indexOf(foundEdge), 1, newEdge)

  return newEdge
}

export const createGraphNodes = (nodes: Node[], findNode: Actions['findNode'], currGraphNodes: GraphNode[]) => {
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

  graphNodes.forEach((node) => {
    const nextNodes = [...graphNodes, ...currGraphNodes]

    const parentNode = nextNodes.find((n) => n.id === node.parentNode)

    if (node.parentNode && !parentNode) {
      warn(`Parent node ${node.parentNode} not found`)
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
