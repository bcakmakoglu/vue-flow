import type { Connection, Edge, GraphNode, Node } from '../types';

export function isEdge<EdgeType extends Edge = Edge>(element: unknown): element is EdgeType {
  return !!element && typeof element === 'object' && 'id' in element && 'source' in element && 'target' in element;
}

export function isNode<NodeType extends Node = Node>(element: unknown): element is NodeType {
  return !!element && typeof element === 'object' && 'id' in element && 'position' in element && !isEdge(element);
}

export function isGraphNode<NodeType extends Node = Node>(element: unknown): element is GraphNode<NodeType> {
  return isNode(element) && 'internals' in element;
}

export function connectionExists(edge: Edge | Connection, edges: Edge[]) {
  return edges.some(
    el =>
      el.source === edge.source
      && el.target === edge.target
      && (el.sourceHandle === edge.sourceHandle || (!el.sourceHandle && !edge.sourceHandle))
      && (el.targetHandle === edge.targetHandle || (!el.targetHandle && !edge.targetHandle)),
  );
}
