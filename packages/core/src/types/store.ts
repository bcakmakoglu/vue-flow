import type { CSSProperties, ComputedRef, ToRefs } from 'vue'
import type { KeyFilter } from '@vueuse/core'
import type { ViewportHelper } from '../composables'
import type { Dimensions, FlowExportObject, FlowProps, Rect, SelectionMode, SelectionRect, SnapGrid, XYPosition } from './flow'
import type { DefaultEdgeTypes, DefaultNodeTypes, EdgeComponent, NodeComponent } from './components'
import type {
  Connection,
  ConnectionLineOptions,
  ConnectionLineType,
  ConnectionLookup,
  ConnectionMode,
  ConnectionStatus,
  Connector,
} from './connection'
import type { DefaultEdgeOptions, Edge, EdgeUpdatable, GraphEdge } from './edge'
import type { CoordinateExtent, CoordinateExtentRange, GraphNode, Node } from './node'
import type { D3Selection, D3Zoom, D3ZoomHandler, PanOnScrollMode, ViewportTransform } from './zoom'
import type { FlowHooks, FlowHooksEmit, FlowHooksOn } from './hooks'
import type { EdgeChange, NodeChange, NodeDragItem } from './changes'
import type { ConnectingHandle, ValidConnectionFunc } from './handle'

export type NodeLookup = Map<string, GraphNode>

export type EdgeLookup = Map<string, GraphEdge>

export interface UpdateNodeDimensionsParams {
  id: string
  nodeElement: HTMLDivElement
  forceUpdate?: boolean
}

export interface State extends Omit<FlowProps, 'id' | 'modelValue'> {
  /** Vue flow element ref */
  vueFlowRef: HTMLDivElement | null
  /** Vue flow viewport element */
  viewportRef: HTMLDivElement | null

  /** Event hooks, you can manipulate the triggers at your own peril */
  readonly hooks: FlowHooks

  /** all stored nodes */
  nodes: GraphNode[]
  /** all stored edges */
  edges: GraphEdge[]

  connectionLookup: ConnectionLookup

  readonly d3Zoom: D3Zoom | null
  readonly d3Selection: D3Selection | null
  readonly d3ZoomHandler: D3ZoomHandler | null

  /** use setMinZoom action to change minZoom */
  minZoom: number
  /** use setMaxZoom action to change maxZoom */
  maxZoom: number
  defaultViewport: Partial<ViewportTransform>
  /** use setTranslateExtent action to change translateExtent */
  translateExtent: CoordinateExtent
  nodeExtent: CoordinateExtent | CoordinateExtentRange

  /** viewport dimensions - do not change! */
  readonly dimensions: Dimensions
  /** viewport transform x, y, z - do not change!  */
  readonly viewport: ViewportTransform
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

export interface Actions<NodeType extends Node = Node, EdgeType extends Edge = Edge>
  extends Omit<ViewportHelper, 'viewportInitialized'> {
  /** parses nodes and re-sets the state */
  setNodes: (nodes: Node[] | ((nodes: GraphNode[]) => Node[])) => void
  /** parses edges and re-sets the state */
  setEdges: (edges: Edge[] | ((edges: GraphEdge[]) => Edge[])) => void
  /** parses nodes and adds to state */
  addNodes: (nodes: Node | Node[] | ((nodes: GraphNode[]) => Node | Node[])) => void
  /** parses edges and adds to state */
  addEdges: (
    edgesOrConnections:
      | (Edge | Connection)
      | (Edge | Connection)[]
      | ((edges: GraphEdge[]) => (Edge | Connection) | (Edge | Connection)[]),
  ) => void
  /** remove nodes (and possibly connected edges and children) from state */
  removeNodes: (
    nodes: (string | Node) | (Node | string)[] | ((nodes: GraphNode[]) => (string | Node) | (Node | string)[]),
    removeConnectedEdges?: boolean,
    removeChildren?: boolean,
  ) => void
  /** remove edges from state */
  removeEdges: (
    edges: (string | Edge) | (Edge | string)[] | ((edges: GraphEdge[]) => (string | Edge) | (Edge | string)[]),
  ) => void
  /** find a node by id */
  getNode: (id: string | undefined | null) => GraphNode<NodeType> | undefined
  /** find an edge by id */
  getEdge: (id: string | undefined | null) => GraphEdge<EdgeType> | undefined
  updateEdge: (oldEdge: GraphEdge, newConnection: Connection, shouldReplaceId?: boolean) => GraphEdge | false
  /**
   * Updates the data attribute of a edge.
   *
   * @param id - id of the edge to update
   * @param dataUpdate - the data update as an object or a function that receives the current data and returns the data update
   * @param options.replace - if true, the data is replaced with the data update, otherwise the changes get merged
   *
   * @example
   * updateEdgeData('edge-1', { label: 'A new label' });
   */
  updateEdgeData: (
    id: string,
    dataUpdate: Partial<EdgeType['data']> | ((edge: EdgeType) => Partial<EdgeType['data']>),
    options?: { replace: boolean },
  ) => void
  /**
   * Updates a node.
   *
   * @param id - id of the node to update
   * @param nodeUpdate - the node update as an object or a function that receives the current node and returns the node update
   * @param options.replace - if true, the node is replaced with the node update, otherwise the changes get merged
   *
   * @example
   * updateNode('node-1', (node) => ({ position: { x: node.position.x + 10, y: node.position.y } }));
   */
  updateNode: (
    id: string,
    nodeUpdate: Partial<NodeType> | ((node: NodeType) => Partial<NodeType>),
    options?: { replace: boolean },
  ) => void
  /**
   * Updates the data attribute of a node.
   *
   * @param id - id of the node to update
   * @param dataUpdate - the data update as an object or a function that receives the current data and returns the data update
   * @param options.replace - if true, the data is replaced with the data update, otherwise the changes get merged
   *
   * @example
   * updateNodeData('node-1', { label: 'A new label' });
   */
  updateNodeData: (
    id: string,
    dataUpdate: Partial<NodeType['data']> | ((node: NodeType) => Partial<NodeType['data']>),
    options?: { replace: boolean },
  ) => void
  /** applies default edge change handler */
  applyEdgeChanges: (changes: EdgeChange[]) => GraphEdge[]
  /** applies default node change handler */
  applyNodeChanges: (changes: NodeChange[]) => GraphNode[]
  /** manually select edges and add to state */
  addSelectedEdges: (edges: GraphEdge[]) => void
  /** manually select nodes and add to state */
  addSelectedNodes: (nodes: GraphNode[]) => void
  /** manually unselect edges and remove from state */
  removeSelectedEdges: (edges: GraphEdge[]) => void
  /** manually unselect nodes and remove from state */
  removeSelectedNodes: (nodes: GraphNode[]) => void
  /** apply min zoom value to d3 */
  setMinZoom: (zoom: number) => void
  /** apply max zoom value to d3 */
  setMaxZoom: (zoom: number) => void
  /** apply translate extent to d3 */
  setTranslateExtent: (translateExtent: CoordinateExtent) => void
  /** apply extent to nodes */
  setNodeExtent: (nodeExtent: CoordinateExtent | CoordinateExtentRange) => void
  setPaneClickDistance: (distance: number) => void
  /** enable/disable node interaction (dragging, selecting etc) */
  setInteractive: (isInteractive: boolean) => void
  /** set new state */
  setState: (
    state:
      | Partial<FlowProps & Omit<State, 'nodes' | 'edges' | 'modelValue'>>
      | ((state: State) => Partial<FlowProps & Omit<State, 'nodes' | 'edges' | 'modelValue'>>),
  ) => void
  /** return an object of graph values (elements, viewport transform) for storage and re-loading a graph */
  toObject: () => FlowExportObject
  /** load graph from export obj */
  fromObject: (obj: FlowExportObject) => Promise<boolean>
  /** force update node internal data, if handle bounds are incorrect, you might want to use this */
  updateNodeInternals: (nodeIds?: string[]) => void
  /** start a connection */
  startConnection: (startHandle: ConnectingHandle, position?: XYPosition, isClick?: boolean) => void
  /** update connection position */
  updateConnection: (position: XYPosition, result?: ConnectingHandle | null, status?: ConnectionStatus | null) => void
  /** end (or cancel) a connection */
  endConnection: (event?: MouseEvent | TouchEvent, isClick?: boolean) => void

  /** internal position updater, you probably don't want to use this */
  updateNodePositions: (dragItems: NodeDragItem[], changed: boolean, dragging: boolean) => void
  /** internal dimensions' updater, you probably don't want to use this */
  updateNodeDimensions: (updates: UpdateNodeDimensionsParams[]) => void

  /**
   * Returns all nodes that intersect with the given node or rect.
   *
   * @param node - the node or rect to check for intersections
   * @param partially - if true, the node is considered to be intersecting if it partially overlaps with the passed node or rect
   * @param nodes - optional nodes array to check for intersections
   *
   * @returns an array of intersecting nodes
   */
  getIntersectingNodes: (node: NodeType | { id: Node['id'] } | Rect, partially?: boolean, nodes?: NodeType[]) => NodeType[]
  /**
   * Checks if the given node or rect intersects with the passed rect.
   *
   * @param node - the node or rect to check for intersections
   * @param area - the rect to check for intersections
   * @param partially - if true, the node is considered to be intersecting if it partially overlaps with the passed react
   *
   * @returns true if the node or rect intersects with the given area
   */
  isNodeIntersecting: (node: NodeType | { id: Node['id'] } | Rect, area: Rect, partially?: boolean) => boolean
  /** get a node's incomers */
  getIncomers: (nodeOrId: Node | string) => GraphNode[]
  /** get a node's outgoers */
  getOutgoers: (nodeOrId: Node | string) => GraphNode[]
  /** get a node's connected edges */
  getConnectedEdges: (nodesOrId: Node[] | string) => GraphEdge[]
  /** pan the viewport; return indicates if a transform has happened or not */
  panBy: (delta: XYPosition) => boolean
  /** viewport helper instance */
  viewportHelper: ComputedRef<ViewportHelper>

  /** reset state to defaults */
  $reset: () => void

  /** remove store instance from global storage and destroy it (will invalidate effect scopes) */
  $destroy: () => void
}

export interface Getters {
  /** returns object containing current edge types */
  getEdgeTypes: Record<keyof DefaultEdgeTypes | string, EdgeComponent>
  /** returns object containing current node types */
  getNodeTypes: Record<keyof DefaultNodeTypes | string, NodeComponent>
  /** all visible node */
  getNodes: GraphNode[]
  /** all visible edges */
  getEdges: GraphEdge[]
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
  readonly nodeLookup: ComputedRef<NodeLookup>
  readonly edgeLookup: ComputedRef<EdgeLookup>
  /** current vue flow version you're using */
  readonly vueFlowVersion: string
} & FlowHooksOn &
  ToRefs<State> &
  Readonly<ComputedGetters> &
  Readonly<Actions>
