import type { Connection } from '@xyflow/system';
import type { Edge, GraphNode, Node } from '../types';
import { isEdgeBase, isInternalNodeBase, isNodeBase } from '@xyflow/system';

export function isEdge<EdgeType extends Edge = Edge>(element: unknown): element is EdgeType {
  return !!element && typeof element === 'object' && isEdgeBase(element);
}

export function isNode<NodeType extends Node = Node>(element: unknown): element is NodeType {
  return !!element && typeof element === 'object' && isNodeBase(element);
}

export function isGraphNode<NodeType extends Node = Node>(element: unknown): element is GraphNode<NodeType> {
  return !!element && typeof element === 'object' && isInternalNodeBase(element);
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
