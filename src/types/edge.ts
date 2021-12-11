import { CSSProperties } from 'vue'
import { ArrowHeadType, Position, Element } from './flow'
import { GraphNode } from './node'

export interface Edge<T = any> extends Element<T> {
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
  sourcePosition?: Position
  targetPosition?: Position
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  animated?: boolean
  arrowHeadType?: ArrowHeadType
  markerEndId?: string
  updatable?: boolean
}

export interface GraphEdge<T = any> extends Edge<T> {
  sourceNode: GraphNode
  targetNode: GraphNode
}

export interface EdgeProps<Data = any> {
  id: string
  label?: string
  type?: string
  data?: Data
  class?: string
  style?: CSSProperties
  hidden?: boolean
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  selected?: boolean
  sourcePosition: Position
  targetPosition: Position
  markerEndId?: string
  sourceHandleId?: string
  targetHandleId?: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  animated?: boolean
  arrowHeadType?: ArrowHeadType
  updatable?: boolean
}

export interface SmoothStepEdgeProps<T = any> extends EdgeProps<T> {
  borderRadius?: number
}

export interface EdgePositions {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}
