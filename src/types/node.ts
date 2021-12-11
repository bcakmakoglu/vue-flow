import { DraggableOptions } from '@braks/revue-draggable'
import { XYPosition, Position, SnapGrid, Element, XYZPosition } from './flow'
import { HandleElement, ValidConnectionFunc } from './components'

export type CoordinateExtent = [[number, number], [number, number]]

export type Draggable = Omit<DraggableOptions, 'scale' | 'grid' | 'enableUserSelectHack' | 'enableTransformFix'> | boolean

export interface Node<T = any> extends Element<T> {
  position: XYPosition
  targetPosition?: Position
  sourcePosition?: Position
  draggable?: Draggable
  selectable?: boolean
  connectable?: boolean
  dragHandle?: string
  snapGrid?: SnapGrid
  isValidTargetPos?: ValidConnectionFunc
  isValidSourcePos?: ValidConnectionFunc
  extent?: 'parent' | CoordinateExtent
  children?: Node[]
  width?: number
  height?: number
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
  width: number
  height: number
}

export interface NodeProps<T = any> extends GraphNode {
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
  parentNode?: GraphNode
  isParent?: boolean
  position: XYZPosition
}

export type NodeDimensionUpdate = {
  id: string
  nodeElement: HTMLDivElement
  forceUpdate?: boolean
}
