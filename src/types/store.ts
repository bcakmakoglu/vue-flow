import { ComputedRef, ToRefs } from 'vue'
import { UnwrapNestedRefs } from '@vue/reactivity'
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
import { HandleType, EdgeComponent, NodeComponent } from './components'
import { ConnectionMode, SetConnectionId } from './connection'
import { GraphEdge } from './edge'
import { NodeExtent, GraphNode, TranslateExtent } from './node'
import { D3Selection, D3Zoom, D3ZoomHandler, InitD3ZoomPayload } from './zoom'
import { FlowHooks } from './hooks'

export interface FlowState extends Omit<FlowOptions, 'elements'> {
  hooks: FlowHooks
  instance: FlowInstance | undefined

  elements: FlowElements

  d3Zoom: D3Zoom | undefined
  d3Selection: D3Selection | undefined
  d3ZoomHandler: D3ZoomHandler | undefined
  minZoom: number
  maxZoom: number
  translateExtent: TranslateExtent
  nodeExtent: NodeExtent
  dimensions: Dimensions
  transform: Transform

  selectedElements: FlowElements | undefined
  selectedNodesBbox: Rect | undefined
  nodesSelectionActive: boolean
  selectionActive: boolean
  userSelectionRect: SelectionRect
  multiSelectionActive: boolean

  connectionNodeId: ElementId | undefined
  connectionHandleId: ElementId | undefined
  connectionHandleType: HandleType | undefined
  connectionPosition: XYPosition
  connectionMode: ConnectionMode

  snapToGrid: boolean
  snapGrid: SnapGrid

  edgesUpdatable: boolean
  nodesDraggable: boolean
  nodesConnectable: boolean
  elementsSelectable: boolean

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
  setTranslateExtent: (translateExtent: TranslateExtent) => void
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

export type FlowStore = { state: FlowState } & ToRefs<FlowState> & FlowActions & FlowGetters
export type ReactiveFlowStore = UnwrapNestedRefs<FlowStore>
