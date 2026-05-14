import type { HTMLAttributes } from 'vue'
import type { Dimensions, Position, Styles, XYPosition, XYZPosition } from './flow'
import type { HandleElement } from './handle'

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
  origin?: [number, number]
  handles?: any[]
  measured?: { width?: number; height?: number }
  /**
   * todo: rename to `parentId` in next major release
   * define node as a child node by setting a parent node id
   */
  parentNode?: string
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
export type GraphNode<NodeType extends Node = Node> = Omit<NodeType, 'measured'> & {
  /** absolute position in relation to parent elements + z-index */
  computedPosition: XYZPosition
  handleBounds: NodeHandleBounds
  /** node width, height */
  dimensions: Dimensions
  isParent: boolean
  measured: { width: number; height: number }
  internals: { positionAbsolute: XYPosition; z: number; userNode: NodeType; handleBounds?: { source: any[] | null; target: any[] | null } | null }
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
