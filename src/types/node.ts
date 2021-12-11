import { CSSProperties } from 'vue'
import { XYPosition, Position, SnapGrid, Element, XYZPosition, Dimensions } from './flow'
import { HandleElement, ValidConnectionFunc } from './components'

export type CoordinateExtent = [[number, number], [number, number]]

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
  children?: Node[]
  dimensions?: Dimensions
}

export interface GraphNode<T = any> extends Node<T> {
  handleBounds: {
    source?: HandleElement[]
    target?: HandleElement[]
  }
  parentNode?: GraphNode
  isParent?: boolean
  computedPosition: XYZPosition
  selected?: boolean
  dragging?: boolean
  dimensions: Dimensions
}

export interface NodeProps<T = any> {
  label?: string
  class?: string
  style?: CSSProperties
  hidden?: boolean
  id: string
  type?: string
  data?: T
  selected?: boolean
  connectable?: boolean
  targetPosition?: Position
  sourcePosition?: Position
  dragging?: boolean
  isValidTargetPos?: ValidConnectionFunc
  isValidSourcePos?: ValidConnectionFunc
  handleBounds: {
    source?: HandleElement[]
    target?: HandleElement[]
  }
  // todo plugin not allowing for nested types currently
  parentNode?: any
  isParent?: boolean
  computedPosition: XYZPosition
  position: XYPosition
  draggable?: boolean
  selectable?: boolean
  children?: any[]
  dimensions?: Dimensions
}
