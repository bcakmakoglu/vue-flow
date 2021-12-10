import { ComputedRef, ToRefs } from 'vue'
import { UnwrapNestedRefs } from '@vue/reactivity'
import {
  Dimensions,
  Elements,
  FlowElements,
  FlowInstance,
  FlowOptions,
  Rect,
  SelectionRect,
  SnapGrid,
  Transform,
  XYPosition,
} from './flow'
import { HandleType, EdgeComponent, NodeComponent, NodeTypes, EdgeTypes } from './components'
import { ConnectionLineType, ConnectionMode, SetConnectionId } from './connection'
import { GraphEdge } from './edge'
import { GraphNode, CoordinateExtent } from './node'
import { D3Selection, D3Zoom, D3ZoomHandler, InitD3ZoomPayload, KeyCode, PanOnScrollMode } from './zoom'
import { FlowHooks } from './hooks'

export interface FlowState extends Omit<FlowOptions, 'elements' | 'id'> {
  hooks: FlowHooks
  instance?: FlowInstance

  elements: FlowElements
  nodeTypes: NodeTypes
  edgeTypes: EdgeTypes

  d3Zoom?: D3Zoom
  d3Selection?: D3Selection
  d3ZoomHandler?: D3ZoomHandler
  minZoom: number
  maxZoom: number
  defaultZoom: number
  translateExtent: CoordinateExtent
  nodeExtent: CoordinateExtent
  dimensions: Dimensions
  transform: Transform
  onlyRenderVisibleElements: boolean
  defaultPosition: [number, number]

  selectedElements?: FlowElements
  selectedNodesBbox?: Rect
  nodesSelectionActive: boolean
  selectionActive: boolean
  userSelectionRect: SelectionRect
  multiSelectionActive: boolean
  deleteKeyCode: KeyCode
  selectionKeyCode: KeyCode
  multiSelectionKeyCode: KeyCode
  zoomActivationKeyCode: KeyCode

  connectionNodeId?: string
  connectionHandleId?: string
  connectionHandleType?: HandleType
  connectionPosition: XYPosition
  connectionMode: ConnectionMode
  connectionLineType: ConnectionLineType
  edgeUpdaterRadius: number

  snapToGrid: boolean
  snapGrid: SnapGrid
  arrowHeadColor: string

  edgesUpdatable: boolean
  nodesDraggable: boolean
  nodesConnectable: boolean
  elementsSelectable: boolean
  selectNodesOnDrag: boolean
  paneMoveable: boolean
  zoomOnScroll: boolean
  zoomOnPinch: boolean
  panOnScroll: boolean
  panOnScrollSpeed: number
  panOnScrollMode: PanOnScrollMode
  zoomOnDoubleClick: boolean
  preventScrolling: boolean

  isReady: boolean

  vueFlowVersion: string
}

export interface FlowActions {
  setElements: (elements: Elements, init?: boolean) => Promise<void>
  setUserSelection: (mousePos: XYPosition) => void
  updateUserSelection: (mousePos: XYPosition) => void
  unsetUserSelection: () => void
  addSelectedElements: (elements: FlowElements) => void
  initD3Zoom: (payload: InitD3ZoomPayload) => void
  setMinZoom: (zoom: number) => void
  setMaxZoom: (zoom: number) => void
  setTranslateExtent: (translateExtent: CoordinateExtent) => void
  resetSelectedElements: () => void
  unsetNodesSelection: () => void
  updateSize: (size: Dimensions) => void
  setConnectionNodeId: (payload: SetConnectionId) => void
  setInteractive: (isInteractive: boolean) => void
  addElements: (elements: Elements) => void
  setState: (state: Partial<FlowOptions>) => void
}

export interface FlowGetters {
  getEdgeTypes: ComputedRef<Record<string, EdgeComponent>>
  getNodeTypes: ComputedRef<Record<string, NodeComponent>>
  getNodes: ComputedRef<GraphNode[]>
  getEdges: ComputedRef<GraphEdge[]>
  getSelectedNodes: ComputedRef<GraphNode[]>
}

export type Store = { id: string; state: FlowState } & ToRefs<FlowState> & FlowActions & FlowGetters
export type FlowStore = UnwrapNestedRefs<Store>
