import { ComputedRef, CSSProperties, ToRefs } from 'vue'
import { Dimensions, ElementData, Elements, FlowElements, FlowInstance, FlowOptions, Rect, SnapGrid, XYPosition } from './flow'
import { EdgeComponent, NodeComponent, DefaultNodeTypes, DefaultEdgeTypes } from './components'
import { Connection, ConnectionLineType, ConnectionMode } from './connection'
import { DefaultEdgeOptions, Edge, GraphEdge } from './edge'
import { GraphNode, CoordinateExtent, Node } from './node'
import { D3Selection, D3Zoom, D3ZoomHandler, KeyCode, PanOnScrollMode, Viewport } from './zoom'
import { FlowHooks, FlowHooksOn } from './hooks'
import { NodeChange, EdgeChange } from './changes'
import { StartHandle, HandleType } from './handle'

export interface State extends Omit<FlowOptions, 'id' | 'modelValue'> {
  /** Event hooks, you can manipulate the triggers on your own peril */
  hooks: FlowHooks
  instance: FlowInstance | null

  /** all stored nodes */
  nodes: GraphNode[]
  /** all stored edges */
  edges: GraphEdge[]

  d3Zoom: D3Zoom | null
  d3Selection: D3Selection | null
  d3ZoomHandler: D3ZoomHandler | null

  minZoom: number
  maxZoom: number
  defaultZoom: number
  translateExtent: CoordinateExtent
  nodeExtent: CoordinateExtent

  /** viewport dimensions */
  dimensions: Dimensions
  /** viewport transform x, y, z */
  viewport: Viewport

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

  initialized: boolean
  applyDefault: boolean

  fitViewOnInit?: boolean

  noDragClassName?: 'nodrag' | string
  noWheelClassName?: 'nowheel' | string
  noPanClassName?: 'nopan' | string

  defaultEdgeOptions?: DefaultEdgeOptions

  vueFlowVersion: string
}

export interface Actions {
  /** parses elements (nodes + edges) and re-sets the state */
  setElements: (elements: Elements | ((elements: FlowElements) => Elements), extent?: CoordinateExtent) => void
  /** parses nodes and re-sets the state */
  setNodes: (nodes: Node[] | ((nodes: GraphNode[]) => Node[]), extent?: CoordinateExtent) => void
  /** parses edges and re-sets the state */
  setEdges: (edges: Edge[] | ((edges: GraphEdge[]) => Edge[])) => void
  /** parses nodes and adds to state */
  addNodes: (nodes: Node[] | ((nodes: GraphNode[]) => Node[]), extent?: CoordinateExtent) => void
  /** parses edges and adds to state */
  addEdges: (edgesOrConnections: (Edge | Connection)[] | ((edges: GraphEdge[]) => (Edge | Connection)[])) => void
  /** updates an edge */
  updateEdge: (oldEdge: GraphEdge, newConnection: Connection) => GraphEdge | false
  applyEdgeChanges: (changes: EdgeChange[]) => GraphEdge[]
  applyNodeChanges: (changes: NodeChange[]) => GraphNode[]
  addSelectedElements: (elements: FlowElements) => void
  addSelectedEdges: (edges: GraphEdge[]) => void
  addSelectedNodes: (nodes: GraphNode[]) => void
  setMinZoom: (zoom: number) => void
  setMaxZoom: (zoom: number) => void
  setTranslateExtent: (translateExtent: CoordinateExtent) => void
  resetSelectedElements: () => void
  setInteractive: (isInteractive: boolean) => void
  setState: (
    state:
      | Partial<FlowOptions & Omit<State, 'nodes' | 'edges' | 'modelValue'>>
      | ((state: State) => Partial<FlowOptions & Omit<State, 'nodes' | 'edges' | 'modelValue'>>),
  ) => void

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

export interface Getters {
  getEdgeTypes: Record<keyof DefaultEdgeTypes | string, EdgeComponent>
  getNodeTypes: Record<keyof DefaultNodeTypes | string, NodeComponent>
  /** filters hidden nodes */
  getNodes: GraphNode[]
  /** filters hidden edges */
  getEdges: GraphEdge[]
  getNode: <Data = ElementData>(id: string) => GraphNode<Data> | undefined
  getEdge: <Data = ElementData>(id: string) => GraphEdge<Data> | undefined
  getSelectedElements: FlowElements
  getSelectedNodes: GraphNode[]
  getSelectedEdges: GraphEdge[]
}

export type ComputedGetters = {
  [key in keyof Getters]: ComputedRef<Getters[key]>
}

export type Store = State & Actions & Getters

export type UseVueFlow = {
  id: string
  store: Store
} & FlowHooksOn &
  ToRefs<State> &
  ComputedGetters &
  Actions
