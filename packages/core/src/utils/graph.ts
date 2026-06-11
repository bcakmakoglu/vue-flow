import type { Connection, DefaultEdgeOptions, Edge, GraphEdge, GraphNode, Node } from '../types'
import { isDef } from '.'

export {
  getEventPosition,
  pointToRendererPoint,
  nodeToRect,
  getNodesBounds,
  getViewportForBounds,
  getNodesInside,
  getConnectedEdges,
} from '@xyflow/system'

export function isEdge<EdgeType extends Edge = Edge>(element: unknown): element is EdgeType {
  return !!element && typeof element === 'object' && 'id' in element && 'source' in element && 'target' in element
}

export function isGraphEdge<EdgeType extends Edge = Edge>(element: unknown): element is GraphEdge<EdgeType> {
  return isEdge(element) && 'sourceNode' in element && 'targetNode' in element
}

export function isNode<NodeType extends Node = Node>(element: unknown): element is NodeType {
  return !!element && typeof element === 'object' && 'id' in element && 'position' in element && !isEdge(element)
}

export function isGraphNode<NodeType extends Node = Node>(element: unknown): element is GraphNode<NodeType> {
  return isNode(element) && 'internals' in element
}

export function parseEdge(edge: Edge, existingEdge?: GraphEdge, defaultEdgeOptions?: DefaultEdgeOptions): GraphEdge {
  const initialState = {
    id: edge.id.toString(),
    type: edge.type ?? existingEdge?.type ?? 'default',
    source: edge.source.toString(),
    target: edge.target.toString(),
    sourceHandle: edge.sourceHandle?.toString(),
    targetHandle: edge.targetHandle?.toString(),
    updatable: edge.updatable ?? defaultEdgeOptions?.updatable,
    selectable: edge.selectable ?? defaultEdgeOptions?.selectable,
    focusable: edge.focusable ?? defaultEdgeOptions?.focusable,
    data: isDef(edge.data) ? edge.data : {},
    label: edge.label ?? '',
    interactionWidth: edge.interactionWidth ?? defaultEdgeOptions?.interactionWidth,
    ...(defaultEdgeOptions ?? {}),
  } as GraphEdge

  return Object.assign(existingEdge ?? initialState, edge, { id: edge.id.toString() }) as GraphEdge
}

export function getEdgeId({ source, sourceHandle, target, targetHandle }: Connection) {
  return `vueflow__edge-${source}${sourceHandle ?? ''}-${target}${targetHandle ?? ''}`
}

export function connectionExists(edge: Edge | Connection, edges: Edge[]) {
  return edges.some(
    (el) =>
      el.source === edge.source &&
      el.target === edge.target &&
      (el.sourceHandle === edge.sourceHandle || (!el.sourceHandle && !edge.sourceHandle)) &&
      (el.targetHandle === edge.targetHandle || (!el.targetHandle && !edge.targetHandle)),
  )
}

export function getConnectedNodes<N extends Node | { id: string } | string>(nodes: N[], edges: Edge[]) {
  const nodeIds = new Set()

  for (const node of nodes) {
    nodeIds.add(typeof node === 'string' ? node : node.id)
  }

  const connectedNodeIds = edges.reduce((acc, edge) => {
    if (nodeIds.has(edge.source)) {
      acc.add(edge.target)
    }

    if (nodeIds.has(edge.target)) {
      acc.add(edge.source)
    }

    return acc
  }, new Set())

  return nodes.filter((node) => connectedNodeIds.has(typeof node === 'string' ? node : node.id))
}
