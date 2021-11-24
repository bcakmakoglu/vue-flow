import { Component, CSSProperties, DefineComponent } from 'vue'
import { DraggableOptions } from '@braks/revue-draggable'
import { XYPosition, ElementId, Position, SnapGrid } from './flow'
import { HandleElement } from './components'

export interface VFInternals {
  isDragging?: boolean
  width: number
  height: number
  handleBounds: {
    source?: HandleElement[]
    target?: HandleElement[]
  }
}

export interface NodeProps<T = any> {
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
}

export type NodeComponent = Component<NodeProps> | DefineComponent<NodeProps, any, any, any, any> | string
export type DefaultNodeTypes = { [key in 'input' | 'output' | 'default']: Component<NodeProps> }
export type NodeTypes = (keyof DefaultNodeTypes | string)[]
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
}

export interface GraphNode<T = any> extends Node<T> {
  __vf: VFInternals
}

export type SourceTargetNode = {
  sourceNode: GraphNode
  targetNode: GraphNode
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
