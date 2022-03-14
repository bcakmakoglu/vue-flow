import { Component, CSSProperties, DefineComponent } from 'vue'
import { BackgroundVariant, Dimensions, Position, XYPosition } from './flow'
import { Connection, ConnectionLineType } from './connection'
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

export type HandleType = 'source' | 'target'

export interface HandleElement extends XYPosition, Dimensions {
  id?: string
  position: Position
}

/** A valid connection function can determine if an attempted connection is valid or not, i.e. abort creating a new edge */
export type ValidConnectionFunc = (connection: Connection) => boolean

export interface HandleProps {
  /** Unique id of handle element */
  id?: string
  /** Handle type (source / target) {@link HandleType} */
  type?: string
  /** Handle position (top, bottom, left, right) {@link Position} */
  position?: Position
  /** A valid connection func {@link ValidConnectionFunc} */
  isValidConnection?: ValidConnectionFunc
  /** Enable/disable connecting to handle */
  connectable?: boolean
}

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

export interface ConnectionLineProps<N = any> {
  /** Source X position of the connection line */
  sourceX: number
  /** Source Y position of the connection line */
  sourceY: number
  /** Source position of the connection line */
  sourcePosition: Position
  /** Target X position of the connection line */
  targetX: number
  /** Target Y position of the connection line */
  targetY: number
  /** Target position of the connection line */
  targetPosition: Position
  connectionLineType: ConnectionLineType
  connectionLineStyle: CSSProperties
  /** All currently stored nodes */
  nodes: GraphNode<N>[]
  /** The source node of the connection line */
  sourceNode: GraphNode<N>
  /** The source handle element of the connection line */
  sourceHandle: HandleElement
}
