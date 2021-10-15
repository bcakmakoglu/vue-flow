import { CSSProperties, HTMLAttributes } from 'vue'
import { Edge, EdgeType } from './edge'
import { Node, NodeExtent, NodeType, TranslateExtent } from './node'
import { ConnectionLineComponent, ConnectionLineType, ConnectionMode } from '~/types/connection'
import { KeyCode, PanOnScrollMode } from '~/types/panel'

export type ElementId = string

export type FlowElement<T = any> = Node<T> | Edge<T>

export type Elements<T = any> = Array<FlowElement<T>>

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
}

export type FlowExportObject<T = any> = {
  elements: Elements<T>
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

export type OnLoadParams<T = any> = {
  zoomIn: () => void
  zoomOut: () => void
  zoomTo: (zoomLevel: number) => void
  fitView: FitViewFunc
  project: ProjectFunc
  getElements: () => Elements<T>
  setTransform: (transform: FlowTransform) => void
  toObject: ToObjectFunc<T>
}

export type OnLoadFunc<T = any> = (params: OnLoadParams<T>) => void

export interface RevueFlowOptions extends Omit<HTMLAttributes, 'onLoad'> {
  nodeTypes?: Record<string, NodeType>
  edgeTypes?: Record<string, EdgeType>
  connectionMode?: ConnectionMode
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
  connectionLineComponent?: ConnectionLineComponent
  deleteKeyCode?: KeyCode
  selectionKeyCode?: KeyCode
  multiSelectionKeyCode?: KeyCode
  zoomActivationKeyCode?: KeyCode
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
  // nodeTypesId?: string
  // edgeTypesId?: string / used by react-flow to detect a re-render of node components
}
