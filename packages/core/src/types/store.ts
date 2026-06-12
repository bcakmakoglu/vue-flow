import type { ComputedRef, DeepReadonly, ToRefs } from 'vue'
import type { KeyFilter } from '@vueuse/core'
import type { PanOnScrollMode, PanZoomInstance, Transform, Viewport } from '@xyflow/system'
import type { ViewportHelper } from '../composables'
import type { Dimensions, FlowExportObject, FlowProps, Rect, SelectionMode, SelectionRect, SnapGrid, XYPosition } from './flow'
import type { DefaultEdgeTypes, DefaultNodeTypes, EdgeComponent, NodeComponent } from './components'
import type {
  Connection,
  ConnectionLineOptions,
  ConnectionLookup,
  ConnectionMode,
  ConnectionStatus,
  Connector,
  NodeConnection,
} from './connection'
import type { DefaultEdgeOptions, Edge, EdgeReconnectable } from './edge'
import type { BuiltInNode, CoordinateExtent, CoordinateExtentRange, GraphNode, Node } from './node'
import type { FlowHooks, FlowHooksEmit, FlowHooksOn } from './hooks'
import type { EdgeChange, NodeChange, NodeDragItem } from './changes'
import type { ConnectingHandle, HandleType, ValidConnectionFunc } from './handle'

export type NodeLookup<NodeType extends Node = Node> = Map<string, GraphNode<NodeType>>

export type EdgeLookup<EdgeType extends Edge = Edge> = Map<string, EdgeType>

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

  /** all stored nodes (the user-facing `Node`s; enriched `InternalNode`s live in `nodeLookup`) */
  nodes: NodeType[]
  /** all stored edges (the user-facing `Edge`s, verbatim — xyflow parity: no enriched edge exists) */
  edges: EdgeType[]

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
  /** canonical viewport transform `[x, y, zoom]` (the `@xyflow/system` representation) - do not change! Read `viewport` for the `{ x, y, zoom }` shape. */
  readonly transform: Transform
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
  connectionStartHandle: ConnectingHandle | null
  connectionEndHandle: ConnectingHandle | null
  connectionClickStartHandle: ConnectingHandle | null
  connectionPosition: XYPosition
  connectionRadius: number
  connectionStatus: ConnectionStatus | null
  isValidConnection: ValidConnectionFunc | null

  connectOnClick: boolean
  reconnectRadius: number

  snapToGrid: boolean
  snapGrid: SnapGrid
  defaultMarkerColor: string

  edgesReconnectable: EdgeReconnectable
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

export type SetNodes<NodeType extends Node = Node> = (nodes: NodeType[] | ((nodes: NodeType[]) => NodeType[])) => void

export type SetEdges<EdgeType extends Edge = Edge> = (edges: EdgeType[] | ((edges: EdgeType[]) => EdgeType[])) => void

export type AddNodes<NodeType extends Node = Node> = (
  nodes: NodeType | NodeType[] | ((nodes: NodeType[]) => NodeType | NodeType[]),
) => void

export type RemoveNodes = (
  nodes: (string | Node) | (Node | string)[] | ((nodes: Node[]) => (string | Node) | (Node | string)[]),
  removeConnectedEdges?: boolean,
  removeChildren?: boolean,
) => void

export type RemoveEdges = (
  edges: (string | Edge) | (Edge | string)[] | ((edges: Edge[]) => (string | Edge) | (Edge | string)[]),
) => void

export type AddEdges<EdgeType extends Edge = Edge> = (
  edgesOrConnections:
    | (EdgeType | Connection)
    | (EdgeType | Connection)[]
    | ((edges: EdgeType[]) => (EdgeType | Connection) | (EdgeType | Connection)[]),
) => void

export type ReconnectEdge<EdgeType extends Edge = Edge> = (
  oldEdge: EdgeType,
  newConnection: Connection,
  shouldReplaceId?: boolean,
) => EdgeType | false

export type UpdateEdgeData<EdgeType extends Edge = Edge> = (
  id: string,
  dataUpdate: Partial<EdgeType['data']> | ((edge: EdgeType) => Partial<EdgeType['data']>),
  options?: { replace: boolean },
) => void

export type SetState<NodeType extends Node = Node, EdgeType extends Edge = Edge> = (
  state: Partial<State<NodeType, EdgeType>> | ((state: State<NodeType, EdgeType>) => Partial<State<NodeType, EdgeType>>),
) => void

export type UpdateNodePosition = (dragItems: NodeDragItem[], changed: boolean, dragging: boolean) => void

export type UpdateNodeDimensions = (updates: UpdateNodeDimensionsParams[]) => void

export type UpdateNodeInternals = (nodeIds?: string[]) => void

export type GetNode<NodeType extends Node = Node> = (id: string | undefined | null) => DeepReadonly<NodeType> | undefined

/**
 * Returns the enriched {@link InternalNode} (`internals.{positionAbsolute, z, handleBounds, userNode}` +
 * authoritative `measured`) for an id, mirroring xyflow/react's `getInternalNode`. This is the accessor
 * for store-computed data; `getNode` exposes the user-facing node.
 */
export type GetInternalNode<NodeType extends Node = Node> = (id: string | undefined | null) => GraphNode<NodeType> | undefined

export type GetEdge<EdgeType extends Edge = Edge> = (id: string | undefined | null) => DeepReadonly<EdgeType> | undefined

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
  getNode: GetNode<NodeType>
  /** get the enriched internal node (store-computed `internals` + `measured`) by id */
  getInternalNode: GetInternalNode<NodeType>
  /** find an edge by id */
  getEdge: GetEdge<EdgeType>
  /** updates an edge */
  reconnectEdge: ReconnectEdge<EdgeType>
  /** updates the data of an edge */
  updateEdgeData: UpdateEdgeData<EdgeType>
  /** updates a node */
  updateNode: UpdateNode<NodeType>
  /** updates the data of a node */
  updateNodeData: UpdateNodeData<NodeType>
  /** applies default edge change handler */
  applyEdgeChanges: (changes: EdgeChange<EdgeType>[]) => EdgeType[]
  /** applies default node change handler; returns the resulting user nodes */
  applyNodeChanges: (changes: NodeChange<NodeType>[]) => NodeType[]
  /** manually select edges and add to state */
  addSelectedEdges: (edges: EdgeType[]) => void
  /** manually select nodes and add to state */
  addSelectedNodes: (nodes: NodeType[]) => void
  /** manually unselect edges and remove from state */
  removeSelectedEdges: (edges?: EdgeType[]) => void
  /** manually unselect nodes and remove from state */
  removeSelectedNodes: (nodes?: NodeType[]) => void
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
  getConnectedEdges: (nodes: Node[]) => EdgeType[]
  /** get all connections of a handle belonging to a node */
  getHandleConnections: ({ id, type, nodeId }: { id?: string | null; type: HandleType; nodeId: string }) => NodeConnection[]
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
  /** all visible nodes (user-facing `Node`s; use `getInternalNode`/`nodeLookup` for enriched data) */
  getNodes: DeepReadonly<NodeType[]>
  // NOTE: DeepReadonly is a TYPE-only guard (zero runtime) — mutating a node read here is a compile error
  // pointing users at the helpers (updateNode/updateNodeData/applyNodeChanges/setNodes); see #40.
  /** all visible edges (user-facing `Edge`s) */
  getEdges: DeepReadonly<EdgeType[]>
  /** returns all currently selected nodes (user-facing `Node`s) */
  getSelectedNodes: DeepReadonly<NodeType[]>
  /** returns all currently selected edges */
  getSelectedEdges: DeepReadonly<EdgeType[]>
  /** the viewport as `{ x, y, zoom }`, derived from the canonical `transform` — read-only; set via `setViewport`/`zoom*`/`fitView` */
  viewport: Viewport
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
