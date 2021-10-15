import { ComponentPublicInstance, HTMLAttributes, VNode } from 'vue'
import { ArrowHeadType, ElementId, Position } from './types'
import { Connection } from './connection'

export interface Edge<T = any> {
  id: ElementId
  type?: string
  source: ElementId
  target: ElementId
  sourceHandle?: ElementId | null
  targetHandle?: ElementId | null
  label?: string | VNode
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  style?: any
  animated?: boolean
  arrowHeadType?: ArrowHeadType
  isHidden?: boolean
  data?: T
  className?: string
}

export interface EdgeProps<T = any> {
  id: ElementId
  source: ElementId
  target: ElementId
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  selected?: boolean
  animated?: boolean
  sourcePosition: Position
  targetPosition: Position
  label?: string | VNode
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  style?: any
  arrowHeadType?: ArrowHeadType
  markerEndId?: string
  data?: T
  sourceHandleId?: ElementId | null
  targetHandleId?: ElementId | null
}

export interface EdgeSmoothStepProps<T = any> extends EdgeProps<T> {
  borderRadius?: number
}

export interface EdgeTextProps extends HTMLAttributes {
  x: number
  y: number
  label?: string | VNode
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
}

export type EdgeType = ComponentPublicInstance<EdgeSmoothStepProps>

export type OnEdgeUpdateFunc<T = any> = (oldEdge: Edge<T>, newConnection: Connection) => void
