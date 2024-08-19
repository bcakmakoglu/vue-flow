import type { ComputedRef, ToRefs } from 'vue'
import type { KeyFilter } from '@vueuse/core'
import type { ViewportHelper } from '../composables'
import type {
  Dimensions,
  ElementData,
  FlowExportObject,
  FlowProps,
  Rect,
  SelectionMode,
  SelectionRect,
  SnapGrid,
  XYPosition,
} from './flow'
import type { DefaultEdgeTypes, DefaultNodeTypes, EdgeComponent, NodeComponent } from './components'
import type { ConnectionLineOptions, ConnectionLookup, ConnectionMode, ConnectionStatus, Connector } from './connection'
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

export interface Actions extends Omit<ViewportHelper, 'viewportInitialized'> {
  /**
   * Sets nodes.
   *
   * @param nodes - the nodes to set or a function that receives the current nodes and returns the new nodes
   */
  setNodes: (nodes: Node[] | ((nodes: GraphNode[]) => Node[])) => void

  /**
   * Sets edges.
   *
   * @param edges - the edges to set or a function that receives the current edges and returns the new edges
   */
  setEdges: (edges: Edge[] | ((edges: GraphEdge[]) => Edge[])) => void

  /**
   * Adds nodes.
   *
   * @param nodes - the nodes to add
   */
  addNodes: (nodes: Node | Node[]) => void

  /**
   * Adds edges.
   *
   * @param edges - the edges to add
   */
  addEdges: (edges: Edge | Edge[]) => void

  /**
   * Removes nodes from state.
   *
   * @param nodes - the nodes or its id(s) to remove or a function that receives the current nodes and returns the nodes or its id(s) to remove
   * @param options - extra options for the removal
   * @param options.removeConnectedEdges - if true, connected edges will be removed as well
   * @param options.removeChildren - if true, children will be removed as well
   */
  removeNodes: (
    nodes: (string | Node) | (Node | string)[] | ((nodes: GraphNode[]) => (string | Node) | (Node | string)[]),
    options?: { removeConnectedEdges?: boolean; removeChildren?: boolean },
  ) => void

  /**
   * Removes edges from state.
   *
   * @param edges - the edges or its id(s) to remove or a function that receives the current edges and returns the edges or its id(s) to remove
   */
  removeEdges: (
    edges: (string | Edge) | (Edge | string)[] | ((edges: GraphEdge[]) => (string | Edge) | (Edge | string)[]),
  ) => void

  /**
   * Get a node by id.
   *
   * @param id - the node id
   */
  getNode: <Data = ElementData>(id: string) => GraphNode<Data> | undefined

  /**
   * Get a edge by id.
   *
   * @param id - the edge id
   */
  getEdge: <Data = ElementData>(id: string) => GraphEdge<Data> | undefined

  /**
   * Updates an edge.
   *
   * @param id - id of the edge to update
   * @param edgeUpdate - the edge update as an object or a function that receives the current edge and returns the edge update
   * @param options.replace - if true, the edge is replaced with the edge update, otherwise the changes get merged
   *
   * @example
   * updateEdge('edge-1', (edge) => ({ label: 'A new label' }));
   */
  updateEdge: (
    id: string,
    edgeUpdate: Partial<GraphEdge> | ((edge: GraphEdge) => Partial<GraphEdge>),
    options?: { replace: boolean },
  ) => void

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
    dataUpdate: Partial<GraphEdge['data']> | ((edge: GraphEdge) => Partial<GraphEdge['data']>),
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
    nodeUpdate: Partial<GraphNode> | ((node: GraphNode) => Partial<GraphNode>),
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
    dataUpdate: Partial<GraphNode['data']> | ((node: GraphNode) => Partial<GraphNode['data']>),
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
  removeSelectedEdges: (edges?: GraphEdge[]) => void

  /** manually unselect nodes and remove from state */
  removeSelectedNodes: (nodes?: GraphNode[]) => void

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

  /**
   * Set the state.
   *
   * @param state - the state to set or a function that receives the current state and returns the new state
   */
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

  /**
   * Update node positions.
   *
   * internal position updater, you shouldn't use this
   *
   * @internal
   * @param dragItems - the drag items
   * @param changed - if the positions have changed
   * @param dragging - if the items are currently being dragged
   */
  updateNodePositions: (dragItems: NodeDragItem[], changed: boolean, dragging: boolean) => void

  /**
   * Update node dimensions.
   *
   * internal dimension updater, you shouldn't use this
   *
   * @internal
   * @param updates - the updates
   */
  updateNodeDimensions: (updates: UpdateNodeDimensionsParams[]) => void

  /**
   * Check if a node or a rect is intersecting with other nodes.
   *
   * @param nodeOrRect - the node or rect to check for intersections
   * @param partially - if true, the node is considered to be intersecting if it partially overlaps with the passed node or rect
   * @param nodes - optional nodes array to check for intersections
   */
  getIntersectingNodes: (
    nodeOrRect: (Partial<Node> & { id: Node['id'] }) | Rect,
    partially?: boolean,
    nodes?: GraphNode[],
  ) => GraphNode[]

  /**
   * Check if a node or a rect is intersecting with the passed rect.
   *
   * @param nodeOrRect - the node or rect to check for intersections
   * @param area - the rect to check for intersections
   * @param partially - if true, the node is considered to be intersecting if it partially overlaps with the passed react
   */
  isNodeIntersecting: (nodeOrRect: (Partial<Node> & { id: Node['id'] }) | Rect, area: Rect, partially?: boolean) => boolean

  /** get a node's incomers */
  getIncomers: (nodeOrId: Node | string) => GraphNode[]

  /** get a node's outgoers */
  getOutgoers: (nodeOrId: Node | string) => GraphNode[]

  /** get a node's connected edges */
  getConnectedEdges: (nodesOrId: Node[] | string) => GraphEdge[]

  /** pan the viewport; return indicates if a transform has happened or not */
  panBy: (delta: XYPosition) => boolean

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
