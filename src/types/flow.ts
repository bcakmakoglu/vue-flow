import { CSSProperties } from 'vue'
import { Edge, GraphEdge } from './edge'
import { GraphNode, Node, CoordinateExtent } from './node'
import { ConnectionLineType, ConnectionMode } from './connection'
import { KeyCode, PanOnScrollMode } from './zoom'
import { EdgeTypes, NodeTypes } from './components'

export type FlowElement<DataNode = any, DataEdge = any> = GraphNode<DataNode> | GraphEdge<DataEdge>
export type FlowElements<DataNode = any, DataEdge = any> = FlowElement<DataNode, DataEdge>[]
export interface Element<Data = any> {
  id: string
  label?: string
  type?: string
  data?: Data
  class?: string
  style?: CSSProperties
  hidden?: boolean
}
export type Elements<DataNode = any, DataEdge = any> = (Node<DataNode> | Edge<DataEdge>)[]

export type NextElements = {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export type Transform = [number, number, number]

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

export enum ArrowHeadType {
  Arrow = 'arrow',
  ArrowClosed = 'arrowclosed',
}

export enum BackgroundVariant {
  Lines = 'lines',
  Dots = 'dots',
}

export interface SelectionRect extends Rect {
  startX: number
  startY: number
  draw: boolean
}

export type FitViewParams = {
  padding?: number
  includeHiddenNodes?: boolean
  minZoom?: number
  maxZoom?: number
  offset?: {
    x?: number
    y?: number
  }
  transitionDuration?: number
  nodes?: string[]
}

export type FlowExportObject<T = any> = {
  elements: FlowElements<T>
  position: [number, number]
  zoom: number
}

export type FlowTransform = {
  x: number
  y: number
  zoom: number
}

export type FitViewFunc = (fitViewOptions?: FitViewParams) => void
export type ProjectFunc = (position: XYPosition) => XYPosition
export type ToObjectFunc<T = any> = () => FlowExportObject<T>

export type FlowInstance<T = any> = {
  zoomIn: () => void
  zoomOut: () => void
  zoomTo: (zoomLevel: number) => void
  fitView: FitViewFunc
  project: ProjectFunc
  getElements: () => FlowElements<T>
  setTransform: (transform: FlowTransform) => void
  toObject: ToObjectFunc<T>
}

export interface FlowOptions {
  id?: string
  elements?: Elements
  nodeTypes?: NodeTypes
  edgeTypes?: EdgeTypes
  connectionMode?: ConnectionMode
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
  deleteKeyCode?: KeyCode
  selectionKeyCode?: KeyCode
  multiSelectionKeyCode?: KeyCode
  zoomActivationKeyCode?: KeyCode
  snapToGrid?: boolean
  snapGrid?: [number, number]
  onlyRenderVisibleElements?: boolean
  edgesUpdatable?: boolean
  nodesDraggable?: boolean
  nodesConnectable?: boolean
  elementsSelectable?: boolean
  selectNodesOnDrag?: boolean
  paneMoveable?: boolean
  minZoom?: number
  maxZoom?: number
  defaultZoom?: number
  defaultPosition?: [number, number]
  translateExtent?: CoordinateExtent
  nodeExtent?: CoordinateExtent
  arrowHeadColor?: string
  markerEndId?: string
  zoomOnScroll?: boolean
  zoomOnPinch?: boolean
  panOnScroll?: boolean
  panOnScrollSpeed?: number
  panOnScrollMode?: PanOnScrollMode
  zoomOnDoubleClick?: boolean
  preventScrolling?: boolean
  edgeUpdaterRadius?: number
  storageKey?: string
  loading?: string
}
