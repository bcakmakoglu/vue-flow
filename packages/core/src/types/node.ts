import type { InternalNodeBase } from '@xyflow/system'
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
export type GraphNode<NodeType extends Node = Node> = InternalNodeBase<NodeType>

/**
 * Props passed to custom node components, parameterized on a `NodeType` (xyflow/react convention:
 * `NodeProps<MyNode>`).
 *
 * Declared as a generic **interface** with indexed access (`NodeType['data']`), NOT a `Pick`/`Required`
 * **type alias**: `@vue/compiler-sfc`'s macro resolver can instantiate generic interfaces in
 * `defineProps<NodeProps<MyNode>>()` but cannot instantiate generic utility-type aliases — the alias
 * form silently fails to resolve. (Indexed access resolves even through `NodeType['type']` when the
 * underlying type is `@xyflow/system`'s conditional `NodeBase`.)
 */
export interface NodeProps<NodeType extends Node = Node> {
  id: string
  data: NodeType['data']
  type: NodeType['type']
  selected: boolean
  selectable: boolean
  deletable: boolean
  draggable: boolean
  dragging: boolean
  zIndex: number
  isConnectable: boolean
  positionAbsoluteX: number
  positionAbsoluteY: number
  width?: NodeType['width']
  height?: NodeType['height']
  sourcePosition?: NodeType['sourcePosition']
  targetPosition?: NodeType['targetPosition']
  dragHandle?: NodeType['dragHandle']
  parentId?: NodeType['parentId']
}

export type BuiltInNode = Node<{ label: string }, 'input' | 'output' | 'default'> | Node<Record<string, never>, 'group'>
