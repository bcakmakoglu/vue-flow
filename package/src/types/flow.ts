import { CSSProperties } from 'vue'
import { GraphEdge, Edge, DefaultEdgeOptions } from './edge'
import { GraphNode, CoordinateExtent, Node } from './node'
import { ConnectionLineType, ConnectionMode } from './connection'
import { KeyCode, PanOnScrollMode, UseZoomPanHelper } from './zoom'
import { DefaultEdgeTypes, DefaultNodeTypes, EdgeComponent, NodeComponent } from './components'

/** an internal element  */
export type FlowElement<Data = any> = GraphNode<Data> | GraphEdge<Data>
export type FlowElements<N = any, E = N> = (FlowElement<N> | FlowElement<E>)[]

type ClassFunc<Data = any> = (element: FlowElement<Data>) => string
type StyleFunc<Data = any> = (element: FlowElement<Data>) => CSSProperties

/** base element props */
export interface Element<Data = any> {
  id: string
  label?:
    | string
    | {
        props?: any
        component: any
      }
  type?: string
  data?: Data
  class?: string | ClassFunc
  style?: CSSProperties | StyleFunc
  hidden?: boolean
}
export type Elements<N = any, E = any> = (Node<N> | Edge<E>)[]

/** Transform x, y, z */
export type Transform = [number, number, number]

/** Handle Positions */
export enum Position {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}

export interface XYPosition {
  x: number
  y: number
}

export type XYZPosition = XYPosition & { z: number }

export interface Dimensions {
  width: number
  height: number
}

export interface Box extends XYPosition {
  x2: number
  y2: number
}

export interface Rect extends Dimensions, XYPosition {}

export type SnapGrid = [number, number]

export enum BackgroundVariant {
  Lines = 'lines',
  Dots = 'dots',
}

export interface SelectionRect extends Rect {
  startX: number
  startY: number
  draw: boolean
}

export type FlowExportObject<N = any, E = N> = {
  nodes: GraphNode<N>[]
  edges: GraphEdge<E>[]
  position: [number, number]
  zoom: number
}

export type ToObject<N = any, E = N> = () => FlowExportObject<N, E>

export type FlowInstance<N = any, E = N> = {
  getElements: () => FlowElements<N, E>
  getNodes: () => GraphNode<N>[]
  getEdges: () => GraphEdge<E>[]
  toObject: ToObject<N, E>
} & UseZoomPanHelper

export interface FlowProps<N = any, E = N> {
  id?: string
  modelValue?: Elements<N, E>
  nodes?: Node<N>[]
  edges?: Edge<E>[]
  /** either use the edgeTypes prop to define your edge-types or use slots (<template #edge-mySpecialType="props">) */
  edgeTypes?: { [key in keyof DefaultEdgeTypes]?: EdgeComponent } & { [key: string]: EdgeComponent }
  /** either use the nodeTypes prop to define your node-types or use slots (<template #node-mySpecialType="props">) */
  nodeTypes?: { [key in keyof DefaultNodeTypes]?: NodeComponent } & { [key: string]: NodeComponent }
  connectionMode?: ConnectionMode
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties | null
  deleteKeyCode?: KeyCode
  selectionKeyCode?: KeyCode
  multiSelectionKeyCode?: KeyCode
  zoomActivationKeyCode?: KeyCode
  snapToGrid?: boolean
  snapGrid?: SnapGrid
  onlyRenderVisibleElements?: boolean
  edgesUpdatable?: boolean
  nodesDraggable?: boolean
  nodesConnectable?: boolean
  elementsSelectable?: boolean
  selectNodesOnDrag?: boolean
  /** move pane on drag, replaced prop `paneMovable` */
  panOnDrag?: boolean
  minZoom?: number
  maxZoom?: number
  defaultZoom?: number
  defaultPosition?: [number, number]
  translateExtent?: CoordinateExtent
  nodeExtent?: CoordinateExtent
  defaultMarkerColor?: string
  zoomOnScroll?: boolean
  zoomOnPinch?: boolean
  panOnScroll?: boolean
  panOnScrollSpeed?: number
  panOnScrollMode?: PanOnScrollMode
  zoomOnDoubleClick?: boolean
  /** enable this to prevent vue flow from scrolling inside the container, i.e. allow for the page to scroll */
  preventScrolling?: boolean
  edgeUpdaterRadius?: number
  fitViewOnInit?: boolean
  /** allow connection with click handlers, i.e. support touch devices */
  connectOnClick?: boolean
  /** apply default change handlers for position, dimensions, adding/removing nodes. set this to false if you want to apply the changes manually */
  applyDefault?: boolean
  noDragClassName?: string
  noWheelClassName?: string
  noPanClassName?: string
  /** does not work for the `addEdge` utility! */
  defaultEdgeOptions?: DefaultEdgeOptions
}

export type FlowOptions<N = any, E = N> = FlowProps<N, E>
