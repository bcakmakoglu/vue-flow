import { Component, CSSProperties, DefineComponent } from 'vue'
import {
  BackgroundVariant,
  Dimensions,
  ElementId,
  Elements,
  FitViewParams,
  FlowOptions,
  Loading,
  Position,
  XYPosition,
} from './flow'
import { Connection, ConnectionLineType, ConnectionMode } from './connection'
import { GraphNode, Node, NodeExtent, NodeProps, TranslateExtent } from './node'
import { EdgeProps } from './edge'
import { KeyCode, PanOnScrollMode } from './zoom'

export type DefaultEdgeTypes = { [key in 'default' | 'straight' | 'smoothstep' | 'step']: Component<EdgeProps> }
export type EdgeTypes = (keyof DefaultEdgeTypes | string)[]
export type NodeComponent = Component<NodeProps> | DefineComponent<NodeProps, any, any, any, any> | string
export type DefaultNodeTypes = { [key in 'input' | 'output' | 'default']: Component<NodeProps> }
export type NodeTypes = (keyof DefaultNodeTypes | string)[]
export type EdgeComponent = Component<EdgeProps> | DefineComponent<EdgeProps, any, any, any, any, any> | string

export type HandleType = 'source' | 'target'

export interface HandleElement extends XYPosition, Dimensions {
  id?: ElementId
  position: Position
}

export type ValidConnectionFunc = (connection: Connection) => boolean

export interface HandleProps {
  id?: string
  type?: string
  position?: Position
  isValidConnection?: ValidConnectionFunc
  connectable?: boolean
}

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

export type StringFunc = (node: Node | GraphNode) => string
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
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
}

export interface CustomConnectionLineProps {
  sourceX: number
  sourceY: number
  sourcePosition: Position
  targetX: number
  targetY: number
  targetPosition: Position
  connectionLineType: ConnectionLineType
  connectionLineStyle: CSSProperties
  nodes: GraphNode[]
  sourceNode: GraphNode
  sourceHandle: HandleElement
}

export interface FlowProps extends FlowOptions {
  id?: string
  modelValue?: Elements
  nodeTypes?: NodeTypes
  edgeTypes?: EdgeTypes
  connectionMode?: ConnectionMode
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
  deleteKeyCode?: KeyCode
  selectionKeyCode?: KeyCode
  multiSelectionKeyCode?: KeyCode
  zoomActivationKeyCode?: KeyCode
  preventScrolling?: boolean
  snapToGrid?: boolean
  snapGrid?: [number, number]
  onlyRenderVisibleElements?: boolean
  nodesDraggable?: boolean
  nodesConnectable?: boolean
  elementsSelectable?: boolean
  selectNodesOnDrag?: boolean
  paneMoveable?: boolean
  minZoom?: number
  maxZoom?: number
  defaultZoom?: number
  defaultPosition?: [number, number]
  translateExtent?: TranslateExtent
  nodeExtent?: NodeExtent
  arrowHeadColor?: string
  markerEndId?: string
  zoomOnScroll?: boolean
  zoomOnPinch?: boolean
  panOnScroll?: boolean
  panOnScrollSpeed?: number
  panOnScrollMode?: PanOnScrollMode
  zoomOnDoubleClick?: boolean
  edgeUpdaterRadius?: number
  storageKey?: string
  loading?: Loading
}
