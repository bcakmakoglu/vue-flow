import { ComputedRef, ToRefs } from 'vue'
import { UnwrapNestedRefs } from '@vue/reactivity'
import { Dimensions, Elements, FlowElements, FlowInstance, FlowOptions, Rect, SnapGrid, Transform, XYPosition } from './flow'
import { HandleType, EdgeComponent, NodeComponent } from './components'
import { Connection, ConnectionLineType, ConnectionMode, SetConnectionId } from './connection'
import { Edge, GraphEdge } from './edge'
import { GraphNode, CoordinateExtent, Node } from './node'
import { D3Selection, D3Zoom, D3ZoomHandler, KeyCode, PanOnScrollMode } from './zoom'
import { EdgeChange, FlowHooks, FlowHooksOn, NodeChange } from './hooks'

export interface State<N = any, E = N> extends Omit<FlowOptions<N, E>, 'id' | 'modelValue'> {
  hooks: FlowHooks<N, E>
  instance: FlowInstance<N, E> | undefined

  nodes: GraphNode<N>[]
  edges: GraphEdge<E>[]

  d3Zoom: D3Zoom | undefined
  d3Selection: D3Selection | undefined
  d3ZoomHandler: D3ZoomHandler | undefined
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
  nodesSelectionActive: boolean
  selectionActive: boolean
  multiSelectionActive: boolean
  deleteKeyCode: KeyCode
  selectionKeyCode: KeyCode
  multiSelectionKeyCode: KeyCode
  zoomActivationKeyCode: KeyCode

  connectionNodeId: string | undefined
  connectionHandleId: string | undefined
  connectionHandleType: HandleType | undefined
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

  paneReady: boolean
  initialized: boolean
  applyDefault: boolean

  vueFlowVersion: string
}

export interface Actions<N = any, E = N> {
  setElements: (elements: Elements<N, E>, extent?: CoordinateExtent) => void
  setNodes: (nodes: Node<N>[], extent?: CoordinateExtent) => void
  setEdges: (edges: Edge<E>[]) => void
  addNodes: <NA = N>(nodes: Node<NA>[], extent?: CoordinateExtent) => void
  addEdges: <EA = E>(edgesOrConnections: (Edge<EA> | Connection)[]) => void
  updateEdge: <EU = E>(oldEdge: GraphEdge<EU>, newConnection: Connection) => GraphEdge<EU> | false
  applyEdgeChanges: <ED = E>(changes: EdgeChange[]) => GraphEdge<ED>[]
  applyNodeChanges: <ND = N>(changes: NodeChange[]) => GraphNode<ND>[]
  addSelectedElements: (elements: FlowElements<N, E>) => void
  addSelectedEdges: (edges: GraphEdge<E>[]) => void
  addSelectedNodes: (nodes: GraphNode<N>[]) => void
  setMinZoom: (zoom: number) => void
  setMaxZoom: (zoom: number) => void
  setTranslateExtent: (translateExtent: CoordinateExtent) => void
  resetSelectedElements: () => void
  setConnectionNodeId: (payload: SetConnectionId) => void
  setInteractive: (isInteractive: boolean) => void
  setState: (state: Partial<FlowOptions<N, E>>) => void
  updateNodePosition: ({ id, diff, dragging }: { id?: string; diff?: XYPosition; dragging?: boolean }) => void
}

export interface Getters<N = any, E = N> {
  getEdgeTypes: ComputedRef<Record<string, EdgeComponent>>
  getNodeTypes: ComputedRef<Record<string, NodeComponent>>
  getNodes: ComputedRef<GraphNode<N>[]>
  getEdges: ComputedRef<GraphEdge<E>[]>
  getNode: ComputedRef<(id: string) => GraphNode<N> | undefined>
  getEdge: ComputedRef<(id: string) => GraphEdge<E> | undefined>
  getSelectedElements: ComputedRef<FlowElements<N, E>>
  getSelectedNodes: ComputedRef<GraphNode<N>[]>
  getSelectedEdges: ComputedRef<GraphEdge<E>[]>
}
interface StoreBase<N = any, E = N> {
  state: State<N, E>
  actions: Actions<N, E>
  getters: Getters<N, E>
  hooksOn: FlowHooksOn<N, E>
}
export type Store<N = any, E = N> = StoreBase & ToRefs<State<N, E>> & Actions<N, E> & Getters<N, E>
export type FlowStore<N = any, E = N> = UnwrapNestedRefs<Store<N, E>>
