import type { HTMLAttributes } from 'vue'
import type { InternalNodeBase, NodeBase, NodeProps as NodePropsBase } from '@xyflow/system'
import type { Dimensions, Styles, XYZPosition } from './flow'
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

export type Node<
  NodeData extends Record<string, unknown> = Record<string, unknown>,
  NodeType extends string | undefined = string | undefined,
> = NodeBase<NodeData, NodeType> & {
  /** define node extent, i.e. area in which node can be moved */
  // extent?: CoordinateExtent | CoordinateExtentRange | 'parent'
  /** expands parent area to fit child node */
  expandParent?: boolean
  /**
   * todo: rename to `parentId` in next major release
   * define node as a child node by setting a parent node id
   */
  parentNode?: string
  /** Additional class names, can be a string or a callback returning a string (receives current flow element) */
  class?: string | string[] | Record<string, any>
  /** Additional styles, can be an object or a callback returning an object (receives current flow element) */
  style?: Styles
  resizing?: boolean
  focusable?: boolean
  /**
   * The ARIA role attribute for the node element, used for accessibility.
   * @default "group"
   */
  ariaRole?: string

  /**
   * General escape hatch for adding custom attributes to the node's DOM element.
   */
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
export type GraphNode<NodeType extends Node = Node> = InternalNodeBase<NodeType> & {
  /** absolute position in relation to parent elements + z-index */
  computedPosition: XYZPosition
  handleBounds: NodeHandleBounds
  /** node width, height */
  dimensions: Dimensions
  isParent: boolean
}

/** these props are passed to node components */
export type NodeProps<NodeType extends Node = Node> = NodePropsBase<NodeType>

export type BuiltInNode = Node<{ label: string }, 'input' | 'output' | 'default'> | Node<Record<string, never>, 'group'>
