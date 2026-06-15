import type { KeyFilter } from '@vueuse/core';
import type { ColorMode, PanOnScrollMode, Viewport } from '@xyflow/system';
import type { CSSProperties } from 'vue';
import type { VueFlowError } from '../utils';
import type { EdgeChange, NodeChange } from './changes';
import type { EdgeTypesObject, NodeTypesObject } from './components';
import type {
  Connection,
  ConnectionLineOptions,
  ConnectionLineProps,
  ConnectionMode,
  Connector,
  OnConnectStartParams,
} from './connection';
import type { DefaultEdgeOptions, Edge, EdgeProps, EdgeReconnectable } from './edge';
import type { ValidConnectionFunc } from './handle';
import type { EdgeMouseEvent, EdgeReconnectEvent, MouseTouchEvent, NodeDragEvent, NodeMouseEvent } from './hooks';
import type { CoordinateExtent, CoordinateExtentRange, Node, NodeOrigin, NodeProps } from './node';
import type { VueFlowInstance } from './store';
import type { FitViewParams } from './zoom';

/**
 * Consulted before nodes/edges are deleted (via the delete key or `deleteElements`). Receives the full set
 * about to be removed (the targeted nodes/edges plus connected edges and child nodes). Return `false` to
 * cancel, `true` to delete that set, or `{ nodes, edges }` to delete only a subset. Mirrors xyflow/react.
 */
export type OnBeforeDelete<NodeType extends Node = Node, EdgeType extends Edge = Edge> = (params: {
  nodes: NodeType[];
  edges: EdgeType[];
}) => Promise<boolean | { nodes: NodeType[]; edges: EdgeType[] }>;

export interface CustomThemeVars {
  [key: string]: string | number | undefined;
}

export type CSSVars
  = | '--vf-node-color'
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
    | '--vf-minimap-mask';

export type ThemeVars = { [key in CSSVars]?: CSSProperties['color'] };
export type Styles = CSSProperties & ThemeVars & CustomThemeVars;

// Vue does not publicly export ClassValue, so we define it here to match its class binding type
export type ClassValue = string | Record<string, boolean> | ClassValue[];

/** Handle Positions */
export enum Position {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}

export interface XYPosition {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Rect extends Dimensions, XYPosition {}

export type SnapGrid = [x: number, y: number];

export interface SelectionRect extends Rect {
  startX: number;
  startY: number;
}

export enum SelectionMode {
  Partial = 'partial',
  Full = 'full',
}

export interface FlowExportObject {
  /** exported nodes */
  nodes: Node[];
  /** exported edges */
  edges: Edge[];
  /** exported viewport (position + zoom) */
  viewport: Viewport;
}

export type FlowOptions<NodeType extends Node = Node, EdgeType extends Edge = Edge> = FlowProps<NodeType, EdgeType>;

export interface FlowProps<NodeType extends Node = Node, EdgeType extends Edge = Edge> {
  id?: string;
  nodes?: NodeType[];
  edges?: EdgeType[];
  /** either use the edgeTypes prop to define your edge-types or use slots (<template #edge-mySpecialType="props">) */
  edgeTypes?: EdgeTypesObject<EdgeType>;
  /** either use the nodeTypes prop to define your node-types or use slots (<template #node-mySpecialType="props">) */
  nodeTypes?: NodeTypesObject<NodeType>;
  connectionMode?: ConnectionMode;
  connectionLineOptions?: ConnectionLineOptions;
  connectionRadius?: number;
  isValidConnection?: ValidConnectionFunc | null;
  /** consulted before delete-key/`deleteElements` removals — cancel, confirm, or filter the set */
  onBeforeDelete?: OnBeforeDelete<NodeType, EdgeType> | null;
  deleteKeyCode?: KeyFilter | null;
  selectionKeyCode?: KeyFilter | null;
  multiSelectionKeyCode?: KeyFilter | null;
  zoomActivationKeyCode?: KeyFilter | null;
  panActivationKeyCode?: KeyFilter | null;
  snapToGrid?: boolean;
  snapGrid?: SnapGrid;
  onlyRenderVisibleElements?: boolean;
  edgesReconnectable?: EdgeReconnectable;
  nodesDraggable?: boolean;
  nodesConnectable?: boolean;
  nodeDragThreshold?: number;
  elementsSelectable?: boolean;
  selectNodesOnDrag?: boolean;
  /** move pane on drag, replaced prop `paneMovable` */
  panOnDrag?: boolean | number[];
  minZoom?: number;
  maxZoom?: number;
  /** initial viewport for an uncontrolled flow; ignored once the user pans/zooms */
  defaultViewport?: Partial<Viewport>;
  /** controlled viewport (`v-model:viewport`) — keeps the flow's transform in sync with the bound value */
  viewport?: Viewport;
  translateExtent?: CoordinateExtent;
  nodeExtent?: CoordinateExtent | CoordinateExtentRange;
  /** origin of all nodes relative to their position — `[0, 0]` top-left, `[0.5, 0.5]` center, `[1, 1]` bottom-right */
  nodeOrigin?: NodeOrigin;
  /** light/dark/system — applies the resolved `light`/`dark` class to the flow container; `system` follows `prefers-color-scheme` @default 'light' */
  colorMode?: ColorMode;
  defaultMarkerColor?: string;
  zoomOnScroll?: boolean;
  zoomOnPinch?: boolean;
  panOnScroll?: boolean;
  panOnScrollSpeed?: number;
  panOnScrollMode?: PanOnScrollMode;
  /**
   * Distance that the mouse can move between mousedown/up that will trigger a click
   * @default 0
   */
  paneClickDistance?: number;
  /**
   * Distance that the mouse can move between mousedown/up on a node that will trigger a click
   * @default 0
   */
  nodeClickDistance?: number;
  zoomOnDoubleClick?: boolean;
  /** If set to false, scrolling inside the viewport will be disabled and instead the page scroll will be used */
  preventScrolling?: boolean;
  selectionMode?: SelectionMode;
  reconnectRadius?: number;
  /** fit the view to the nodes once they're measured on init (xyflow/react's `fitView` prop) */
  fitView?: boolean;
  /** options for the initial `fitView` (padding, includeHiddenNodes, etc.) */
  fitViewOptions?: FitViewParams;
  /** allow connection with click handlers, i.e. support touch devices */
  connectOnClick?: boolean;
  /**
   * Automatically apply node/edge changes (position, dimensions, add/remove, select) back to `nodes`/`edges`.
   * Set to `false` to handle the `nodes-change` / `edges-change` events and apply the changes yourself.
   */
  autoApplyChanges?: boolean;
  /**
   * automatically create an edge when connection is triggered
   */
  autoConnect?: boolean | Connector;
  noDragClassName?: string;
  noWheelClassName?: string;
  noPanClassName?: string;
  /** does not work for the `addEdge` utility! */
  defaultEdgeOptions?: DefaultEdgeOptions;
  /** elevates edges when selected and applies z-Index to put them above their nodes */
  elevateEdgesOnSelect?: boolean;
  /** elevates nodes when selected and applies z-Index + 1000 */
  elevateNodesOnSelect?: boolean;

  disableKeyboardA11y?: boolean;
  edgesFocusable?: boolean;
  nodesFocusable?: boolean;

  autoPanOnConnect?: boolean;
  autoPanOnNodeDrag?: boolean;
  autoPanSpeed?: number;
}

export interface FlowEmits<NodeType extends Node = Node, EdgeType extends Edge = Edge> {
  nodesChange: [changes: NodeChange<NodeType>[]];
  edgesChange: [changes: EdgeChange<EdgeType>[]];
  nodesInitialized: [nodes: NodeType[]];
  miniMapNodeClick: [nodeMouseEvent: NodeMouseEvent<NodeType>];
  miniMapNodeDoubleClick: [nodeMouseEvent: NodeMouseEvent<NodeType>];
  miniMapNodeMouseEnter: [nodeMouseEvent: NodeMouseEvent<NodeType>];
  miniMapNodeMouseMove: [nodeMouseEvent: NodeMouseEvent<NodeType>];
  miniMapNodeMouseLeave: [nodeMouseEvent: NodeMouseEvent<NodeType>];
  connect: [connectionEvent: Connection];
  connectStart: [connectionEvent: { event?: MouseEvent } & OnConnectStartParams];
  connectEnd: [connectionEvent?: MouseEvent];
  clickConnectStart: [connectionEvent: { event?: MouseEvent } & OnConnectStartParams];
  clickConnectEnd: [connectionEvent?: MouseEvent];
  moveStart: [moveEvent: { event: MouseTouchEvent | null; viewport: Viewport }];
  move: [moveEvent: { event: MouseTouchEvent | null; viewport: Viewport }];
  moveEnd: [moveEvent: { event: MouseTouchEvent | null; viewport: Viewport }];
  selectionDragStart: [selectionEvent: NodeDragEvent<NodeType>];
  selectionDrag: [selectionEvent: NodeDragEvent<NodeType>];
  selectionDragStop: [selectionEvent: NodeDragEvent<NodeType>];
  selectionContextMenu: [selectionEvent: { event: MouseEvent; nodes: NodeType[] }];
  selectionStart: [selectionEvent: MouseEvent];
  selectionEnd: [selectionEvent: MouseEvent];
  viewportChangeStart: [viewport: Viewport];
  viewportChange: [viewport: Viewport];
  viewportChangeEnd: [viewport: Viewport];
  init: [paneEvent: VueFlowInstance<NodeType, EdgeType>];
  paneScroll: [paneEvent: WheelEvent | undefined];
  paneClick: [paneEvent: MouseEvent];
  paneContextMenu: [paneEvent: MouseEvent];
  paneMouseEnter: [paneEvent: MouseEvent];
  paneMouseMove: [paneEvent: MouseEvent];
  paneMouseLeave: [paneEvent: MouseEvent];
  updateNodeInternals: [];
  error: [error: VueFlowError];

  edgeContextMenu: [edgeMouseEvent: EdgeMouseEvent<EdgeType>];
  edgeMouseEnter: [edgeMouseEvent: EdgeMouseEvent<EdgeType>];
  edgeMouseMove: [edgeMouseEvent: EdgeMouseEvent<EdgeType>];
  edgeMouseLeave: [edgeMouseEvent: EdgeMouseEvent<EdgeType>];
  edgeDoubleClick: [edgeMouseEvent: EdgeMouseEvent<EdgeType>];
  edgeClick: [edgeMouseEvent: EdgeMouseEvent<EdgeType>];
  reconnectStart: [edgeMouseEvent: EdgeMouseEvent<EdgeType>];
  reconnect: [reconnectEvent: EdgeReconnectEvent<EdgeType>];
  reconnectEnd: [edgeMouseEvent: EdgeMouseEvent<EdgeType>];

  nodeDoubleClick: [nodeMouseEvent: NodeMouseEvent<NodeType>];
  nodeClick: [nodeMouseEvent: NodeMouseEvent<NodeType>];
  nodeMouseEnter: [nodeMouseEvent: NodeMouseEvent<NodeType>];
  nodeMouseMove: [nodeMouseEvent: NodeMouseEvent<NodeType>];
  nodeMouseLeave: [nodeMouseEvent: NodeMouseEvent<NodeType>];
  nodeContextMenu: [nodeMouseEvent: NodeMouseEvent<NodeType>];
  nodeDragStart: [nodeDragEvent: NodeDragEvent<NodeType>];
  nodeDrag: [nodeDragEvent: NodeDragEvent<NodeType>];
  nodeDragStop: [nodeDragEvent: NodeDragEvent<NodeType>];

  // `update:nodes` / `update:edges` / `update:viewport` are auto-declared by the `defineModel` calls in <VueFlow>.
}

// Slots are optional (a flow needn't define every node-/edge-type slot), so use `Partial<Record<…>>`
// rather than a bare `Record`. Beyond correctness, a required index signature makes `<VueFlow>`
// unassignable to Vue's `Component` (whose `InternalSlots` are optional), which breaks Options-API
// `components: { VueFlow }` registration.
export type NodeSlots<NodeType extends Node = Node> = Partial<
  Record<`node-${NodeType['type'] | string}`, (nodeProps: NodeProps<NodeType>) => any>
>;

export type EdgeSlots<EdgeType extends Edge = Edge> = Partial<
  Record<`edge-${NonNullable<EdgeType['type']> | string}`, (edgeProps: EdgeProps<EdgeType>) => any>
>;

export type FlowSlots<NodeType extends Node = Node, EdgeType extends Edge = Edge> = NodeSlots<NodeType>
  & EdgeSlots<EdgeType> & {
    'connection-line'?: (connectionLineProps: ConnectionLineProps) => any;
    'zoom-pane'?: () => any;
    'default'?: () => any;
  };
