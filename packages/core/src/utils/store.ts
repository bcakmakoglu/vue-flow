import { markRaw, unref } from 'vue'
import type {
  Actions,
  Connection,
  ConnectionLookup,
  DefaultEdgeOptions,
  Edge,
  GraphEdge,
  GraphNode,
  HandleConnection,
  Node,
  State,
  ValidConnectionFunc,
  VueFlowStore,
} from '../types'
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
  getEdge: Actions['getEdge'],
  shouldReplaceId: boolean,
  triggerError: State['hooks']['error']['trigger'],
) {
  if (!newConnection.source || !newConnection.target) {
    triggerError(new VueFlowError(ErrorCode.EDGE_INVALID, edge.id))
    return false
  }

  const foundEdge = getEdge(edge.id)

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

export function createGraphNodes(nodes: Node[], getNode: Actions['getNode'], triggerError: State['hooks']['error']['trigger']) {
  const parentNodes: Record<string, true> = {}

  const nextNodes: GraphNode[] = []
  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i]

    if (!isNode(node)) {
      triggerError(
        new VueFlowError(ErrorCode.NODE_INVALID, (node as undefined | Record<any, any>)?.id) || `[ID UNKNOWN|INDEX ${i}]`,
      )
      continue
    }

    const parsed = parseNode(node, getNode(node.id), node.parentNode)

    if (node.parentNode) {
      parentNodes[node.parentNode] = true
    }

    nextNodes[i] = parsed
  }

  for (const node of nextNodes) {
    const parentNode = getNode(node.parentNode!) || nextNodes.find((n) => n.id === node.parentNode)

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
  a: Map<string, HandleConnection>,
  b: Map<string, HandleConnection>,
  cb?: (diff: HandleConnection[]) => void,
) {
  if (!cb) {
    return
  }

  const diff: HandleConnection[] = []

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

/**
 * @internal
 */
export function createGraphEdges(
  nextEdges: (Edge | Connection)[],
  isValidConnection: ValidConnectionFunc | null,
  getNode: Actions['getNode'],
  getEdge: Actions['getEdge'],
  onError: VueFlowStore['emits']['error'],
  defaultEdgeOptions: DefaultEdgeOptions | undefined,
  nodes: GraphNode[],
  edges: GraphEdge[],
) {
  const validEdges: GraphEdge[] = []

  for (const edgeOrConnection of nextEdges) {
    const edge = isEdge(edgeOrConnection)
      ? edgeOrConnection
      : addEdgeToStore(edgeOrConnection, edges, onError, defaultEdgeOptions)

    if (!edge) {
      continue
    }

    const sourceNode = getNode(edge.source)
    const targetNode = getNode(edge.target)

    if (!sourceNode || !targetNode) {
      onError(new VueFlowError(ErrorCode.EDGE_SOURCE_TARGET_MISSING, edge.id, edge.source, edge.target))
      continue
    }

    if (!sourceNode) {
      onError(new VueFlowError(ErrorCode.EDGE_SOURCE_MISSING, edge.id, edge.source))
      continue
    }

    if (!targetNode) {
      onError(new VueFlowError(ErrorCode.EDGE_TARGET_MISSING, edge.id, edge.target))
      continue
    }

    if (isValidConnection) {
      const isValid = isValidConnection(edge, {
        edges,
        nodes,
        sourceNode,
        targetNode,
      })

      if (!isValid) {
        onError(new VueFlowError(ErrorCode.EDGE_INVALID, edge.id))
        continue
      }
    }

    const existingEdge = getEdge(edge.id)

    validEdges.push(parseEdge(edge, existingEdge, defaultEdgeOptions))
  }

  return validEdges
}
