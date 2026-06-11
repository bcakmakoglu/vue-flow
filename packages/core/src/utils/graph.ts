import type { Connection, DefaultEdgeOptions, Edge, GraphEdge, GraphNode, Node } from '../types'
import { isDef } from '.'

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

export function connectionExists(edge: Edge | Connection, edges: Edge[]) {
  return edges.some(
    (el) =>
      el.source === edge.source &&
      el.target === edge.target &&
      (el.sourceHandle === edge.sourceHandle || (!el.sourceHandle && !edge.sourceHandle)) &&
      (el.targetHandle === edge.targetHandle || (!el.targetHandle && !edge.targetHandle)),
  )
}
