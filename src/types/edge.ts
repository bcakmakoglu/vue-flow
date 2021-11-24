import { Component, CSSProperties, DefineComponent } from 'vue'
import { ArrowHeadType, ElementId, Position } from './flow'
import { EdgeTextProps } from './components'
import { GraphNode } from './node'

// eslint-disable-next-line no-use-before-define
export type DefaultEdgeTypes = { [key in 'default' | 'straight' | 'smoothstep' | 'step']: Component<EdgeProps> }
export type EdgeTypes = (keyof DefaultEdgeTypes | string)[]

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
        props?: EdgeTextProps
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

export interface EdgePositions {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}

export type EdgeComponent = Component<EdgeProps> | DefineComponent<EdgeProps, any, any, any, any, any> | string
