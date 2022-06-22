import type { Component, VNode } from 'vue'
import type { ClassFunc, Dimensions, ElementData, Position, SnapGrid, StyleFunc, Styles, XYPosition, XYZPosition } from './flow'
import type { DefaultNodeTypes, NodeComponent } from './components'
import type { HandleElement, ValidConnectionFunc } from './handle'
import type { CustomEvent, NodeEventsHandler, NodeEventsOn } from './hooks'

/** Defined as [[x-from, y-from], [x-to, y-to]] **/
export type CoordinateExtent = [[number, number], [number, number]]

export interface NodeHandleBounds {
  source?: HandleElement[]
  target?: HandleElement[]
}

export type WidthFunc<Data = ElementData, CustomEvents extends Record<string, CustomEvent> = any> = (
  node: GraphNode<Data, CustomEvents>,
) => number | string | void

export type HeightFunc<Data = ElementData, CustomEvents extends Record<string, CustomEvent> = any> = (
  node: GraphNode<Data, CustomEvents>,
) => number | string | void

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
  draggable?: boolean
  selectable?: boolean
  connectable?: boolean
  dragHandle?: string
  /** move on grid */
  snapGrid?: SnapGrid
  /** called when used as target for new connection */
  isValidTargetPos?: ValidConnectionFunc
  /** called when used as source for new connection */
  isValidSourcePos?: ValidConnectionFunc
  /** define node extent, i.e. area in which node can be moved */
  extent?: 'parent' | CoordinateExtent
  /** expands parent area to fit child node */
  expandParent?: boolean
  /** define node as a child node by setting a parent node id */
  parentNode?: string

  /**
   * Fixed width of node, applied as style
   * You can pass a number which will be used in pixel values (width: 300 -> width: 300px)
   * or pass a string with units (width: `10rem` -> width: 10rem)
   */
  width?: number | string | WidthFunc<Data, CustomEvents>

  /**
   * Fixed height of node, applied as style
   * You can pass a number which will be used in pixel values (height: 300 -> height: 300px)
   * or pass a string with units (height: `10rem` -> height: 10rem)
   */
  height?: number | string | HeightFunc<Data, CustomEvents>

  /** Additional class names, can be a string or a callback returning a string (receives current flow element) */
  class?: string | ClassFunc<GraphNode<Data, CustomEvents>>
  /** Additional styles, can be an object or a callback returning an object (receives current flow element) */
  style?: Styles | StyleFunc<GraphNode<Data, CustomEvents>>
  /** Is node hidden */
  hidden?: boolean
  /** overwrites current node type */
  template?: NodeComponent<Data>
  /** Additional data that is passed to your custom components */
  data?: Data
  /** contextual and custom events that are passed to your custom components */
  events?: Partial<NodeEventsHandler<CustomEvents>>
}

export interface GraphNode<Data = ElementData, CustomEvents extends Record<string, CustomEvent> = any>
  extends Node<Data, CustomEvents> {
  /** absolute position in relation to parent elements + z-index */
  computedPosition: XYZPosition
  handleBounds: NodeHandleBounds
  /** node width, height */
  dimensions: Dimensions
  isParent: boolean
  selected: boolean
}

/** these props are passed to node components */
export interface NodeProps<Data = ElementData, CustomEvents = {}> {
  /** unique node id */
  id: string
  /** node type */
  type: keyof DefaultNodeTypes | string
  /** is node selected */
  selected: boolean
  /** can node be connected */
  connectable: boolean
  /** absolute position in relation to parent elements + z-index */
  computedPosition: XYZPosition
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
  /** node z-index */
  zIndex: number
  /** handle position */
  targetPosition?: Position
  /** handle position */
  sourcePosition?: Position
  /** drag handle query selector */
  dragHandle?: string
  /** node DOM-element */
  nodeElement: HTMLDivElement

  /** additional data of node */
  data?: Data
  /** contextual and custom events of node */
  events?: Partial<NodeEventsOn<CustomEvents>>
}
