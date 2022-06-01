import type { CSSProperties, ComputedRef, ToRefs } from 'vue'
import type { Dimensions, ElementData, Elements, FlowElements, FlowInstance, FlowOptions, SnapGrid, XYPosition } from './flow'
import type { DefaultEdgeTypes, DefaultNodeTypes, EdgeComponent, NodeComponent } from './components'
import type { Connection, ConnectionLineType, ConnectionMode } from './connection'
import type { DefaultEdgeOptions, Edge, GraphEdge } from './edge'
import type { CoordinateExtent, GraphNode, Node } from './node'
import type { D3Selection, D3Zoom, D3ZoomHandler, KeyCode, PanOnScrollMode, Viewport } from './zoom'
import type { FlowHooks, FlowHooksEmit, FlowHooksOn } from './hooks'
import type { EdgeChange, NodeChange, NodeDragItem } from './changes'
import type { HandleType, StartHandle } from './handle'

export interface UpdateNodeDimensionsParams {
  id: string
  nodeElement: HTMLDivElement
  forceUpdate?: boolean
}

export interface State extends Omit<FlowOptions, 'id' | 'modelValue'> {
  /** Event hooks, you can manipulate the triggers at your own peril */
  readonly hooks: FlowHooks
  readonly instance: FlowInstance | null

  /** all stored nodes */
  nodes: GraphNode[]
  /** all stored edges */
  edges: GraphEdge[]

  readonly d3Zoom: D3Zoom | null
  readonly d3Selection: D3Selection | null
  readonly d3ZoomHandler: D3ZoomHandler | null

  /** use setMinZoom action to change minZoom */
  minZoom: number
  /** use setMaxZoom action to change maxZoom */
  maxZoom: number
  defaultZoom: number
  /** use setTranslateExtent action to change translateExtent */
  translateExtent: CoordinateExtent
  nodeExtent: CoordinateExtent

  /** viewport dimensions - do not change! */
  readonly dimensions: Dimensions
  /** viewport transform x, y, z - do not change!  */
  readonly viewport: Viewport
  /** if true will skip rendering any elements currently not inside viewport until they become visible */
  onlyRenderVisibleElements: boolean
  defaultPosition: [number, number]

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

  /** current vue flow version you're using */
  readonly vueFlowVersion: string
}

export type SetElements = (elements: Elements | ((elements: FlowElements) => Elements), extent?: CoordinateExtent) => void
export type SetNodes = (nodes: Node[] | ((nodes: GraphNode[]) => Node[]), extent?: CoordinateExtent) => void
export type SetEdges = (edges: Edge[] | ((edges: GraphEdge[]) => Edge[])) => void
export type AddNodes = (nodes: Node[] | ((nodes: GraphNode[]) => Node[]), extent?: CoordinateExtent) => void
export type AddEdges = (edgesOrConnections: (Edge | Connection)[] | ((edges: GraphEdge[]) => (Edge | Connection)[])) => void
export type UpdateEdge = (oldEdge: GraphEdge, newConnection: Connection) => GraphEdge | false
export type SetState = (
  state:
    | Partial<FlowOptions & Omit<State, 'nodes' | 'edges' | 'modelValue'>>
    | ((state: State) => Partial<FlowOptions & Omit<State, 'nodes' | 'edges' | 'modelValue'>>),
) => void
export type UpdateNodePosition = (dragItems: NodeDragItem[], changed: boolean, dragging: boolean) => void
export type UpdateNodeDimensions = (updates: UpdateNodeDimensionsParams[]) => void

export interface Actions {
  /** parses elements (nodes + edges) and re-sets the state */
  setElements: SetElements
  /** parses nodes and re-sets the state */
  setNodes: SetNodes
  /** parses edges and re-sets the state */
  setEdges: SetEdges
  /** parses nodes and adds to state */
  addNodes: AddNodes
  /** parses edges and adds to state */
  addEdges: AddEdges
  /** updates an edge */
  updateEdge: UpdateEdge
  /** applies default edge change handler */
  applyEdgeChanges: (changes: EdgeChange[]) => GraphEdge[]
  /** applies default node change handler */
  applyNodeChanges: (changes: NodeChange[]) => GraphNode[]
  /** manually select elements and add to state */
  addSelectedElements: (elements: FlowElements) => void
  /** manually select edges and add to state */
  addSelectedEdges: (edges: GraphEdge[]) => void
  /** manually select nodes and add to state */
  addSelectedNodes: (nodes: GraphNode[]) => void
  /** manually unselect edges and remove from state */
  removeSelectedEdges: (edges: GraphEdge[]) => void
  /** manually unselect nodes and remove from state */
  removeSelectedNodes: (nodes: GraphNode[]) => void
  /** unselect selected elements (if none are passed, all elements are unselected) */
  removeSelectedElements: (elements?: { nodes?: GraphNode[]; edges?: GraphEdge[] }) => void
  /** apply min zoom value to d3 */
  setMinZoom: (zoom: number) => void
  /** apply max zoom value to d3 */
  setMaxZoom: (zoom: number) => void
  /** apply translate extent to d3 */
  setTranslateExtent: (translateExtent: CoordinateExtent) => void
  /** enable/disable node interaction (dragging, selecting etc) */
  setInteractive: (isInteractive: boolean) => void
  /** set new state */
  setState: SetState

  /** internal position updater, you probably don't want to use this */
  updateNodePositions: UpdateNodePosition
  /** internal dimensions' updater, you probably don't want to use this */
  updateNodeDimensions: UpdateNodeDimensions

  /** reset state to defaults */
  $reset: () => void
}

export interface Getters {
  /** returns object containing current edge types */
  getEdgeTypes: Record<keyof DefaultEdgeTypes | string, EdgeComponent>
  /** returns object containing current node types */
  getNodeTypes: Record<keyof DefaultNodeTypes | string, NodeComponent>
  /** filters hidden nodes */
  getNodes: GraphNode[]
  /** filters hidden edges */
  getEdges: GraphEdge[]
  /** returns a node by id */
  getNode: <Data = ElementData>(id: string) => GraphNode<Data> | undefined
  /** returns an edge by id */
  getEdge: <Data = ElementData>(id: string) => GraphEdge<Data> | undefined
  /** returns all currently selected elements */
  getSelectedElements: FlowElements
  /** returns all currently selected nodes */
  getSelectedNodes: GraphNode[]
  /** returns all currently selected edges */
  getSelectedEdges: GraphEdge[]
}

export type ComputedGetters = {
  [key in keyof Getters]: ComputedRef<Getters[key]>
}

export type VueFlowStore = {
  readonly id: string
  readonly emits: FlowHooksEmit
} & FlowHooksOn &
  ToRefs<State> &
  Readonly<ComputedGetters> &
  Readonly<Actions>
