import { markRaw, unref } from 'vue'
import type { Actions, Connection, ConnectionLookup, DefaultEdgeOptions, Edge, GraphEdge, GraphNode, Node, State } from '../types'
import { ErrorCode, VueFlowError, connectionExists, getEdgeId, isEdge, isNode, parseEdge, parseNode } from '.'

type NonUndefined<T> = T extends undefined ? never : T

export function isDef<T>(val: T): val is NonUndefined<T> {
  const unrefVal = unref(val)

  return typeof unrefVal !== 'undefined'
}

export function addEdgeToStore(
  edgeParams: Edge | Connection,
  edges: Edge[],
  triggerError: State['hooks']['error']['trigger'],
  defaultEdgeOptions?: DefaultEdgeOptions,
): GraphEdge | false {
  if (!edgeParams || !edgeParams.source || !edgeParams.target) {
    triggerError(new VueFlowError(ErrorCode.EDGE_INVALID, (edgeParams as undefined | Edge)?.id ?? `[ID UNKNOWN]`))
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

  edge = parseEdge(edge, undefined, defaultEdgeOptions)

  if (connectionExists(edge, edges)) {
    return false
  }

  return edge
}

export function updateEdgeAction(
  edge: GraphEdge,
  newConnection: Connection,
  edges: GraphEdge[],
  findEdge: Actions['findEdge'],
  shouldReplaceId: boolean,
  triggerError: State['hooks']['error']['trigger'],
) {
  if (!newConnection.source || !newConnection.target) {
    triggerError(new VueFlowError(ErrorCode.EDGE_INVALID, edge.id))
    return false
  }

  const foundEdge = findEdge(edge.id)

  if (!foundEdge) {
    triggerError(new VueFlowError(ErrorCode.EDGE_NOT_FOUND, edge.id))
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
  triggerError: State['hooks']['error']['trigger'],
) {
  const parentNodes: Record<string, true> = {}

  const nextNodes = nodes.reduce((nextNodes, node, currentIndex) => {
    // make sure we don't try to add invalid nodes
    if (!isNode(node)) {
      triggerError(
        new VueFlowError(ErrorCode.NODE_INVALID, (node as undefined | Record<any, any>)?.id) ||
          `[ID UNKNOWN|INDEX ${currentIndex}]`,
      )
      return nextNodes
    }

    const parsed = parseNode(node, findNode(node.id), node.parentNode)

    if (node.parentNode) {
      parentNodes[node.parentNode] = true
    }

    return nextNodes.concat(parsed)
  }, [] as GraphNode[])

  const allNodes = [...nextNodes, ...currGraphNodes]

  for (const node of nextNodes) {
    const parentNode = allNodes.find((n) => n.id === node.parentNode)

    if (node.parentNode && !parentNode) {
      triggerError(new VueFlowError(ErrorCode.NODE_MISSING_PARENT, node.id, node.parentNode))
    }

    if (node.parentNode || parentNodes[node.id]) {
      if (parentNodes[node.id]) {
        node.isParent = true
      }

      if (parentNode) {
        parentNode.isParent = true
      }
    }
  }

  return nextNodes
}

export function updateConnectionLookup(connectionLookup: ConnectionLookup, edges: Edge[]) {
  connectionLookup.clear()

  for (const edge of edges) {
    const { id: edgeId, source, target, sourceHandle = null, targetHandle = null } = edge

    const sourceKey = `${source}-source-${sourceHandle}`
    const targetKey = `${target}-target-${targetHandle}`

    const prevSource = connectionLookup.get(sourceKey) || new Map()
    const prevTarget = connectionLookup.get(targetKey) || new Map()
    const connection = markRaw({ edgeId, source, target, sourceHandle, targetHandle })

    connectionLookup.set(sourceKey, prevSource.set(`${target}-${targetHandle}`, connection))
    connectionLookup.set(targetKey, prevTarget.set(`${source}-${sourceHandle}`, connection))
  }
}

/**
 * We call the callback for all connections in a that are not in b
 *
 * @internal
 */
export function handleConnectionChange(
  a: Map<string, Connection>,
  b: Map<string, Connection>,
  cb?: (diff: Connection[]) => void,
) {
  if (!cb) {
    return
  }

  const diff: Connection[] = []

  for (const key of a.keys()) {
    if (!b.has(key)) {
      diff.push(a.get(key)!)
    }
  }

  if (diff.length) {
    cb(diff)
  }
}

/**
 * @internal
 */
export function areConnectionMapsEqual(a?: Map<string, Connection>, b?: Map<string, Connection>) {
  if (!a && !b) {
    return true
  }

  if (!a || !b || a.size !== b.size) {
    return false
  }

  if (!a.size && !b.size) {
    return true
  }

  for (const key of a.keys()) {
    if (!b.has(key)) {
      return false
    }
  }

  return true
}
