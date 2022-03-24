import { Component, CSSProperties, DefineComponent } from 'vue'
import { BackgroundVariant, Dimensions, XYPosition } from './flow'
import { GraphNode, Node, NodeProps } from './node'
import { EdgeProps } from './edge'
import { FitViewParams } from './zoom'

/** Global component names are components registered to the vue instance and are "autoloaded" by their string name */
type GlobalComponentName = string

/** Node Components can either be a component definition or a string name */
export type NodeComponent<N = any> =
  | Component<NodeProps<N>>
  | DefineComponent<NodeProps<N>, any, any, any, any>
  | GlobalComponentName

/** Edge Components can either be a component definition or a string name */
export type EdgeComponent<E = any> =
  | Component<EdgeProps<E>>
  | DefineComponent<EdgeProps<E>, any, any, any, any, any>
  | GlobalComponentName

export type DefaultEdgeTypes = { [key in 'default' | 'straight' | 'smoothstep' | 'step']: EdgeComponent }
export type DefaultNodeTypes = { [key in 'input' | 'output' | 'default']: NodeComponent }

export interface BackgroundProps {
  /** The background pattern */
  variant?: BackgroundVariant
  /** Background pattern gap */
  gap?: number
  /** Background pattern size */
  size?: number
  /** Background pattern color */
  patternColor?: string
  /** Background color */
  bgColor?: string
  /** Background height */
  height?: number
  /** Background width */
  width?: number
  /** Background x-coordinate (offset x) */
  x?: number
  /** Background y-coordinate (offset y) */
  y?: number
}

export interface ControlProps {
  /** Show the zoom icon */
  showZoom?: boolean
  /** Show the fit-view icon */
  showFitView?: boolean
  /** Show the interactive icon */
  showInteractive?: boolean
  /** Params to use on fitView */
  fitViewParams?: FitViewParams
}

export interface ControlEvents {
  (event: 'zoom-in'): void
  (event: 'zoom-out'): void
  (event: 'fit-view'): void
  (event: 'interaction-change', active: boolean): void
}

export type StringFunc<N = any> = (node: Node<N> | GraphNode<N>) => string
export type ShapeRendering = 'inherit' | 'auto' | 'geometricPrecision' | 'optimizeSpeed' | 'crispEdges' | undefined

export interface MiniMapProps<N = any> {
  /** Node color, can be either a string or a string func that receives the current node */
  nodeColor?: string | (<NC = N>(node: Node<NC> | GraphNode<NC>) => string)
  /** Node stroke color, can be either a string or a string func that receives the current node */
  nodeStrokeColor?: string | (<NSC = N>(node: Node<NSC> | GraphNode<NSC>) => string)
  /** Additional node class name, can be either a string or a string func that receives the current node */
  nodeClassName?: string | (<NCM = N>(node: Node<NCM> | GraphNode<NCM>) => string)
  /** Node border radius */
  nodeBorderRadius?: number
  /** Node stroke width */
  nodeStrokeWidth?: number
  /** Background color of minimap */
  maskColor?: string
}

export interface MiniMapNodeProps {
  position: XYPosition
  dimensions: Dimensions
  borderRadius?: number
  color?: string
  shapeRendering?: CSSProperties['shapeRendering']
  strokeColor?: string
  strokeWidth?: number
}

export interface EdgeTextProps {
  x: number
  y: number
  label?:
    | string
    | {
        component: any
        props?: any
      }
  labelStyle?: CSSProperties
  labelShowBg?: boolean
  labelBgStyle?: CSSProperties
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
}
