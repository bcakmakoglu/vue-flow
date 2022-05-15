import type { Dimensions, ElementData, XYPosition } from './flow'
import type { Node, NodeHandleBounds } from './node'
import type { Edge } from './edge'

export interface NodeDimensionChange {
  id: string
  type: 'dimensions'
  dimensions: Dimensions
  handleBounds?: NodeHandleBounds
}

export interface NodePositionChange {
  id: string
  type: 'position'
  position?: XYPosition
  dragging?: boolean
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
  item: Node<Data>
  type: 'add'
}

export interface NodeResetChange<Data = ElementData> {
  item: Node<Data>
  type: 'reset'
}

export type NodeChange =
  | NodeDimensionChange
  | NodePositionChange
  | NodeSelectionChange
  | NodeRemoveChange
  | NodeAddChange
  | NodeResetChange

export type EdgeSelectionChange = NodeSelectionChange
export type EdgeRemoveChange = NodeRemoveChange
export interface EdgeAddChange<Data = ElementData> {
  item: Edge<Data>
  type: 'add'
}
export interface EdgeResetChange<Data = ElementData> {
  item: Edge<Data>
  type: 'reset'
}
export type EdgeChange = EdgeSelectionChange | EdgeRemoveChange | EdgeAddChange | EdgeResetChange
export type ElementChange = NodeChange | EdgeChange
