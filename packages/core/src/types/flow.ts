import type { CSSProperties } from 'vue'
import type { KeyFilter } from '@vueuse/core'
import type { ColorMode, PanOnScrollMode, Viewport } from '@xyflow/system'
import type { VueFlowError } from '../utils'
import type { DefaultEdgeOptions, Edge, EdgeProps, EdgeReconnectable } from './edge'
import type { CoordinateExtent, CoordinateExtentRange, Node, NodeOrigin, NodeProps } from './node'
import type {
  Connection,
  ConnectionLineOptions,
  ConnectionLineProps,
  ConnectionMode,
  Connector,
  OnConnectStartParams,
} from './connection'
import type { EdgeTypesObject, NodeTypesObject } from './components'
import type { EdgeMouseEvent, EdgeReconnectEvent, MouseTouchEvent, NodeDragEvent, NodeMouseEvent } from './hooks'
import type { ValidConnectionFunc } from './handle'
import type { EdgeChange, NodeChange } from './changes'
import type { VueFlowInstance } from './store'
import type { FitViewParams } from './zoom'

// todo: should be object type
export type ElementData = any

export interface CustomThemeVars {
  [key: string]: string | number | undefined
}

export type CSSVars =
  | '--vf-node-color'
  | '--vf-box-shadow'
  | '--vf-node-bg'
  | '--vf-node-text'
  | '--vf-connection-path'
  | '--vf-handle'
  | '--vf-handle-border'
  | '--vf-edge-text'
  | '--vf-edge-text-bg'
  | '--vf-background-color'
  | '--vf-controls-bg'
  | '--vf-controls-bg-hover'
  | '--vf-controls-border'
  | '--vf-controls-color'
  | '--vf-minimap-bg'
  | '--vf-minimap-node-bg'
  | '--vf-minimap-mask'

export type ThemeVars = { [key in CSSVars]?: CSSProperties['color'] }
export type Styles = CSSProperties & ThemeVars & CustomThemeVars

/** Handle Positions */
export enum Position {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}

export interface XYPosition {
  x: number
  y: number
}

export interface Dimensions {
  width: number
  height: number
}

export interface Rect extends Dimensions, XYPosition {}

export type SnapGrid = [x: number, y: number]

export interface SelectionRect extends Rect {
  startX: number
  startY: number
}

export enum SelectionMode {
  Partial = 'partial',
  Full = 'full',
}

export interface FlowExportObject {
  /** exported nodes */
  nodes: Node[]
  /** exported edges */
  edges: Edge[]
  /** exported viewport (position + zoom) */
  viewport: Viewport
}

export type FlowOptions<NodeType extends Node = Node, EdgeType extends Edge = Edge> = FlowProps<NodeType, EdgeType>

export interface FlowProps<NodeType extends Node = Node, EdgeType extends Edge = Edge> {
  id?: string
  nodes?: NodeType[]
  edges?: EdgeType[]
  /** either use the edgeTypes prop to define your edge-types or use slots (<template #edge-mySpecialType="props">) */
  edgeTypes?: EdgeTypesObject<EdgeType>
  /** either use the nodeTypes prop to define your node-types or use slots (<template #node-mySpecialType="props">) */
  nodeTypes?: NodeTypesObject<NodeType>
  connectionMode?: ConnectionMode
  connectionLineOptions?: ConnectionLineOptions
  connectionRadius?: number
  isValidConnection?: ValidConnectionFunc | null
  deleteKeyCode?: KeyFilter | null
  selectionKeyCode?: KeyFilter | null
  multiSelectionKeyCode?: KeyFilter | null
  zoomActivationKeyCode?: KeyFilter | null
  panActivationKeyCode?: KeyFilter | null
  snapToGrid?: boolean
  snapGrid?: SnapGrid
  onlyRenderVisibleElements?: boolean
  edgesReconnectable?: EdgeReconnectable
  nodesDraggable?: boolean
  nodesConnectable?: boolean
  nodeDragThreshold?: number
  elementsSelectable?: boolean
  selectNodesOnDrag?: boolean
  /** move pane on drag, replaced prop `paneMovable` */
  panOnDrag?: boolean | number[]
  minZoom?: number
  maxZoom?: number
  /** initial viewport for an uncontrolled flow; ignored once the user pans/zooms */
  defaultViewport?: Partial<Viewport>
  /** controlled viewport (`v-model:viewport`) — keeps the flow's transform in sync with the bound value */
  viewport?: Viewport
  translateExtent?: CoordinateExtent
  nodeExtent?: CoordinateExtent | CoordinateExtentRange
  /** origin of all nodes relative to their position — `[0, 0]` top-left, `[0.5, 0.5]` center, `[1, 1]` bottom-right */
  nodeOrigin?: NodeOrigin
  /** light/dark/system — applies the resolved `light`/`dark` class to the flow container; `system` follows `prefers-color-scheme` @default 'light' */
  colorMode?: ColorMode
  defaultMarkerColor?: string
  zoomOnScroll?: boolean
  zoomOnPinch?: boolean
  panOnScroll?: boolean
  panOnScrollSpeed?: number
  panOnScrollMode?: PanOnScrollMode
  /**
   * Distance that the mouse can move between mousedown/up that will trigger a click
   * @default 0
   */
  paneClickDistance?: number
  /**
   * Distance that the mouse can move between mousedown/up on a node that will trigger a click
   * @default 0
   */
  nodeClickDistance?: number
  zoomOnDoubleClick?: boolean
  /** If set to false, scrolling inside the viewport will be disabled and instead the page scroll will be used */
  preventScrolling?: boolean
  selectionMode?: SelectionMode
  reconnectRadius?: number
  /** fit the view to the nodes once they're measured on init (xyflow/react's `fitView` prop) */
  fitView?: boolean
  /** options for the initial `fitView` (padding, includeHiddenNodes, etc.) */
  fitViewOptions?: FitViewParams
  /** allow connection with click handlers, i.e. support touch devices */
  connectOnClick?: boolean
  /**
   * apply default change handlers for position, dimensions, adding/removing nodes. set this to false if you want to apply the changes manually
   */
  applyDefault?: boolean
  /**
   * automatically create an edge when connection is triggered
   */
  autoConnect?: boolean | Connector
  noDragClassName?: string
  noWheelClassName?: string
  noPanClassName?: string
  /** does not work for the `addEdge` utility! */
  defaultEdgeOptions?: DefaultEdgeOptions
  /** elevates edges when selected and applies z-Index to put them above their nodes */
  elevateEdgesOnSelect?: boolean
  /** elevates nodes when selected and applies z-Index + 1000 */
  elevateNodesOnSelect?: boolean

  disableKeyboardA11y?: boolean
  edgesFocusable?: boolean
  nodesFocusable?: boolean

  autoPanOnConnect?: boolean
  autoPanOnNodeDrag?: boolean
  autoPanSpeed?: number
}

export interface FlowEmits<NodeType extends Node = Node, EdgeType extends Edge = Edge> {
  (event: 'nodesChange', changes: NodeChange<NodeType>[]): void
  (event: 'edgesChange', changes: EdgeChange<EdgeType>[]): void
  (event: 'nodesInitialized', nodes: NodeType[]): void
  (event: 'miniMapNodeClick', nodeMouseEvent: NodeMouseEvent<NodeType>): void
  (event: 'miniMapNodeDoubleClick', nodeMouseEvent: NodeMouseEvent<NodeType>): void
  (event: 'miniMapNodeMouseEnter', nodeMouseEvent: NodeMouseEvent<NodeType>): void
  (event: 'miniMapNodeMouseMove', nodeMouseEvent: NodeMouseEvent<NodeType>): void
  (event: 'miniMapNodeMouseLeave', nodeMouseEvent: NodeMouseEvent<NodeType>): void
  (event: 'connect', connectionEvent: Connection): void
  (
    event: 'connectStart',
    connectionEvent: {
      event?: MouseEvent
    } & OnConnectStartParams,
  ): void
  (event: 'connectEnd', connectionEvent?: MouseEvent): void
  (
    event: 'clickConnectStart',
    connectionEvent: {
      event?: MouseEvent
    } & OnConnectStartParams,
  ): void
  (event: 'clickConnectEnd', connectionEvent?: MouseEvent): void
  (event: 'moveStart', moveEvent: { event: MouseTouchEvent | null; viewport: Viewport }): void
  (event: 'move', moveEvent: { event: MouseTouchEvent | null; viewport: Viewport }): void
  (event: 'moveEnd', moveEvent: { event: MouseTouchEvent | null; viewport: Viewport }): void
  (event: 'selectionDragStart', selectionEvent: NodeDragEvent<NodeType>): void
  (event: 'selectionDrag', selectionEvent: NodeDragEvent<NodeType>): void
  (event: 'selectionDragStop', selectionEvent: NodeDragEvent<NodeType>): void
  (event: 'selectionContextMenu', selectionEvent: { event: MouseEvent; nodes: NodeType[] }): void
  (event: 'selectionStart', selectionEvent: MouseEvent): void
  (event: 'selectionEnd', selectionEvent: MouseEvent): void
  (event: 'viewportChangeStart', viewport: Viewport): void
  (event: 'viewportChange', viewport: Viewport): void
  (event: 'viewportChangeEnd', viewport: Viewport): void
  (event: 'init', paneEvent: VueFlowInstance<NodeType, EdgeType>): void
  (event: 'paneScroll', paneEvent: WheelEvent | undefined): void
  (event: 'paneClick', paneEvent: MouseEvent): void
  (event: 'paneContextMenu', paneEvent: MouseEvent): void
  (event: 'paneMouseEnter', paneEvent: MouseEvent): void
  (event: 'paneMouseMove', paneEvent: MouseEvent): void
  (event: 'paneMouseLeave', paneEvent: MouseEvent): void
  (event: 'updateNodeInternals'): void
  (event: 'error', error: VueFlowError): void

  (event: 'edgeContextMenu', edgeMouseEvent: EdgeMouseEvent<EdgeType>): void
  (event: 'edgeMouseEnter', edgeMouseEvent: EdgeMouseEvent<EdgeType>): void
  (event: 'edgeMouseMove', edgeMouseEvent: EdgeMouseEvent<EdgeType>): void
  (event: 'edgeMouseLeave', edgeMouseEvent: EdgeMouseEvent<EdgeType>): void
  (event: 'edgeDoubleClick', edgeMouseEvent: EdgeMouseEvent<EdgeType>): void
  (event: 'edgeClick', edgeMouseEvent: EdgeMouseEvent<EdgeType>): void
  (event: 'reconnectStart', edgeMouseEvent: EdgeMouseEvent<EdgeType>): void
  (event: 'reconnect', reconnectEvent: EdgeReconnectEvent<EdgeType>): void
  (event: 'reconnectEnd', edgeMouseEvent: EdgeMouseEvent<EdgeType>): void

  (event: 'nodeDoubleClick', nodeMouseEvent: NodeMouseEvent<NodeType>): void
  (event: 'nodeClick', nodeMouseEvent: NodeMouseEvent<NodeType>): void
  (event: 'nodeMouseEnter', nodeMouseEvent: NodeMouseEvent<NodeType>): void
  (event: 'nodeMouseMove', nodeMouseEvent: NodeMouseEvent<NodeType>): void
  (event: 'nodeMouseLeave', nodeMouseEvent: NodeMouseEvent<NodeType>): void
  (event: 'nodeContextMenu', nodeMouseEvent: NodeMouseEvent<NodeType>): void
  (event: 'nodeDragStart', nodeDragEvent: NodeDragEvent<NodeType>): void
  (event: 'nodeDrag', nodeDragEvent: NodeDragEvent<NodeType>): void
  (event: 'nodeDragStop', nodeDragEvent: NodeDragEvent<NodeType>): void

  /** v-model event definitions */
  (event: 'update:nodes', value: NodeType[]): void
  (event: 'update:edges', value: EdgeType[]): void
  (event: 'update:viewport', value: Viewport): void
}

// Slots are optional (a flow needn't define every node-/edge-type slot), so use `Partial<Record<…>>`
// rather than a bare `Record`. Beyond correctness, a required index signature makes `<VueFlow>`
// unassignable to Vue's `Component` (whose `InternalSlots` are optional), which breaks Options-API
// `components: { VueFlow }` registration.
export type NodeSlots<NodeType extends Node = Node> = Partial<
  Record<`node-${NodeType['type'] | string}`, (nodeProps: NodeProps<NodeType>) => any>
>

export type EdgeSlots<EdgeType extends Edge = Edge> = Partial<
  Record<`edge-${NonNullable<EdgeType['type']> | string}`, (edgeProps: EdgeProps<EdgeType>) => any>
>

export type FlowSlots<NodeType extends Node = Node, EdgeType extends Edge = Edge> = NodeSlots<NodeType> &
  EdgeSlots<EdgeType> & {
    'connection-line'?: (connectionLineProps: ConnectionLineProps) => any
    'zoom-pane'?: () => any
    'default'?: () => any
  }
