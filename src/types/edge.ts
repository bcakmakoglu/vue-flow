import { CSSProperties, DefineComponent } from 'vue'
import { ArrowHeadType, ElementId, Position } from './types'

export interface Edge<T = any> {
  id: ElementId
  type?: string
  source: ElementId
  target: ElementId
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourceHandle?: ElementId | null
  targetHandle?: ElementId | null
  selected?: boolean
  sourcePosition?: Position
  targetPosition?: Position
  label?:
    | string
    | {
        component: any
        props?: any
      }
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  style?: CSSProperties
  animated?: boolean
  arrowHeadType?: ArrowHeadType
  markerEndId?: string
  data?: T
  class?: string
  isHidden?: boolean
}

export interface EdgeProps<T = any> extends Edge<T> {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  selected?: boolean
  sourcePosition: Position
  targetPosition: Position
  markerEndId?: string
  sourceHandleId?: ElementId | null
  targetHandleId?: ElementId | null
}

export interface EdgeSmoothStepProps<T = any> extends EdgeProps<T> {
  borderRadius?: number
}

export type EdgeType = DefineComponent<EdgeSmoothStepProps, any, any, any, any, any> | boolean

export interface EdgePositions {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}
