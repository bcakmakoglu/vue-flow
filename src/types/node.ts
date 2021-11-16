import { DefineComponent } from 'vue'
import { XYPosition, ElementId, Position } from './types'

export interface Node<T = any> {
  id: ElementId
  position: XYPosition
  type?: string
  __rf?:
    | {
        position?: XYPosition
        isDragging?: boolean
        width?: number
        height?: number
        handleBounds?: any
      }
    | any
  data?: T
  style?: any
  class?: string
  targetPosition?: Position
  sourcePosition?: Position
  isHidden?: boolean
  draggable?: boolean
  selectable?: boolean
  connectable?: boolean
}

export type NodePosUpdate = {
  id: ElementId
  pos: XYPosition
}

export type NodeDiffUpdate = {
  id?: ElementId
  diff?: XYPosition
  isDragging?: boolean
}

export type TranslateExtent = [[number, number], [number, number]]
export type NodeExtent = TranslateExtent

export type NodeDimensionUpdate = {
  id: ElementId
  nodeElement: HTMLDivElement
  forceUpdate?: boolean
}

export interface NodeProps<T = any> {
  id?: ElementId
  type?: string
  data?: T
  selected?: boolean
  connectable?: boolean
  xPos?: number
  yPos?: number
  targetPosition?: Position
  sourcePosition?: Position
  dragging?: boolean
}

export type NodeType = DefineComponent<NodeProps, any, any, any, any> | boolean
