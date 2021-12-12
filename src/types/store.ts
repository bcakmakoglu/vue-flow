import { ComputedRef, ToRefs } from 'vue'
import { UnwrapNestedRefs } from '@vue/reactivity'
import { Dimensions, Elements, FlowElements, FlowInstance, FlowOptions, Rect, SnapGrid, Transform, XYPosition } from './flow'
import { HandleType, EdgeComponent, NodeComponent, NodeTypes, EdgeTypes } from './components'
import { ConnectionLineType, ConnectionMode, SetConnectionId } from './connection'
import { Edge, GraphEdge } from './edge'
import { GraphNode, CoordinateExtent, Node } from './node'
import { D3Selection, D3Zoom, D3ZoomHandler, KeyCode, PanOnScrollMode } from './zoom'
import { FlowHooks } from './hooks'

export interface FlowState<N = any, E = N> extends Omit<FlowOptions<N, E>, 'id'> {
  hooks: FlowHooks
  instance?: FlowInstance

  elements: Elements
  nodes: GraphNode[]
  edges: GraphEdge[]
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

  selectedNodesBbox: Rect
  selectedNodes: GraphNode[]
  selectedEdges: GraphEdge[]
  nodesSelectionActive: boolean
  selectionActive: boolean
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
  defaultMarkerColor: string

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
  setElements: (elements: Elements, extent: CoordinateExtent) => void
  setNodes: (nodes: Node[], extent: CoordinateExtent) => void
  setEdges: (edges: Edge[]) => void
  addSelectedElements: (elements: FlowElements) => void
  addSelectedEdges: (edges: GraphEdge[]) => void
  addSelectedNodes: (nodes: GraphNode[]) => void
  setMinZoom: (zoom: number) => void
  setMaxZoom: (zoom: number) => void
  setTranslateExtent: (translateExtent: CoordinateExtent) => void
  resetSelectedElements: () => void
  setConnectionNodeId: (payload: SetConnectionId) => void
  setInteractive: (isInteractive: boolean) => void
  setState: (state: Partial<FlowOptions>) => void
  updateNodePosition: ({ id, diff, dragging }: { id?: string; diff?: XYPosition; dragging?: boolean }) => void
}

export interface FlowGetters {
  getEdgeTypes: ComputedRef<Record<string, EdgeComponent>>
  getNodeTypes: ComputedRef<Record<string, NodeComponent>>
  getNodes: ComputedRef<GraphNode[]>
  getEdges: ComputedRef<GraphEdge[]>
  getNode: ComputedRef<(id: string) => GraphNode | undefined>
  getEdge: ComputedRef<(id: string) => GraphEdge | undefined>
  getSelectedElements: ComputedRef<FlowElements>
}

export type Store = { id: string; state: FlowState } & ToRefs<FlowState> & FlowActions & FlowGetters
export type FlowStore = UnwrapNestedRefs<Store>
