import type { CSSProperties, ComputedRef, ToRefs } from 'vue'
import type { KeyFilter } from '@vueuse/core'
import type { PanOnScrollMode, PanZoomInstance, Viewport } from '@xyflow/system'
import type { ViewportHelper } from '../composables'
import type {
  Dimensions,
  FlowExportObject,
  FlowProps,
  Rect,
  SelectionMode,
  SelectionRect,
  SnapGrid,
  XYPosition,
} from './flow'
import type { DefaultEdgeTypes, DefaultNodeTypes, EdgeComponent, NodeComponent } from './components'
import type {
  Connection,
  ConnectionLineOptions,
  ConnectionLineType,
  ConnectionLookup,
  ConnectionMode,
  ConnectionStatus,
  Connector,
  HandleConnection,
} from './connection'
import type { DefaultEdgeOptions, Edge, EdgeUpdatable, GraphEdge } from './edge'
import type { BuiltInNode, CoordinateExtent, CoordinateExtentRange, GraphNode, Node } from './node'
import type { FlowHooks, FlowHooksEmit, FlowHooksOn } from './hooks'
import type { EdgeChange, NodeChange, NodeDragItem } from './changes'
import type { ConnectingHandle, HandleType, ValidConnectionFunc } from './handle'

export type NodeLookup<NodeType extends Node = Node> = Map<string, GraphNode<NodeType>>

export type EdgeLookup<EdgeType extends Edge = Edge> = Map<string, GraphEdge<EdgeType>>

export interface UpdateNodeDimensionsParams {
  id: string
  nodeElement: HTMLDivElement
  forceUpdate?: boolean
}

export interface State<NodeType extends Node = Node, EdgeType extends Edge = Edge>
  extends Omit<FlowProps<NodeType, EdgeType>, 'id' | 'nodes' | 'edges'> {
  /** Vue flow element ref */
  vueFlowRef: HTMLDivElement | null
  /** Vue flow viewport element */
  viewportRef: HTMLDivElement | null

  /** Event hooks, you can manipulate the triggers at your own peril */
  readonly hooks: FlowHooks<NodeType, EdgeType>

  /** all stored nodes */
  nodes: GraphNode<NodeType>[]
  /** all stored edges */
  edges: GraphEdge<EdgeType>[]

  connectionLookup: ConnectionLookup

  /** The panzoom instance */
  panZoom: PanZoomInstance | null

  /** use setMinZoom action to change minZoom */
  minZoom: number
  /** use setMaxZoom action to change maxZoom */
  maxZoom: number
  defaultViewport: Partial<Viewport>
  /** use setTranslateExtent action to change translateExtent */
  translateExtent: CoordinateExtent
  nodeExtent: CoordinateExtent | CoordinateExtentRange

  /** viewport dimensions - do not change! */
  readonly dimensions: Dimensions
  /** viewport transform x, y, z - do not change!  */
  readonly viewport: Viewport
  /** if true will skip rendering any elements currently not inside viewport until they become visible */
  onlyRenderVisibleElements: boolean
  nodesSelectionActive: boolean
  userSelectionActive: boolean
  multiSelectionActive: boolean

  deleteKeyCode: KeyFilter | null
  selectionKeyCode: KeyFilter | null
  multiSelectionKeyCode: KeyFilter | null
  zoomActivationKeyCode: KeyFilter | null
  panActivationKeyCode: KeyFilter | null

  connectionMode: ConnectionMode
  connectionLineOptions: ConnectionLineOptions
  /** @deprecated use {@link ConnectionLineOptions.type} */
  connectionLineType: ConnectionLineType | null
  /** @deprecated use {@link ConnectionLineOptions.style} */
  connectionLineStyle: CSSProperties | null
  connectionStartHandle: ConnectingHandle | null
  connectionEndHandle: ConnectingHandle | null
  connectionClickStartHandle: ConnectingHandle | null
  connectionPosition: XYPosition
  connectionRadius: number
  connectionStatus: ConnectionStatus | null
  isValidConnection: ValidConnectionFunc | null

  connectOnClick: boolean
  edgeUpdaterRadius: number

  snapToGrid: boolean
  snapGrid: SnapGrid
  defaultMarkerColor: string

  edgesUpdatable: EdgeUpdatable
  edgesFocusable: boolean

  nodesFocusable: boolean
  nodesDraggable: boolean
  nodesConnectable: boolean
  nodeDragThreshold: number

  elementsSelectable: boolean
  selectNodesOnDrag: boolean

  userSelectionRect: SelectionRect | null
  selectionMode: SelectionMode
  panOnDrag: boolean | number[]
  zoomOnScroll: boolean
  zoomOnPinch: boolean
  panOnScroll: boolean
  panOnScrollSpeed: number
  panOnScrollMode: PanOnScrollMode
  paneClickDistance: number
  zoomOnDoubleClick: boolean
  preventScrolling: boolean
  paneDragging: boolean

  initialized: boolean
  applyDefault: boolean
  autoConnect: boolean | Connector

  fitViewOnInit: boolean
  fitViewOnInitDone: boolean

  noDragClassName: 'nodrag' | string
  noWheelClassName: 'nowheel' | string
  noPanClassName: 'nopan' | string

  defaultEdgeOptions: DefaultEdgeOptions | undefined

  elevateEdgesOnSelect: boolean
  elevateNodesOnSelect: boolean

  autoPanOnConnect: boolean
  autoPanOnNodeDrag: boolean
  /**
   * The speed at which the viewport pans while dragging a node or a selection box.
   * @default 15
   */
  autoPanSpeed: number

  disableKeyboardA11y: boolean

  ariaLiveMessage: string
}

export type SetNodes<NodeType extends Node = Node> = (nodes: NodeType[] | ((nodes: GraphNode<NodeType>[]) => NodeType[])) => void

export type SetEdges<EdgeType extends Edge = Edge> = (
  edges: EdgeType[] | ((edges: GraphEdge<EdgeType>[]) => EdgeType[]),
) => void

export type AddNodes<NodeType extends Node = Node> = (
  nodes: NodeType | NodeType[] | ((nodes: GraphNode<NodeType>[]) => NodeType | NodeType[]),
) => void

export type RemoveNodes = (
  nodes: (string | Node) | (Node | string)[] | ((nodes: GraphNode[]) => (string | Node) | (Node | string)[]),
  removeConnectedEdges?: boolean,
  removeChildren?: boolean,
) => void

export type RemoveEdges = (
  edges: (string | Edge) | (Edge | string)[] | ((edges: GraphEdge[]) => (string | Edge) | (Edge | string)[]),
) => void

export type AddEdges<EdgeType extends Edge = Edge> = (
  edgesOrConnections:
    | (EdgeType | Connection)
    | (EdgeType | Connection)[]
    | ((edges: GraphEdge<EdgeType>[]) => (EdgeType | Connection) | (EdgeType | Connection)[]),
) => void

export type UpdateEdge<EdgeType extends Edge = Edge> = (
  oldEdge: GraphEdge<EdgeType>,
  newConnection: Connection,
  shouldReplaceId?: boolean,
) => GraphEdge<EdgeType> | false

export type UpdateEdgeData<EdgeType extends Edge = Edge> = (
  id: string,
  dataUpdate:
    | Partial<EdgeType['data']>
    | ((edge: GraphEdge<EdgeType>) => Partial<EdgeType['data']>),
  options?: { replace: boolean },
) => void

export type SetState<NodeType extends Node = Node, EdgeType extends Edge = Edge> = (
  state: Partial<State<NodeType, EdgeType>> | ((state: State<NodeType, EdgeType>) => Partial<State<NodeType, EdgeType>>),
) => void

export type UpdateNodePosition = (dragItems: NodeDragItem[], changed: boolean, dragging: boolean) => void

export type UpdateNodeDimensions = (updates: UpdateNodeDimensionsParams[]) => void

export type UpdateNodeInternals = (nodeIds?: string[]) => void

export type FindNode<NodeType extends Node = Node> = (id: string | undefined | null) => GraphNode<NodeType> | undefined

export type FindEdge<EdgeType extends Edge = Edge> = (id: string | undefined | null) => GraphEdge<EdgeType> | undefined

export type GetIntersectingNodes<NodeType extends Node = Node> = (
  node: (Partial<NodeType> & { id: NodeType['id'] }) | Rect,
  partially?: boolean,
  nodes?: GraphNode<NodeType>[],
) => GraphNode<NodeType>[]

export type UpdateNode<NodeType extends Node = Node> = (
  id: string,
  nodeUpdate: Partial<NodeType> | ((node: GraphNode<NodeType>) => Partial<NodeType>),
  options?: { replace: boolean },
) => void

export type UpdateNodeData<NodeType extends Node = Node> = (
  id: string,
  dataUpdate: Partial<NodeType['data']> | ((node: GraphNode<NodeType>) => Partial<NodeType['data']>),
  options?: { replace: boolean },
) => void

export type IsNodeIntersecting = (node: (Partial<Node> & { id: Node['id'] }) | Rect, area: Rect, partially?: boolean) => boolean

export interface Actions<NodeType extends Node = Node, EdgeType extends Edge = Edge>
  extends Omit<ViewportHelper, 'viewportInitialized'> {
  /** parses nodes and re-sets the state */
  setNodes: SetNodes<NodeType>
  /** parses edges and re-sets the state */
  setEdges: SetEdges<EdgeType>
  /** parses nodes and adds to state */
  addNodes: AddNodes<NodeType>
  /** parses edges and adds to state */
  addEdges: AddEdges<EdgeType>
  /** remove nodes (and possibly connected edges and children) from state */
  removeNodes: RemoveNodes
  /** remove edges from state */
  removeEdges: RemoveEdges
  /** find a node by id */
  findNode: FindNode<NodeType>
  /** find an edge by id */
  findEdge: FindEdge<EdgeType>
  /** updates an edge */
  updateEdge: UpdateEdge<EdgeType>
  /** updates the data of an edge */
  updateEdgeData: UpdateEdgeData<EdgeType>
  /** updates a node */
  updateNode: UpdateNode<NodeType>
  /** updates the data of a node */
  updateNodeData: UpdateNodeData<NodeType>
  /** applies default edge change handler */
  applyEdgeChanges: (changes: EdgeChange<EdgeType>[]) => GraphEdge<EdgeType>[]
  /** applies default node change handler */
  applyNodeChanges: (changes: NodeChange<NodeType>[]) => GraphNode<NodeType>[]
  /** manually select edges and add to state */
  addSelectedEdges: (edges: GraphEdge<EdgeType>[]) => void
  /** manually select nodes and add to state */
  addSelectedNodes: (nodes: GraphNode<NodeType>[]) => void
  /** manually unselect edges and remove from state */
  removeSelectedEdges: (edges?: GraphEdge<EdgeType>[]) => void
  /** manually unselect nodes and remove from state */
  removeSelectedNodes: (nodes?: GraphNode<NodeType>[]) => void
  /** apply min zoom value to panzoom */
  setMinZoom: (zoom: number) => void
  /** apply max zoom value to panzoom */
  setMaxZoom: (zoom: number) => void
  /** apply translate extent to panzoom */
  setTranslateExtent: (translateExtent: CoordinateExtent) => void
  /** apply extent to nodes */
  setNodeExtent: (nodeExtent: CoordinateExtent | CoordinateExtentRange) => void
  setPaneClickDistance: (distance: number) => void
  /** enable/disable node interaction (dragging, selecting etc) */
  setInteractive: (isInteractive: boolean) => void
  /** set new state */
  setState: SetState<NodeType, EdgeType>
  /** return an object of graph values (elements, viewport transform) for storage and re-loading a graph */
  toObject: () => FlowExportObject
  /** force update node internal data, if handle bounds are incorrect, you might want to use this */
  updateNodeInternals: UpdateNodeInternals
  /** start a connection */
  startConnection: (startHandle: ConnectingHandle, position?: XYPosition, isClick?: boolean) => void
  /** update connection position */
  updateConnection: (position: XYPosition, result?: ConnectingHandle | null, status?: ConnectionStatus | null) => void
  /** end (or cancel) a connection */
  endConnection: (event?: MouseEvent | TouchEvent, isClick?: boolean) => void

  /** internal position updater, you probably don't want to use this */
  updateNodePositions: UpdateNodePosition
  /** internal dimensions' updater, you probably don't want to use this */
  updateNodeDimensions: UpdateNodeDimensions

  /** returns all node intersections */
  getIntersectingNodes: GetIntersectingNodes<NodeType>
  /** check if a node is intersecting with a defined area */
  isNodeIntersecting: IsNodeIntersecting
  /** get a node's connected edges */
  getConnectedEdges: (nodes: Node[]) => GraphEdge<EdgeType>[]
  /** get all connections of a handle belonging to a node */
  getHandleConnections: ({ id, type, nodeId }: { id?: string | null; type: HandleType; nodeId: string }) => HandleConnection[]
  /** pan the viewport; return indicates if a transform has happened or not */
  panBy: (delta: XYPosition) => Promise<boolean>
  /** viewport helper instance */
  viewportHelper: ComputedRef<ViewportHelper>

  /** reset state to defaults */
  $reset: () => void

  /** remove store instance from global storage and destroy it (will invalidate effect scopes) */
  $destroy: () => void
}

export interface Getters<NodeType extends Node = Node, EdgeType extends Edge = Edge> {
  /** returns object containing current edge types */
  getEdgeTypes: Record<keyof DefaultEdgeTypes | string, EdgeComponent<EdgeType>>
  /** returns object containing current node types */
  getNodeTypes: Record<keyof DefaultNodeTypes | string, NodeComponent<NodeType | BuiltInNode>>
  /** all visible node */
  getNodes: GraphNode<NodeType>[]
  /** all visible edges */
  getEdges: GraphEdge<EdgeType>[]
  /**
   * returns a node by id
   * @deprecated use {@link Actions.findNode} instead
   */
  getNode: (id: string) => GraphNode<NodeType> | undefined
  /**
   * returns an edge by id
   * @deprecated use {@link Actions.findEdge} instead
   */
  getEdge: (id: string) => GraphEdge<EdgeType> | undefined
  /** returns all currently selected nodes */
  getSelectedNodes: GraphNode<NodeType>[]
  /** returns all currently selected edges */
  getSelectedEdges: GraphEdge<EdgeType>[]
}

export type ComputedGetters<NodeType extends Node = Node, EdgeType extends Edge = Edge> = {
  [key in keyof Getters<NodeType, EdgeType>]: ComputedRef<Getters<NodeType, EdgeType>[key]>
}

export type VueFlowStore<NodeType extends Node = Node, EdgeType extends Edge = Edge> = {
  readonly id: string
  readonly emits: FlowHooksEmit<NodeType, EdgeType>
  readonly nodeLookup: NodeLookup<NodeType>
  /** parentId → map of child id → child `GraphNode`. Matches `@xyflow/system`'s `ParentLookup`. */
  readonly parentLookup: Map<string, Map<string, GraphNode<NodeType>>>
  readonly edgeLookup: EdgeLookup<EdgeType>
  /** current vue flow version you're using */
  readonly vueFlowVersion: string
} & FlowHooksOn<NodeType, EdgeType> &
  ToRefs<State<NodeType, EdgeType>> &
  Readonly<ComputedGetters<NodeType, EdgeType>> &
  Readonly<Actions<NodeType, EdgeType>>
