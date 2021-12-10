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

export interface EdgeProps<T = any> extends GraphEdge<T> {
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
