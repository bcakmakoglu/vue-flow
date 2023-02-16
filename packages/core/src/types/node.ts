import type { Component, VNode } from 'vue'
import type { ClassFunc, Dimensions, ElementData, Position, StyleFunc, Styles, XYPosition, XYZPosition } from './flow'
import type { DefaultNodeTypes, NodeComponent } from './components'
import type { HandleConnectable, HandleElement, ValidConnectionFunc } from './handle'
import type { CustomEvent, NodeEventsHandler, NodeEventsOn } from './hooks'

export interface ExtendedParentExtent {
  range: 'parent'
  /** Values are top, right, bottom, left, you can use these the same as CSS padding */
  padding: [number] | [number, number] | [number, number, number] | [number, number, number, number]
}

/** Defined as [[x-from, y-from], [x-to, y-to]] **/
export type CoordinateExtent = [[number, number], [number, number]]

export interface NodeHandleBounds {
  source?: HandleElement[]
  target?: HandleElement[]
}

export type WidthFunc = (node: GraphNode) => number | string | void

export type HeightFunc = (node: GraphNode) => number | string | void

export interface Node<Data = ElementData, CustomEvents extends Record<string, CustomEvent> = any> {
  /** Unique node id */
  id: string
  /** A node label */
  label?: string | VNode | Component
  /** initial node position x, y */
  position: XYPosition
  /** node type, can be a default type or a custom type */
  type?: keyof DefaultNodeTypes | string
  /** handle position */
  targetPosition?: Position
  /** handle position */
  sourcePosition?: Position
  /** Disable/enable dragging node */
  draggable?: boolean
  /** Disable/enable selecting node */
  selectable?: boolean
  connectable?: HandleConnectable
  /** Disable/enable focusing node (a11y) */
  focusable?: boolean
  /** Disable/enable deleting node */
  deletable?: boolean
  dragHandle?: string
  // todo: deprecate this and remove them in next minor release
  /** called when used as target for new connection */
  isValidTargetPos?: ValidConnectionFunc
  // todo: deprecate this and remove them in next minor release
  /** called when used as source for new connection */
  isValidSourcePos?: ValidConnectionFunc
  /** define node extent, i.e. area in which node can be moved */
  extent?: CoordinateExtent | ExtendedParentExtent | 'parent'
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
  /** overwrites current node type */
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
> extends Node<Data, CustomEvents> {
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
export interface NodeProps<Data = ElementData, CustomEvents = {}, Type extends string = keyof DefaultNodeTypes> {
  /** unique node id */
  id: string
  /** node type */
  type?: Type
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
  /** called when used as target for new connection */
  isValidTargetPos?: ValidConnectionFunc
  /** called when used as source for new connection */
  isValidSourcePos?: ValidConnectionFunc
  /** parent node id */
  parentNode?: string
  /** is node currently dragging */
  dragging: boolean
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
