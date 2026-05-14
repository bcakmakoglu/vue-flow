import type { HTMLAttributes } from 'vue'
import type { Position, Styles, XYPosition } from './flow'
import type { HandleElement, HandleType } from './handle'

/** Defined as [[x-from, y-from], [x-to, y-to]] */
export type CoordinateExtent = [extentFrom: [fromX: number, fromY: number], extentTo: [toX: number, toY: number]]

export interface CoordinateExtentRange {
  range: 'parent' | CoordinateExtent
  /** Values are top, right, bottom, left, you can use these the same as CSS padding */
  padding:
    | number
    | [padding: number]
    | [paddingY: number, paddingX: number]
    | [paddingTop: number, paddingX: number, paddingBottom: number]
    | [paddingTop: number, paddingRight: number, paddingBottom: number, paddingLeft: number]
}

/**
 * Origin of a node relative to its position. `[0, 0]` is top-left, `[0.5, 0.5]` centers it, `[1, 1]` is bottom-right.
 *
 * Locally defined (rather than re-exported from `@xyflow/system`) so the Vue SFC compiler stays out of the
 * system d.ts (its `Optional<T, K>` utility trips vuejs/core#14236). Structurally identical to system's.
 */
export type NodeOrigin = [number, number]

/**
 * Bounding box for a node — system shape.
 *
 * Locally defined; see {@link NodeOrigin}.
 */
export type NodeBounds = XYPosition & { width: number | null; height: number | null }

/**
 * Handle data attached to a node — system shape.
 *
 * Locally defined; see {@link NodeOrigin}.
 */
export interface NodeHandle {
  id?: string | null
  position: Position
  type: HandleType
  x: number
  y: number
  width?: number
  height?: number
}

export interface NodeHandleBounds {
  source: HandleElement[] | null
  target: HandleElement[] | null
}

/**
 * Node type. Defined flat (rather than extending NodeBase) so the Vue SFC compiler can resolve `NodeProps<Node<...>>` without descending into the @xyflow/system d.ts.
 */
export interface Node<
  NodeData extends Record<string, unknown> = Record<string, unknown>,
  NodeType extends string | undefined = string | undefined,
> {
  id: string
  position: XYPosition
  data: NodeData
  type?: NodeType
  sourcePosition?: Position
  targetPosition?: Position
  hidden?: boolean
  selected?: boolean
  dragging?: boolean
  draggable?: boolean
  selectable?: boolean
  connectable?: boolean
  deletable?: boolean
  dragHandle?: string
  width?: number
  height?: number
  initialWidth?: number
  initialHeight?: number
  parentId?: string
  zIndex?: number
  extent?: 'parent' | CoordinateExtent | null
  expandParent?: boolean
  ariaLabel?: string
  origin?: NodeOrigin
  handles?: NodeHandle[]
  measured?: { width?: number; height?: number }
  class?: string | string[] | Record<string, any>
  style?: Styles
  resizing?: boolean
  focusable?: boolean
  ariaRole?: string
  domAttributes?: Omit<
    HTMLAttributes,
    | 'id'
    | 'style'
    | 'className'
    | 'draggable'
    | 'aria-label'
    | 'onMouseenter'
    | 'onMousemove'
    | 'onMouseleave'
    | 'onContextmenu'
    | 'onClick'
    | 'onDblclick'
    | 'onKeydown'
  >
}
/**
 * Internal node shape used after a user-provided `Node` has been processed by the store.
 *
 * Structurally assignable to `@xyflow/system`'s `InternalNodeBase<NodeType>` so we can hand `nodeLookup`
 * to `XYResizer` / `XYDrag` / `getHandlePosition` without casts.
 *
 * Consumers should read absolute position via `internals.positionAbsolute`, z-index via `internals.z`,
 * handle bounds via `internals.handleBounds`, and dimensions via `measured`. The "is this a parent?"
 * check moved off the node and lives on `parentLookup` (storage).
 */
export type GraphNode<NodeType extends Node = Node> = Omit<NodeType, 'measured'> & {
  // inner fields are required (concrete `0` until dimensions are measured) — narrower than system's
  // optional inner shape but still assignable to `InternalNodeBase`.
  measured: { width: number; height: number }
  internals: {
    positionAbsolute: XYPosition
    z: number
    userNode: NodeType
    rootParentIndex?: number
    handleBounds?: NodeHandleBounds
    bounds?: NodeBounds
  }
}

/**
 * these props are passed to node components
 *
 * Parameterized on a `NodeType` (matching the xyflow/react convention).
 * `Node` is intentionally flat (no `extends NodeBase`) so the Vue SFC compiler can resolve
 * `NodeProps<...>` without descending into `@xyflow/system`'s d.ts.
 */
export type NodeProps<NodeType extends Node = Node> = Pick<
  NodeType,
  'id' | 'data' | 'width' | 'height' | 'sourcePosition' | 'targetPosition' | 'dragHandle' | 'parentId'
> &
  Required<Pick<NodeType, 'type' | 'dragging' | 'zIndex' | 'selectable' | 'deletable' | 'selected' | 'draggable'>> & {
    isConnectable: boolean
    positionAbsoluteX: number
    positionAbsoluteY: number
  }

export type BuiltInNode = Node<{ label: string }, 'input' | 'output' | 'default'> | Node<Record<string, never>, 'group'>
