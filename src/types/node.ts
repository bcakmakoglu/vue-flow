import { DraggableOptions } from '@braks/revue-draggable'
import { XYPosition, Position, SnapGrid, Element } from './flow'
import { HandleElement, ValidConnectionFunc } from './components'

export type CoordinateExtent = [[number, number], [number, number]]

export interface VFInternals {
  isDragging?: boolean
  width: number
  height: number
  handleBounds: {
    source?: HandleElement[]
    target?: HandleElement[]
  }
}

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
  parentNode?: string
}

export interface GraphNode<T = any> extends Node<T> {
  __vf: VFInternals
}

export interface NodeProps<T = any> extends GraphNode {
  id: string
  position: XYPosition
  type?: string
  data?: T
  selected?: boolean
  connectable?: boolean
  targetPosition?: Position
  sourcePosition?: Position
  dragging?: boolean
  isValidTargetPos?: ValidConnectionFunc
  isValidSourcePos?: ValidConnectionFunc
  __vf: VFInternals
}

export type NodeDimensionUpdate = {
  id: string
  nodeElement: HTMLDivElement
  forceUpdate?: boolean
}
