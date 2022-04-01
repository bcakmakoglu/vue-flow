import { ComputedRef, CSSProperties, ToRefs } from 'vue'
import {
  Dimensions,
  ElementData,
  Elements,
  FlowElements,
  FlowInstance,
  FlowOptions,
  Rect,
  SnapGrid,
  Transform,
  XYPosition,
} from './flow'
import { EdgeComponent, NodeComponent, DefaultNodeTypes, DefaultEdgeTypes } from './components'
import { Connection, ConnectionLineType, ConnectionMode } from './connection'
import { DefaultEdgeOptions, Edge, GraphEdge } from './edge'
import { GraphNode, CoordinateExtent, Node } from './node'
import { D3Selection, D3Zoom, D3ZoomHandler, KeyCode, PanOnScrollMode } from './zoom'
import { FlowHooks, FlowHooksOn } from './hooks'
import { NodeChange, EdgeChange } from './changes'
import { StartHandle, HandleType } from './handle'

export interface State<NodeData = ElementData, EdgeData = ElementData>
  extends Omit<FlowOptions<NodeData, EdgeData>, 'id' | 'modelValue'> {
  /** Event hooks, you can manipulate the triggers on your own peril */
  hooks: FlowHooks<NodeData, EdgeData>
  instance: FlowInstance | null

  /** all stored nodes */
  nodes: GraphNode<NodeData>[]
  /** all stored edges */
  edges: GraphEdge<EdgeData>[]

  d3Zoom: D3Zoom | null
  d3Selection: D3Selection | null
  d3ZoomHandler: D3ZoomHandler | null
  minZoom: number
  maxZoom: number
  defaultZoom: number
  translateExtent: CoordinateExtent
  nodeExtent: CoordinateExtent
  /** zoom pane dimensions */
  dimensions: Dimensions
  /** transform x, y, z */
  transform: Transform
  onlyRenderVisibleElements: boolean
  defaultPosition: [number, number]

  selectedNodesBbox: Rect
  nodesSelectionActive: boolean
  userSelectionActive: boolean
  multiSelectionActive: boolean
  deleteKeyCode: KeyCode
  selectionKeyCode: KeyCode
  multiSelectionKeyCode: KeyCode
  zoomActivationKeyCode: KeyCode

  connectionNodeId: string | null
  connectionHandleId: string | null
  connectionHandleType: HandleType | null
  connectionPosition: XYPosition
  connectionMode: ConnectionMode
  connectionLineType: ConnectionLineType
  connectionLineStyle: CSSProperties | null
  connectionStartHandle: StartHandle | null
  connectOnClick: boolean
  edgeUpdaterRadius: number

  snapToGrid: boolean
  snapGrid: SnapGrid
  defaultMarkerColor: string

  edgesUpdatable: boolean
  nodesDraggable: boolean
  nodesConnectable: boolean
  elementsSelectable: boolean
  selectNodesOnDrag: boolean
  panOnDrag: boolean
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

  fitViewOnInit?: boolean
  noDragClassName?: string
  noWheelClassName?: string
  noPanClassName?: string
  defaultEdgeOptions?: DefaultEdgeOptions

  vueFlowVersion: string
}

export interface Actions<NodeData = ElementData, EdgeData = ElementData> {
  /** @deprecated use setNodes / setEdges instead */
  setElements: (elements: Elements<NodeData, EdgeData>, extent?: CoordinateExtent) => void
  /** parses nodes and re-sets the state */
  setNodes: (nodes: Node<NodeData>[], extent?: CoordinateExtent) => void
  /** parses edges and re-sets the state */
  setEdges: (edges: Edge<EdgeData>[]) => void
  /** parses nodes and adds to state */
  addNodes: <NA = NodeData>(nodes: Node<NA>[], extent?: CoordinateExtent) => void
  /** parses edges and adds to state */
  addEdges: <EA = EdgeData>(edgesOrConnections: (Edge<EA> | Connection)[]) => void
  /** updates an edge */
  updateEdge: <EU = EdgeData>(oldEdge: GraphEdge<EU>, newConnection: Connection) => GraphEdge | false
  applyEdgeChanges: <ED = EdgeData>(changes: EdgeChange[]) => GraphEdge<ED>[]
  applyNodeChanges: <ND = NodeData>(changes: NodeChange[]) => GraphNode<ND>[]
  addSelectedElements: (elements: FlowElements<NodeData, EdgeData>) => void
  addSelectedEdges: (edges: GraphEdge<EdgeData>[]) => void
  addSelectedNodes: (nodes: GraphNode<NodeData>[]) => void
  setMinZoom: (zoom: number) => void
  setMaxZoom: (zoom: number) => void
  setTranslateExtent: (translateExtent: CoordinateExtent) => void
  resetSelectedElements: () => void
  setInteractive: (isInteractive: boolean) => void
  setState: (state: Partial<FlowOptions<NodeData, EdgeData> & Omit<State, 'nodes' | 'edges' | 'modelValue'>>) => void
  updateNodePosition: ({ id, diff, dragging }: { id?: string; diff?: XYPosition; dragging?: boolean }) => void
  updateNodeDimensions: (
    updates: {
      id: string
      nodeElement: HTMLDivElement
      forceUpdate?: boolean
    }[],
  ) => void
  $reset: () => void
}

export interface Getters<NodeData = ElementData, EdgeData = ElementData> {
  getEdgeTypes: Record<keyof DefaultEdgeTypes | string, EdgeComponent>
  getNodeTypes: Record<keyof DefaultNodeTypes | string, NodeComponent>
  /** filters hidden nodes */
  getNodes: GraphNode<NodeData>[]
  /** filters hidden edges */
  getEdges: GraphEdge<EdgeData>[]
  getNode: (id: string) => GraphNode<NodeData> | undefined
  getEdge: (id: string) => GraphEdge<EdgeData> | undefined
  getSelectedElements: FlowElements<NodeData, EdgeData>
  getSelectedNodes: GraphNode<NodeData>[]
  getSelectedEdges: GraphEdge<EdgeData>[]
}

export type ComputedGetters<NodeData = ElementData, EdgeData = ElementData> = {
  [key in keyof Getters<NodeData, EdgeData>]: ComputedRef<Getters<NodeData, EdgeData>[key]>
}

export type Store<NodeData = ElementData, EdgeData = ElementData> = State<NodeData, EdgeData> &
  Actions<NodeData, EdgeData> &
  Getters<NodeData, EdgeData>

export type UseVueFlow<NodeData = ElementData, EdgeData = ElementData> = {
  id: string
  store: Store<NodeData, EdgeData>
} & FlowHooksOn<NodeData, EdgeData> &
  ToRefs<State<NodeData, EdgeData>> &
  ComputedGetters<NodeData, EdgeData> &
  Actions<NodeData, EdgeData>
