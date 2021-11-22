import { Component, CSSProperties, DefineComponent } from 'vue'
import { BackgroundVariant, Dimensions, ElementId, FitViewParams, Position, XYPosition } from './flow'
import { Connection } from './connection'
import { Node } from './node'

export type HandleType = 'source' | 'target'

export interface HandleElement extends XYPosition, Dimensions {
  id?: ElementId | null
  position: Position
}

export type ValidConnectionFunc = (connection: Connection) => boolean

export interface BackgroundProps {
  variant?: BackgroundVariant
  gap?: number
  color?: string
  size?: number
}

export interface ControlProps {
  showZoom?: boolean
  showFitView?: boolean
  showInteractive?: boolean
  fitViewParams?: FitViewParams
}

export interface ControlEvents {
  (event: 'zoom-in'): void
  (event: 'zoom-out'): void
  (event: 'fit-view'): void
  (event: 'interaction-change', active: boolean): void
}

export type StringFunc = (node: Node) => string
export type ShapeRendering = 'inherit' | 'auto' | 'geometricPrecision' | 'optimizeSpeed' | 'crispEdges' | undefined

export interface MiniMapProps {
  nodeColor?: string | StringFunc
  nodeStrokeColor?: string | StringFunc
  nodeClassName?: string | StringFunc
  nodeBorderRadius?: number
  nodeStrokeWidth?: number
  maskColor?: string
}

export interface MiniMapNodeProps {
  x?: number
  y?: number
  width?: number
  height?: number
  borderRadius?: number
  color?: string
  shapeRendering?: CSSProperties['shapeRendering']
  strokeColor?: string
  strokeWidth?: number
}

export interface EdgeTextProps {
  x?: number
  y?: number
  label?:
    | string
    | {
        component: any
        props?: Record<string, any>
      }
  labelStyle?: CSSProperties
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
}
