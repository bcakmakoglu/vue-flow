import { CSSProperties } from 'vue'
import { Position, Element } from './flow'
import { GraphNode } from './node'

export enum MarkerType {
  Arrow = 'arrow',
  ArrowClosed = 'arrowclosed',
}

export interface EdgeMarker {
  type: MarkerType
  color?: string
  width?: number
  height?: number
  markerUnits?: string
  orient?: string
  strokeWidth?: number
}

export interface MarkerProps {
  id: string
  type: MarkerType
  color?: string
  width?: number
  height?: number
  markerUnits?: string
  orient?: string
  strokeWidth?: number
}

export type EdgeMarkerType = string | EdgeMarker

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
  markerStart?: EdgeMarkerType
  markerEnd?: EdgeMarkerType
  updatable?: boolean
}

export interface EdgePositions {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}

export type GraphEdge<T = any, N = T> = Edge<T> & {
  sourceNode: GraphNode<N>
  targetNode: GraphNode<N>
  selected?: boolean
  z?: number
} & EdgePositions

export interface EdgeProps<Data = any> {
  id: string
  label?:
    | string
    | {
        props?: any
        component: any
      }
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
  updatable?: boolean
  markerStart?: string
  markerEnd?: string
}

export interface SmoothStepEdgeProps<Data = any> extends EdgeProps<Data> {
  id: string
  label?:
    | string
    | {
        props?: any
        component: any
      }
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
  updatable?: boolean
  markerStart?: string
  markerEnd?: string
  borderRadius?: number
}

export interface GetCenterParams {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition?: Position
  targetPosition?: Position
}

export interface GetBezierPathParams {
  sourceX: number
  sourceY: number
  sourcePosition?: Position
  targetX: number
  targetY: number
  targetPosition?: Position
  centerX?: number
  centerY?: number
}

export interface GetSmoothStepPathParams {
  sourceX: number
  sourceY: number
  sourcePosition?: Position
  targetX: number
  targetY: number
  targetPosition?: Position
  borderRadius?: number
  centerX?: number
  centerY?: number
}
