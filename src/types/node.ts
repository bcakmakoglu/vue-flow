import { CSSProperties } from 'vue'
import { XYPosition, Position, SnapGrid, Element, XYZPosition, Dimensions } from './flow'
import { HandleElement, ValidConnectionFunc } from './components'

export type CoordinateExtent = [[number, number], [number, number]]

export type HandleBounds = {
  source?: HandleElement[]
  target?: HandleElement[]
}

export interface Node<T = any> extends Element<T> {
  position: XYPosition
  targetPosition?: Position
  sourcePosition?: Position
  draggable?: boolean
  selectable?: boolean
  connectable?: boolean
  dragHandle?: string
  snapGrid?: SnapGrid
  isValidTargetPos?: ValidConnectionFunc
  isValidSourcePos?: ValidConnectionFunc
  extent?: 'parent' | CoordinateExtent
  children?: Node<T>[]
  dimensions?: Dimensions
}

export interface GraphNode<T = any> extends Node<T> {
  computedPosition: XYZPosition
  handleBounds: HandleBounds
  dimensions: Dimensions
  parentNode?: GraphNode<T>
  isParent?: boolean
  selected?: boolean
  dragging?: boolean
}

export interface NodeProps<T = any> {
  id: string
  dimensions: Dimensions
  handleBounds: HandleBounds
  computedPosition: XYZPosition
  position: XYPosition
  draggable?: boolean
  selectable?: boolean
  connectable?: boolean
  label?:
    | string
    | {
        props?: any
        component: any
      }
  class?: string
  style?: CSSProperties
  hidden?: boolean
  type?: string
  data?: T
  selected?: boolean
  targetPosition?: Position
  sourcePosition?: Position
  dragging?: boolean
  isValidTargetPos?: ValidConnectionFunc
  isValidSourcePos?: ValidConnectionFunc
  parentNode?: any
  isParent?: boolean
  children?: Node<T>[]
  nodeElement: HTMLDivElement
}
