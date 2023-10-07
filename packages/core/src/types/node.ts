import type { Component, VNode } from 'vue'
import type { Dimensions, NodeHandleBounds, Position, XYPosition, XYZPosition } from '@xyflow/system'
import type { ClassFunc, ElementData, StyleFunc, Styles } from './flow'
import type { NodeComponent } from './components'
import type { HandleConnectable, ValidConnectionFunc } from './handle'
import type { CustomEvent, NodeEventsHandler, NodeEventsOn } from './hooks'

/** Defined as [[x-from, y-from], [x-to, y-to]] **/
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

/** @deprecated will be removed in next major release */
export type WidthFunc = (node: GraphNode) => number | string | void

/** @deprecated will be removed in next major release */
export type HeightFunc = (node: GraphNode) => number | string | void

export interface Node<Data = ElementData, CustomEvents extends Record<string, CustomEvent> = any, Type extends string = string> {
  /** Unique node id */
  id: string
  /** A node label */
  label?: string | VNode | Component
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
  /** @deprecated will be removed in next major release */
  /** called when used as target for new connection */
  isValidTargetPos?: ValidConnectionFunc
  /** @deprecated will be removed in next major release */
  /** called when used as source for new connection */
  isValidSourcePos?: ValidConnectionFunc
  /** define node extent, i.e. area in which node can be moved */
  extent?: CoordinateExtent | CoordinateExtentRange | 'parent'
  /** expands parent area to fit child node */
  expandParent?: boolean
  /** define node as a child node by setting a parent node id */
  parentNode?: string
  /**
   * Fixed width of node, applied as style
   * You can pass a number which will be used in pixel values (width: 300 -> width: 300px)
   * or pass a string with units (width: `10rem` -> width: 10rem)
   */
  width?: number | string | WidthFunc
  /**
   * Fixed height of node, applied as style
   * You can pass a number which will be used in pixel values (height: 300 -> height: 300px)
   * or pass a string with units (height: `10rem` -> height: 10rem)
   */
  height?: number | string | HeightFunc

  /** Additional class names, can be a string or a callback returning a string (receives current flow element) */
  class?: string | ClassFunc<GraphNode<Data, CustomEvents>>
  /** Additional styles, can be an object or a callback returning an object (receives current flow element) */
  style?: Styles | StyleFunc<GraphNode<Data, CustomEvents>>
  /** Is node hidden */
  hidden?: boolean
  /**
   * @deprecated will be removed in the next major release
   * overwrites current node type
   */
  template?: NodeComponent
  /** Additional data that is passed to your custom components */
  data?: Data
  /** contextual and custom events that are passed to your custom components */
  events?: Partial<NodeEventsHandler<CustomEvents>>
  zIndex?: number
  ariaLabel?: string
}

export interface GraphNode<
  Data = ElementData,
  CustomEvents extends Record<string, CustomEvent> = any,
  Type extends string = string,
> extends Node<Data, CustomEvents, Type> {
  /** absolute position in relation to parent elements + z-index */
  computedPosition: XYZPosition
  handleBounds: NodeHandleBounds
  /** node width, height */
  dimensions: Dimensions
  isParent: boolean
  selected: boolean
  resizing: boolean
  dragging: boolean
  initialized: boolean
  data: Data
  events: Partial<NodeEventsHandler<CustomEvents>>
  type: Type
}

/** these props are passed to node components */
export interface NodeProps<Data = ElementData, CustomEvents = {}, Type extends string = string> {
  /** unique node id */
  id: string
  /** node type */
  type: Type
  /** is node selected */
  selected: boolean
  /** can node handles be connected */
  connectable: HandleConnectable
  /** node x, y (relative) position on graph */
  position: XYPosition
  /** dom element dimensions (width, height) */
  dimensions: Dimensions
  /**
   * node label, either pass a string or a VNode
   * For example like this: `h('div', props, children)`)
   * Object is just a type-hack for Vue, ignore that
   */
  label?: string | VNode | Component | Object
  /**
   * @deprecated will be removed in next major release and replaced by just `isValidConnection` prop
   * called when used as target for new connection
   */
  isValidTargetPos?: ValidConnectionFunc
  /**
   * @deprecated will be removed in next major release and replaced by just `isValidConnection` prop
   * called when used as source for new connection
   */
  isValidSourcePos?: ValidConnectionFunc
  /**
   * todo: rename to `parentNodeId`
   * parent node id
   */
  parent?: string
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
  /** contextual and custom events of node */
  events: NodeEventsOn<CustomEvents>
}

/**
 * Transform a Node type to a GraphNode type
 */
export type ToGraphNode<T extends Node> = GraphNode<
  T extends Node<infer Data> ? Data : never,
  T extends Node<any, infer Events> ? Events : never,
  T extends Node<any, any, infer Type> ? Type : never
>
