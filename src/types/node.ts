import { CSSProperties } from 'vue'
import { DraggableOptions } from '@braks/revue-draggable'
import { XYPosition, ElementId, Position, SnapGrid } from './flow'
import { HandleElement, NodeTypes, ValidConnectionFunc } from './components'

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

export interface Node<T = any> {
  id: ElementId
  position: XYPosition
  type?: NodeTypes[number]
  class?: string
  style?: CSSProperties
  data?: T
  targetPosition?: Position
  sourcePosition?: Position
  isHidden?: boolean
  draggable?: Draggable
  selectable?: boolean
  connectable?: boolean
  dragHandle?: string
  snapGrid?: SnapGrid
  isValidTargetPos?: ValidConnectionFunc
  isValidSourcePos?: ValidConnectionFunc
}

export interface GraphNode<T = any> extends Node<T> {
  __vf: VFInternals
}

export interface NodeProps<T = any> extends GraphNode {
  id: ElementId
  type?: string
  data?: T
  selected?: boolean
  connectable?: boolean
  xPos?: number
  yPos?: number
  targetPosition?: Position
  sourcePosition?: Position
  dragging?: boolean
  isValidTargetPos?: ValidConnectionFunc
  isValidSourcePos?: ValidConnectionFunc
  __vf: VFInternals
}

export type NodeDimensionUpdate = {
  id: ElementId
  nodeElement: HTMLDivElement
  forceUpdate?: boolean
}
