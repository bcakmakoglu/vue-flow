import { Store } from 'pinia'
import {
  Dimensions,
  ElementId,
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
import { HandleType } from './components'
import {
  ConnectionMode,
  OnConnectEndFunc,
  OnConnectFunc,
  OnConnectStartFunc,
  OnConnectStopFunc,
  SetConnectionId,
} from './connection'
import { EdgeComponent, GraphEdge } from './edge'
import { NodeComponent, NodeExtent, GraphNode, TranslateExtent } from './node'
import { D3Selection, D3Zoom, D3ZoomHandler, InitD3ZoomPayload } from './zoom'
import { FlowHooks } from './hooks'

export interface FlowState extends FlowOptions {
  hooks: FlowHooks
  instance?: FlowInstance

  elements: FlowElements

  d3Zoom?: D3Zoom
  d3Selection?: D3Selection
  d3ZoomHandler?: D3ZoomHandler
  minZoom: number
  maxZoom: number
  translateExtent: TranslateExtent
  nodeExtent: NodeExtent
  dimensions: Dimensions
  transform: Transform

  selectedElements?: FlowElements
  selectedNodesBbox?: Rect
  nodesSelectionActive: boolean
  selectionActive: boolean
  userSelectionRect: SelectionRect
  multiSelectionActive: boolean

  connectionNodeId?: ElementId
  connectionHandleId?: ElementId
  connectionHandleType?: HandleType
  connectionPosition: XYPosition
  connectionMode: ConnectionMode

  snapToGrid: boolean
  snapGrid: SnapGrid

  nodesDraggable: boolean
  nodesConnectable: boolean
  elementsSelectable: boolean

  onConnect?: OnConnectFunc
  onConnectStart?: OnConnectStartFunc
  onConnectStop?: OnConnectStopFunc
  onConnectEnd?: OnConnectEndFunc

  isReady: boolean

  vueFlowVersion: string
}

export interface FlowActions {
  setElements: (elements: Elements) => void
  setUserSelection: (mousePos: XYPosition) => void
  updateUserSelection: (mousePos: XYPosition) => void
  unsetUserSelection: () => void
  addSelectedElements: (elements: FlowElements) => void
  initD3Zoom: (payload: InitD3ZoomPayload) => void
  setMinZoom: (zoom: number) => void
  setMaxZoom: (zoom: number) => void
  setTranslateExtent: (translateExtent: TranslateExtent) => void
  setNodeExtent: (nodeExtent: NodeExtent) => void
  resetSelectedElements: () => void
  unsetNodesSelection: () => void
  updateSize: (size: Dimensions) => void
  setConnectionNodeId: (payload: SetConnectionId) => void
  setInteractive: (isInteractive: boolean) => void
  addElements: (elements: Elements) => Promise<void>
}

export interface FlowGetters {
  getEdgeTypes: () => Record<string, EdgeComponent>
  getNodeTypes: () => Record<string, NodeComponent>
  getNodes: () => GraphNode[]
  getEdges: () => GraphEdge[]
  getSelectedNodes: () => GraphNode[]
}

export type FlowStore = Store<string, FlowState, FlowGetters, FlowActions>
