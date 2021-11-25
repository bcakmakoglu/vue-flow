import { CSSProperties } from 'vue'
import { ArrowHeadType, ElementId, Position } from './flow'
import { EdgeTextProps, EdgeTypes } from './components'
import { GraphNode } from './node'

export interface Edge<T = any> {
  id: ElementId
  type?: EdgeTypes[number]
  source: ElementId
  target: ElementId
  sourceHandle?: ElementId
  targetHandle?: ElementId
  selected?: boolean
  sourcePosition?: Position
  targetPosition?: Position
  label?:
    | string
    | {
        component: any
        props?: Record<string, any> & Partial<EdgeTextProps>
      }
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  style?: CSSProperties | unknown
  animated?: boolean
  arrowHeadType?: ArrowHeadType
  markerEndId?: string
  data?: T
  class?: string
  isHidden?: boolean
}

export interface GraphEdge<T = any> extends Edge<T> {
  sourceNode: GraphNode
  targetNode: GraphNode
}

export interface EdgeProps<T = any> extends GraphEdge<T> {
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

export interface EdgePositions {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}
