import type {
  NodeDimensionChange as NodeDimensionChangeBase,
  NodePositionChange as NodePositionChangeBase,
  NodeRemoveChange as NodeRemoveChangeBase,
  NodeSelectionChange as NodeSelectionChangeBase,
} from '@xyflow/system'
import type { Dimensions, ElementData, XYPosition } from './flow'
import type { GraphNode, Node, NodeHandleBounds } from './node'
import type { GraphEdge } from './edge'

export interface NodeDragItem {
  id: string
  // relative node position (to parent)
  position: XYPosition
  // distance from the mouse cursor to the node when start dragging
  distance: XYPosition
  dimensions: Dimensions
  from: XYPosition
  extent?: Node['extent']
  parentNode?: string
  expandParent?: boolean
}

export type NodeDimensionChange = NodeDimensionChangeBase & {
  handleBounds?: NodeHandleBounds
  updateStyle?: boolean
}

export type NodePositionChange = NodePositionChangeBase & {
  position: XYPosition
  from: XYPosition
}

export type NodeSelectionChange = NodeSelectionChangeBase

export type NodeRemoveChange = NodeRemoveChangeBase

export interface NodeAddChange<NodeType extends Node = Node> {
  item: GraphNode<NodeType>
  type: 'add'
}

export type NodeChange<NodeType extends Node = Node> =
  | NodeDimensionChange
  | NodePositionChange
  | NodeSelectionChange
  | NodeRemoveChange
  | NodeAddChange<NodeType>

export type EdgeSelectionChange = NodeSelectionChange

export type EdgeRemoveChange = NodeRemoveChangeBase & {
  source: string
  target: string
  sourceHandle: string | null
  targetHandle: string | null
}

export interface EdgeAddChange<Data = ElementData> {
  item: GraphEdge<Data>
  type: 'add'
}

export type EdgeChange = EdgeSelectionChange | EdgeRemoveChange | EdgeAddChange

export type ElementChange = NodeChange | EdgeChange
