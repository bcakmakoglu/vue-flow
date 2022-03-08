import { ComputedRef, CSSProperties, ToRefs } from 'vue'
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
  connectionLineStyle: CSSProperties | undefined
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
  /** @deprecated use setNodes / setEdges instead */
  setElements: (elements: Elements<N, E>, extent?: CoordinateExtent) => void
  setNodes: (nodes: Node<N>[], extent?: CoordinateExtent) => void
  setEdges: (edges: Edge<E>[]) => void
  addNodes: <NA = N>(nodes: Node<NA>[], extent?: CoordinateExtent) => void
  addEdges: <EA = E>(edgesOrConnections: (Edge<EA> | Connection)[]) => void
  updateEdge: <EU = E>(oldEdge: GraphEdge<EU>, newConnection: Connection) => boolean
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
  $reset: () => void
}

export interface Getters<N = any, E = N> {
  getEdgeTypes: Record<string, EdgeComponent>
  getNodeTypes: Record<string, NodeComponent>
  getNodes: GraphNode<N>[]
  getEdges: GraphEdge<E>[]
  getNode: (id: string) => GraphNode<N> | undefined
  getEdge: (id: string) => GraphEdge<E> | undefined
  getSelectedElements: FlowElements<N, E>
  getSelectedNodes: GraphNode<N>[]
  getSelectedEdges: GraphEdge<E>[]
}

export type ComputedGetters<N = any, E = N> = { [key in keyof Getters<N, E>]: ComputedRef<Getters<N, E>[key]> }

interface StoreBase<N = any, E = N> {
  state: State<N, E>
  actions: Actions<N, E>
  getters: ComputedGetters<N, E>
  hooksOn: FlowHooksOn<N, E>
}

export type Store<N = any, E = N> = StoreBase<N, E> & ToRefs<State<N, E>> & Actions<N, E> & ComputedGetters<N, E>
export type FlowStore<N = any, E = N> = StoreBase<N, E> & State<N, E> & Actions<N, E> & Getters<N, E>
