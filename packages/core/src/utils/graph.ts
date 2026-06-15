import type { Connection, Edge, GraphNode, Node } from '../types';
import { isEdgeBase, isInternalNodeBase, isNodeBase } from '@xyflow/system';

export function isEdge<EdgeType extends Edge = Edge>(element: unknown): element is EdgeType {
  return isEdgeBase(element);
}

export function isNode<NodeType extends Node = Node>(element: unknown): element is NodeType {
  return isNodeBase(element);
}

export function isGraphNode<NodeType extends Node = Node>(element: unknown): element is GraphNode<NodeType> {
  return isInternalNodeBase(element);
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
