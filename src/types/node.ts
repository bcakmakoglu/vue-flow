import { Component, CSSProperties, DefineComponent } from 'vue'
import { XYPosition, ElementId, Position } from './flow'
import { HandleElement } from './components'

export interface VFInternals {
  position: XYPosition
  isDragging?: boolean
  width: number
  height: number
  handleBounds: {
    source: HandleElement[] | null
    target: HandleElement[] | null
  }
}

export interface Node<T = any> {
  id: ElementId
  position: XYPosition
  type?: string
  class?: string
  style?: CSSProperties
  data?: T
  targetPosition?: Position
  sourcePosition?: Position
  isHidden?: boolean
  draggable?: boolean
  selectable?: boolean
  connectable?: boolean
  dragHandle?: string
}

export interface GraphNode<T = any> extends Node<T> {
  __vf: VFInternals
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

export type NodeComponent = Component<NodeProps> | DefineComponent<NodeProps, any, any, any, any> | string
export type NodeTypes = string[]
