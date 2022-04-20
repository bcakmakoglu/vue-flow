import { Component, CSSProperties, VNode } from 'vue'
import { GraphEdge, Edge, DefaultEdgeOptions } from './edge'
import { GraphNode, CoordinateExtent, Node } from './node'
import { ConnectionLineType, ConnectionMode } from './connection'
import { KeyCode, PanOnScrollMode, ViewportFuncs } from './zoom'
import { DefaultEdgeTypes, DefaultNodeTypes, EdgeComponent, NodeComponent } from './components'

export type ElementData = any

/** an internal element  */
export type FlowElement<Data = ElementData> = GraphNode<Data> | GraphEdge<Data>
export type FlowElements<Data = ElementData> = FlowElement<Data>[]

export type CustomThemeVars = Record<string, string | number>
export type CSSVars =
  | '--vf-node-color'
  | '--vf-box-shadow'
  | '--vf-node-bg'
  | '--vf-node-text'
  | '--vf-connection-path'
  | '--vf-handle'
export type ThemeVars = { [key in CSSVars]?: CSSProperties['color'] }
export type Styles = CSSProperties & ThemeVars & CustomThemeVars
export type ClassFunc<Data = ElementData> = (element: FlowElement<Data>) => string | void
export type StyleFunc<Data = ElementData> = (element: FlowElement<Data>) => Styles | void

/** base element props */
export interface BaseElement<Data extends ElementData = ElementData> {
  id: string
  label?: string | VNode | Component
  type?: string
  data?: Data
  class?: string | ClassFunc<Data>
  style?: Styles | StyleFunc<Data>
  hidden?: boolean
}
export type Element<Data = ElementData> = Node<Data> | Edge<Data>
export type Elements<Data = ElementData> = Element<Data>[]

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

export type FlowExportObject = {
  nodes: GraphNode[]
  edges: GraphEdge[]
  position: [number, number]
  zoom: number
}

interface Exports {
  getElements: () => FlowElements
  getNodes: () => GraphNode[]
  getEdges: () => GraphEdge[]
  toObject: () => FlowExportObject
}

export type FlowInstance = Exports & ViewportFuncs

export interface FlowProps {
  id?: string
  modelValue?: Elements
  nodes?: Node[]
  edges?: Edge[]
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

export type FlowOptions = FlowProps
