import type { Component, VNode } from 'vue'
import type { NodeBase } from '@xyflow/system'
import type { Dimensions, Position, Styles, XYPosition, XYZPosition } from './flow'
import type { HandleConnectable, HandleElement, ValidConnectionFunc } from './handle'
import type { NodeEventsOn } from './hooks'

export type ElementData = Record<string, unknown>

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

/** @deprecated will be removed in next major release */
export type WidthFunc = (node: GraphNode) => number | string | void

/** @deprecated will be removed in next major release */
export type HeightFunc = (node: GraphNode) => number | string | void

/**
 * The node data structure that gets used for the nodes prop.
 * @public
 */
export interface Node<NodeData extends Record<string, unknown> = Record<string, unknown>, NodeType extends string = string>
  extends Omit<NodeBase<NodeData, NodeType>, 'connectable' | 'extent' | 'origin'> {
  /** Disable/enable connecting node */
  connectable?: HandleConnectable
  /** define node extent, i.e. area in which node can be moved */
  extent?: CoordinateExtent | CoordinateExtentRange | 'parent'
  /** Additional class names, can be a string or a callback returning a string (receives current flow element) */
  class?: string | string[] | Record<string, any>
  /** Additional styles, can be an object or a callback returning an object (receives current flow element) */
  style?: Styles
}

export interface GraphNode<Data extends ElementData = ElementData, Type extends string = string> extends Node<Data, Type> {
  /** absolute position in relation to parent elements + z-index */
  computedPosition: XYZPosition
  handleBounds: NodeHandleBounds
  /** node width, height */
  dimensions: Dimensions
  isParent: boolean
  selected: boolean
  resizing: boolean
  dragging: boolean
}

/** these props are passed to node components */
export interface NodeProps<Data = ElementData, CustomEvents = object, Type extends string = string> {
  /** unique node id */
  id: string
  /** node type */
  type: Type
  /** is node selected */
  selected: boolean
  /** can node handles be connected, you need to forward this to your handles for this prop to have any effect */
  connectable: HandleConnectable
  /**
   * @deprecated - will be removed in next major release and replaced with `computedPosition`
   * node x, y (relative) position on graph
   */
  position: XYPosition
  /** dom element dimensions (width, height) */
  dimensions: Dimensions
  /**
   * @deprecated - will be removed in next major release and replaced with `{ data: { label: string | VNode | Component } }`
   * node label, either pass a string or a VNode
   * For example like this: `h('div', props, children)`)
   * Object is just a type-hack for Vue, ignore that
   */
  label?: string | VNode | Component | object
  /**
   * @deprecated will be removed in next major release
   * called when used as target for new connection
   */
  isValidTargetPos?: ValidConnectionFunc
  /**
   * @deprecated will be removed in next major release
   * called when used as source for new connection
   */
  isValidSourcePos?: ValidConnectionFunc
  /**
   * @deprecated - will be removed in next major release. Use `parentNodeId` instead
   * parent node id
   */
  parent?: string
  /**
   * todo: rename to `parentId` in next major release
   * parent node id
   */
  parentNodeId?: string
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
  /**
   * @deprecated - will be removed in next major release
   * contextual and custom events of node
   */
  events: NodeEventsOn<CustomEvents>
}
