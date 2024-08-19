import type { Dimensions, ElementData, Position, Styles, XYPosition, XYZPosition } from './flow'
import type { HandleConnectable, HandleElement } from './handle'

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
  source?: HandleElement[]
  target?: HandleElement[]
}

export interface Node<Data = ElementData, Type extends string = string> {
  /** Unique node id */
  id: string
  /** initial node position x, y */
  position: XYPosition
  /** node type, can be a default type or a custom type */
  type?: Type
  /** handle position */
  targetPosition?: Position
  /** handle position */
  sourcePosition?: Position
  /** Disable/enable dragging node */
  draggable?: boolean
  /** Disable/enable selecting node */
  selectable?: boolean
  /** Disable/enable connecting node */
  connectable?: HandleConnectable
  /** Disable/enable focusing node (a11y) */
  focusable?: boolean
  /** Disable/enable deleting node */
  deletable?: boolean
  /** element selector as drag handle for node (can only be dragged from the dragHandle el) */
  dragHandle?: string
  /** define node extent, i.e. area in which node can be moved */
  extent?: CoordinateExtent | CoordinateExtentRange | 'parent'
  /** expands parent area to fit child node */
  expandParent?: boolean
  /**
   * todo: rename to `parentId` in next major release
   * define node as a child node by setting a parent node id
   */
  parentNode?: string
  /**
   * Fixed width of node, applied as style
   * You can pass a number which will be used in pixel values (width: 300 -> width: 300px)
   * or pass a string with units (width: `10rem` -> width: 10rem)
   */
  width?: number | string
  /**
   * Fixed height of node, applied as style
   * You can pass a number which will be used in pixel values (height: 300 -> height: 300px)
   * or pass a string with units (height: `10rem` -> height: 10rem)
   */
  height?: number | string

  /** Additional class names, can be a string or a callback returning a string (receives current flow element) */
  class?: string | string[] | Record<string, any>
  /** Additional styles, can be an object or a callback returning an object (receives current flow element) */
  style?: Styles
  /** Is node hidden */
  hidden?: boolean
  /** Additional data that is passed to your custom components */
  data?: Data
  zIndex?: number
  ariaLabel?: string
}

export interface GraphNode<Data = ElementData, Type extends string = string> extends Node<Data, Type> {
  /** absolute position in relation to parent elements + z-index */
  computedPosition: XYZPosition
  handleBounds: NodeHandleBounds
  /** node width, height */
  dimensions: Dimensions
  isParent: boolean
  selected: boolean
  resizing: boolean
  dragging: boolean
  data: Data
  type: Type
}

/** these props are passed to node components */
export interface NodeProps<Data = ElementData, Type extends string = string> {
  /** unique node id */
  id: string
  /** node type */
  type: Type
  /** is node selected */
  selected: boolean
  /** can node handles be connected, you need to forward this to your handles for this prop to have any effect */
  connectable: HandleConnectable
  /** dom element dimensions (width, height) */
  dimensions: Dimensions
  /** parent node id */
  parentId?: string
  /** is node currently dragging */
  dragging: boolean
  /** is node currently resizing */
  resizing: boolean
  /** node z-index */
  zIndex: number
  /** handle position */
  targetPosition?: Position
  /** handle position */
  sourcePosition?: Position
  /** drag handle query selector */
  dragHandle?: string
  /** additional data of node */
  data: Data
}
