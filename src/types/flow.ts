import { CSSProperties } from 'vue'
import { GraphEdge, Edge } from './edge'
import { GraphNode, CoordinateExtent, Node } from './node'
import { ConnectionLineType, ConnectionMode } from './connection'
import { KeyCode, PanOnScrollMode, UseZoomPanHelper } from './zoom'
import { FlowStore } from './store'
import { EdgeChange, FlowHooksOn, NodeChange } from './hooks'

export type FlowElement<N = any, E = any> = GraphNode<N> | GraphEdge<E>
export type FlowElements<N = any, E = any> = FlowElement<N, E>[]
export interface Element<Data = any> {
  id: string
  label?: string
  type?: string
  data?: Data
  class?: string
  style?: CSSProperties
  hidden?: boolean
}
export type Elements<N = any, E = any> = (Node<N> | Edge<E>)[]

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
  modelValue?: any[]
  nodes?: Node<N>[]
  edges?: Edge<E>[]
  elements?: Elements
  id?: string
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
  defaultMarkerColor?: string
  zoomOnScroll?: boolean
  zoomOnPinch?: boolean
  panOnScroll?: boolean
  panOnScrollSpeed?: number
  panOnScrollMode?: PanOnScrollMode
  zoomOnDoubleClick?: boolean
  preventScrolling?: boolean
  edgeUpdaterRadius?: number
  storageKey?: string
  fitViewOnInit?: boolean
}

export type FlowOptions<N = any, E = N> = FlowProps<N, E>

export type UseVueFlow = {
  store: FlowStore
  useNodesState: (nodes: Node[]) => GraphNode[]
  useEdgesState: (edges: Edge[]) => GraphEdge[]
  applyNodeChanges: (changes: NodeChange[]) => void
  applyEdgeChanges: (changes: EdgeChange[]) => void
} & FlowHooksOn
