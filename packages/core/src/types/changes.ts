import type {
  NodeDimensionChange as NodeDimensionChangeBase,
  NodePositionChange as NodePositionChangeBase,
  NodeRemoveChange as NodeRemoveChangeBase,
  NodeSelectionChange as NodeSelectionChangeBase,
} from '@xyflow/system'
import type { Dimensions, ElementData, XYPosition } from './flow'
import type { GraphNode, Node, NodeHandleBounds, NodeOrigin } from './node'
import type { GraphEdge } from './edge'

/**
 * Drag-item shape used by the drag pipeline.
 *
 * Mirrors `@xyflow/system`'s `NodeDragItem` so vue-flow's drag items are interchangeable with system
 * types. Two vue-flow-only fields remain on the shape:
 *   - `from` flows into the public `NodePositionChange.from`.
 *   - `dimensions` is read by `utils/drag.ts` (legacy alias for `measured` until the change-types
 *     family alignment in step 3).
 */
export interface NodeDragItem {
  id: string
  /** relative node position (to parent) */
  position: XYPosition
  /** distance from the mouse cursor to the node when start dragging */
  distance: XYPosition

  // system-aligned
  measured: { width: number; height: number }
  internals: { positionAbsolute: XYPosition }

  // shared / optional
  extent?: Node['extent']
  expandParent?: boolean
  dragging?: boolean
  origin?: NodeOrigin
  parentId?: string

  // vue-flow-only — still load-bearing for the change pipeline
  /** drag origin in flow coordinates (consumed by `NodePositionChange.from`) */
  from: XYPosition
  /** drag-start dimensions snapshot (consumed by `utils/drag.ts`) */
  dimensions: Dimensions
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
