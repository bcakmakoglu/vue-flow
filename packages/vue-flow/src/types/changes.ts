import type { Dimensions, ElementData, XYPosition, XYZPosition } from './flow'
import type { GraphNode, Node, NodeHandleBounds } from './node'
import type { GraphEdge } from './edge'

export interface NodeDragItem {
  id: string
  // relative node position
  position: XYPosition
  // absolute position
  computedPosition: XYZPosition
  // distance from the mouse cursor to the node when start dragging
  distance: XYPosition
  dimensions: Dimensions
  extent?: Node['extent']
  parentNode?: string
}

export interface NodeDimensionChange {
  id: string
  type: 'dimensions'
  dimensions: Dimensions
  handleBounds?: NodeHandleBounds
}

export interface NodePositionChange {
  id: string
  type: 'position'
  position: XYPosition
  computedPosition: XYPosition
  dragging: boolean
}

export interface NodeSelectionChange {
  id: string
  type: 'select'
  selected: boolean
}

export interface NodeRemoveChange {
  id: string
  type: 'remove'
}

export interface NodeAddChange<Data = ElementData> {
  item: GraphNode<Data>
  type: 'add'
}

export type NodeChange = NodeDimensionChange | NodePositionChange | NodeSelectionChange | NodeRemoveChange | NodeAddChange

export type EdgeSelectionChange = NodeSelectionChange

export type EdgeRemoveChange = NodeRemoveChange

export interface EdgeAddChange<Data = ElementData> {
  item: GraphEdge<Data>
  type: 'add'
}

export type EdgeChange = EdgeSelectionChange | EdgeRemoveChange | EdgeAddChange

export type ElementChange = NodeChange | EdgeChange
