import { ArrowHeadType, ElementId, Position, Element } from './flow'
import { GraphNode } from './node'

export interface Edge<T = any> extends Element<T> {
  source: ElementId
  target: ElementId
  sourceHandle?: ElementId
  targetHandle?: ElementId
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
