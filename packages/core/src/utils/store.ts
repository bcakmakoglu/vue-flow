import { unref } from 'vue'
import type {
  Actions,
  Connection,
  ConnectionLookup,
  DefaultEdgeOptions,
  Edge,
  EdgeLookup,
  GraphEdge,
  GraphNode,
  Node,
  NodeConnection,
  State,
  ValidConnectionFunc,
  VueFlowStore,
} from '../types'
import type { InternalNodeBase, NodeLookup as SystemNodeLookup, ParentLookup as SystemParentLookup } from '@xyflow/system'
import { adoptUserNodes } from '@xyflow/system'
import { ErrorCode, VueFlowError, connectionExists, getEdgeId, isEdge, isNode, parseEdge, parseNode } from '.'
import type { CoordinateExtent, NodeOrigin } from '../types'

export { areSetsEqual } from '@xyflow/system'

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
  prevEdge: GraphEdge | undefined,
  shouldReplaceId: boolean,
  triggerError: State['hooks']['error']['trigger'],
) {
  if (!newConnection.source || !newConnection.target) {
    triggerError(new VueFlowError(ErrorCode.EDGE_INVALID, edge.id))
    return false
  }

  if (!prevEdge) {
    triggerError(new VueFlowError(ErrorCode.EDGE_NOT_FOUND, edge.id))
    return false
  }

  const { id, ...rest } = edge

  return {
    ...rest,
    id: shouldReplaceId ? getEdgeId(newConnection) : id,
    source: newConnection.source,
    target: newConnection.target,
    sourceHandle: newConnection.sourceHandle,
    targetHandle: newConnection.targetHandle,
  }
}

export interface CreateGraphNodesOptions {
  nodeOrigin?: NodeOrigin
  nodeExtent?: CoordinateExtent
  elevateNodesOnSelect?: boolean
}

/**
 * Validate user nodes, run `@xyflow/system`'s `adoptUserNodes` to compute parent-aware
 * `internals.{positionAbsolute, z, rootParentIndex, handleBounds, userNode}`, then merge vue-flow's
 * own `GraphNode` defaults onto each entry. This replaces the previous `parseNode`-then-naive-watcher
 * flow so child nodes have correct absolute positions from the first paint.
 */
export function createGraphNodes<NodeType extends Node = Node>(
  nodes: NodeType[],
  findNode: Actions<NodeType>['findNode'],
  triggerError: State['hooks']['error']['trigger'],
  options?: CreateGraphNodesOptions,
): GraphNode<NodeType>[] {
  const validNodes: NodeType[] = []
  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i]

    if (!isNode(node)) {
      triggerError(
        new VueFlowError(ErrorCode.NODE_INVALID, (node as undefined | Record<any, any>)?.id) || `[ID UNKNOWN|INDEX ${i}]`,
      )
      continue
    }

    validNodes.push(node)
  }

  const lookup: SystemNodeLookup<InternalNodeBase<NodeType>> = new Map()
  const parentLookup: SystemParentLookup<InternalNodeBase<NodeType>> = new Map()
  adoptUserNodes(validNodes, lookup, parentLookup, options)

  for (const node of validNodes) {
    if (node.parentId && !lookup.has(node.parentId)) {
      triggerError(new VueFlowError(ErrorCode.NODE_MISSING_PARENT, node.id, node.parentId))
    }
  }

  // Promote each system-shaped `InternalNodeBase` into a vue-flow `GraphNode`. `parseNode` applies
  // the vue-flow defaults (`selected: false`, `dragging: false`, `data: {}` fallback, etc.) and
  // preserves the existing `GraphNode` reference when one is found via `findNode`, keeping Vue's
  // reactive subscriptions live across re-parses.
  const nextNodes: GraphNode<NodeType>[] = []
  for (const node of validNodes) {
    const internal = lookup.get(node.id)
    if (!internal) {
      continue
    }
    const parsed = parseNode(internal, findNode(node.id), node.parentId)
    nextNodes.push(parsed)
  }
  return nextNodes
}

/**
 * this function adds the connection to the connectionLookup
 * at the following keys: nodeId-type-handleId, nodeId-type and nodeId
 * @param type type of the connection
 * @param connection connection that should be added to the lookup
 * @param connectionKey at which key the connection should be added
 * @param connectionLookup reference to the connection lookup
 * @param nodeId nodeId of the connection
 * @param handleId handleId of the conneciton
 */
function addConnectionToLookup(
  type: 'source' | 'target',
  connection: NodeConnection,
  connectionKey: string,
  connectionLookup: ConnectionLookup,
  nodeId: string,
  handleId: string | null,
) {
  // We add the connection to the connectionLookup at the following keys
  // 1. nodeId, 2. nodeId-type, 3. nodeId-type-handleId
  // If the key already exists, we add the connection to the existing map
  let key = nodeId
  const nodeMap = connectionLookup.get(key) || new Map()
  connectionLookup.set(key, nodeMap.set(connectionKey, connection))

  key = `${nodeId}-${type}`
  const typeMap = connectionLookup.get(key) || new Map()
  connectionLookup.set(key, typeMap.set(connectionKey, connection))

  if (handleId) {
    key = `${nodeId}-${type}-${handleId}`
    const handleMap = connectionLookup.get(key) || new Map()
    connectionLookup.set(key, handleMap.set(connectionKey, connection))
  }
}

export function updateConnectionLookup(connectionLookup: ConnectionLookup, edgeLookup: EdgeLookup, edges: GraphEdge[]) {
  connectionLookup.clear()

  for (const edge of edges) {
    const { source: sourceNode, target: targetNode, sourceHandle = null, targetHandle = null } = edge

    const connection = { edgeId: edge.id, source: sourceNode, target: targetNode, sourceHandle, targetHandle }
    const sourceKey = `${sourceNode}-${sourceHandle}--${targetNode}-${targetHandle}`
    const targetKey = `${targetNode}-${targetHandle}--${sourceNode}-${sourceHandle}`

    addConnectionToLookup('source', connection, targetKey, connectionLookup, sourceNode, sourceHandle)
    addConnectionToLookup('target', connection, sourceKey, connectionLookup, targetNode, targetHandle)
  }
}

export { areConnectionMapsEqual, handleConnectionChange } from '@xyflow/system'

/**
 * @internal
 */
export function createGraphEdges(
  nextEdges: (Edge | Connection)[],
  isValidConnection: ValidConnectionFunc | null,
  findNode: Actions['findNode'],
  findEdge: Actions['findEdge'],
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

    const sourceNode = findNode(edge.source)
    const targetNode = findNode(edge.target)

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
      const isValid = isValidConnection(
        {
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle ?? null,
          targetHandle: edge.targetHandle ?? null,
        },
        {
          edges,
          nodes,
          sourceNode,
          targetNode,
        },
      )

      if (!isValid) {
        onError(new VueFlowError(ErrorCode.EDGE_INVALID, edge.id))
        continue
      }
    }

    const existingEdge = findEdge(edge.id)

    validEdges.push({
      ...parseEdge(edge, existingEdge, defaultEdgeOptions),
      sourceNode,
      targetNode,
    })
  }

  return validEdges
}
