import { Selection as D3Selection, ZoomBehavior } from 'd3';
import { CSSProperties, DefineComponent, HTMLAttributes, VNode } from 'vue';
import { Store } from 'pinia';

export type ElementId = string;

export type FlowElement<T = any> = Node<T> | Edge<T>;

export type Elements<T = any> = Array<FlowElement<T>>;

export type Transform = [number, number, number];

export enum Position {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom'
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

export interface Box extends XYPosition {
  x2: number;
  y2: number;
}

export type SnapGrid = [number, number];

export interface Node<T = any> {
  id: ElementId;
  position: XYPosition;
  type?: string;
  __rf: {
    position: XYPosition;
    isDragging?: boolean;
    width: number | null;
    height: number | null;
    handleBounds?: any;
  };
  data?: T;
  style?: any;
  className?: string;
  targetPosition?: Position;
  sourcePosition?: Position;
  isHidden?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
}

export enum ArrowHeadType {
  Arrow = 'arrow',
  ArrowClosed = 'arrowclosed'
}

export interface Edge<T = any> {
  id: ElementId;
  type?: string;
  source: ElementId;
  target: ElementId;
  sourceHandle?: ElementId | null;
  targetHandle?: ElementId | null;
  label?: string | VNode;
  labelStyle?: any;
  labelShowBg?: boolean;
  labelBgStyle?: any;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  style?: any;
  animated?: boolean;
  arrowHeadType?: ArrowHeadType;
  isHidden?: boolean;
  data?: T;
  className?: string;
}

export enum BackgroundVariant {
  Lines = 'lines',
  Dots = 'dots'
}

export type HandleType = 'source' | 'target';

export type NodeType = DefineComponent<NodeProps>;

export type EdgeType = DefineComponent<EdgeSmoothStepProps>;

export interface SelectionRect extends Rect {
  startX: number;
  startY: number;
  draw: boolean;
}

export interface EdgeProps<T = any> {
  id: ElementId;
  source: ElementId;
  target: ElementId;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  selected?: boolean;
  animated?: boolean;
  sourcePosition: Position;
  targetPosition: Position;
  label?: string | VNode;
  labelStyle?: any;
  labelShowBg?: boolean;
  labelBgStyle?: any;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  style?: any;
  arrowHeadType?: ArrowHeadType;
  markerEndId?: string;
  data?: T;
  sourceHandleId?: ElementId | null;
  targetHandleId?: ElementId | null;
}

export interface EdgeSmoothStepProps<T = any> extends EdgeProps<T> {
  borderRadius?: number;
}

export interface EdgeTextProps extends HTMLAttributes {
  x: number;
  y: number;
  label?: string | VNode;
  labelStyle?: any;
  labelShowBg?: boolean;
  labelBgStyle?: any;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
}

export interface NodeProps<T = any> {
  id: ElementId;
  type: string;
  data: T;
  selected: boolean;
  isConnectable: boolean;
  xPos?: number;
  yPos?: number;
  targetPosition?: Position;
  sourcePosition?: Position;
  isDragging?: boolean;
}

export type FitViewParams = {
  padding?: number;
  includeHiddenNodes?: boolean;
  minZoom?: number;
  maxZoom?: number;
};

export type FlowExportObject<T = any> = {
  elements: Elements<T>;
  position: [number, number];
  zoom: number;
};

export type FitViewFunc = (fitViewOptions?: FitViewParams) => void;
export type ProjectFunc = (position: XYPosition) => XYPosition;
export type ToObjectFunc<T = any> = () => FlowExportObject<T>;

export type OnLoadParams<T = any> = {
  zoomIn: () => void;
  zoomOut: () => void;
  zoomTo: (zoomLevel: number) => void;
  fitView: FitViewFunc;
  project: ProjectFunc;
  getElements: () => Elements<T>;
  setTransform: (transform: FlowTransform) => void;
  toObject: ToObjectFunc<T>;
};

export type OnLoadFunc<T = any> = (params: OnLoadParams<T>) => void;

export interface Connection {
  source: ElementId | null;
  target: ElementId | null;
  sourceHandle: ElementId | null;
  targetHandle: ElementId | null;
}

export enum ConnectionMode {
  Strict = 'strict',
  Loose = 'loose'
}

export enum ConnectionLineType {
  Bezier = 'default',
  Straight = 'straight',
  Step = 'step',
  SmoothStep = 'smoothstep'
}

export type ConnectionLineComponentProps = {
  sourceX: number;
  sourceY: number;
  sourcePosition?: Position;
  targetX: number;
  targetY: number;
  targetPosition?: Position;
  connectionLineStyle?: any;
  connectionLineType: ConnectionLineType;
};

export type ConnectionLineComponent = DefineComponent<ConnectionLineComponentProps>;

export type OnConnectFunc = (connection: Connection) => void;
export type OnConnectStartParams = {
  nodeId: ElementId | null;
  handleId: ElementId | null;
  handleType: HandleType | null;
};
export type OnConnectStartFunc = (event: MouseEvent, params: OnConnectStartParams) => void;
export type OnConnectStopFunc = (event: MouseEvent) => void;
export type OnConnectEndFunc = (event: MouseEvent) => void;

export type SetConnectionId = {
  connectionNodeId: ElementId | null;
  connectionHandleId: ElementId | null;
  connectionHandleType: HandleType | null;
};

export interface HandleElement extends XYPosition, Dimensions {
  id?: ElementId | null;
  position: Position;
}

export interface HandleProps {
  type: HandleType;
  position: Position;
  isConnectable?: boolean;
  onConnect?: OnConnectFunc;
  isValidConnection?: (connection: Connection) => boolean;
  id?: ElementId;
}

export type NodePosUpdate = {
  id: ElementId;
  pos: XYPosition;
};

export type NodeDiffUpdate = {
  id?: ElementId;
  diff?: XYPosition;
  isDragging?: boolean;
};

export type FlowTransform = {
  x: number;
  y: number;
  zoom: number;
};

export type TranslateExtent = [[number, number], [number, number]];
export type NodeExtent = TranslateExtent;

export type KeyCode = number | string;

export enum PanOnScrollMode {
  Free = 'free',
  Vertical = 'vertical',
  Horizontal = 'horizontal'
}

export interface ZoomPanHelperFunctions {
  zoomIn: () => void;
  zoomOut: () => void;
  zoomTo: (zoomLevel: number) => void;
  transform: (transform: FlowTransform) => void;
  fitView: FitViewFunc;
  setCenter: (x: number, y: number, zoom?: number) => void;
  fitBounds: (bounds: Rect, padding?: number) => void;
  project: (position: XYPosition) => XYPosition;
}

export type OnEdgeUpdateFunc<T = any> = (oldEdge: Edge<T>, newConnection: Connection) => void;

export type NodeDimensionUpdate = {
  id: ElementId;
  nodeElement: HTMLDivElement;
  forceUpdate?: boolean;
};

export type InitD3ZoomPayload = {
  d3Zoom: ZoomBehavior<Element, unknown>;
  d3Selection: D3Selection<Element, unknown, null, undefined>;
  d3ZoomHandler: ((this: Element, event: any, d: unknown) => void) | undefined;
  transform: Transform;
};

export interface RevueFlowState {
  width: number;
  height: number;
  transform: Transform;
  nodes: Node[];
  edges: Edge[];
  selectedElements: Elements | null;
  selectedNodesBbox: Rect;

  d3Zoom: ZoomBehavior<Element, unknown> | null;
  d3Selection: D3Selection<Element, unknown, null, undefined> | null;
  d3ZoomHandler: ((this: Element, event: any, d: unknown) => void) | undefined;
  minZoom: number;
  maxZoom: number;
  translateExtent: TranslateExtent;
  nodeExtent: NodeExtent;

  nodesSelectionActive: boolean;
  selectionActive: boolean;

  userSelectionRect: SelectionRect;

  connectionNodeId: ElementId | null;
  connectionHandleId: ElementId | null;
  connectionHandleType: HandleType | null;
  connectionPosition: XYPosition;
  connectionMode: ConnectionMode;

  snapToGrid: boolean;
  snapGrid: SnapGrid;

  nodesDraggable: boolean;
  nodesConnectable: boolean;
  elementsSelectable: boolean;

  multiSelectionActive: boolean;

  revueFlowVersion: string;

  onConnect?: OnConnectFunc;
  onConnectStart?: OnConnectStartFunc;
  onConnectStop?: OnConnectStopFunc;
  onConnectEnd?: OnConnectEndFunc;
}

export type RevueFlowActions = {
  setElements: (elements: Elements) => void;
  updateNodeDimensions: (updates: NodeDimensionUpdate[]) => void;
  updateNodePos: (payload: NodePosUpdate) => void;
  updateNodePosDiff: (payload: NodeDiffUpdate) => void;
  setUserSelection: (mousePos: XYPosition) => void;
  updateUserSelection: (mousePos: XYPosition) => void;
  unsetUserSelection: () => void;
  addSelectedElements: (elements: Elements) => void;
  initD3Zoom: (payload: InitD3ZoomPayload) => void;
  setMinZoom: (zoom: number) => void;
  setMaxZoom: (zoom: number) => void;
  setTranslateExtent: (translateExtent: TranslateExtent) => void;
  setNodeExtent: (nodeExtent: NodeExtent) => void;
  resetSelectedElements: () => void;
  unsetNodesSelection: () => void;
  updateSize: (size: Dimensions) => void;
  setConnectionNodeId: (payload: SetConnectionId) => void;
  setInteractive: (isInteractive: boolean) => void;
};

export type RevueFlowStore = Store<string, RevueFlowState, any, RevueFlowActions>;

export type UpdateNodeInternals = (nodeId: ElementId) => void;

export interface RevueFlowProps extends Omit<HTMLAttributes, 'onLoad'> {
  modelValue: Elements;
  nodeTypes?: Record<string, NodeType>;
  edgeTypes?: Record<string, EdgeType>;
  connectionMode?: ConnectionMode;
  connectionLineType?: ConnectionLineType;
  connectionLineStyle?: CSSProperties;
  connectionLineComponent?: ConnectionLineComponent;
  deleteKeyCode?: KeyCode;
  selectionKeyCode?: KeyCode;
  multiSelectionKeyCode?: KeyCode;
  zoomActivationKeyCode?: KeyCode;
  snapToGrid?: boolean;
  snapGrid?: [number, number];
  onlyRenderVisibleElements?: boolean;
  nodesDraggable?: boolean;
  nodesConnectable?: boolean;
  elementsSelectable?: boolean;
  selectNodesOnDrag?: boolean;
  paneMoveable?: boolean;
  minZoom?: number;
  maxZoom?: number;
  defaultZoom?: number;
  defaultPosition?: [number, number];
  translateExtent?: TranslateExtent;
  nodeExtent?: NodeExtent;
  arrowHeadColor?: string;
  markerEndId?: string;
  zoomOnScroll?: boolean;
  zoomOnPinch?: boolean;
  panOnScroll?: boolean;
  panOnScrollSpeed?: number;
  panOnScrollMode?: PanOnScrollMode;
  zoomOnDoubleClick?: boolean;
  edgeUpdaterRadius?: number;
  nodeTypesId?: string;
  edgeTypesId?: string;
}

export interface GraphViewProps extends Required<RevueFlowProps> {
  selectionKeyCode: KeyCode;
  deleteKeyCode: KeyCode;
  multiSelectionKeyCode: KeyCode;
  connectionLineType: ConnectionLineType;
  snapToGrid: boolean;
  snapGrid: [number, number];
  onlyRenderVisibleElements: boolean;
  defaultZoom: number;
  defaultPosition: [number, number];
  arrowHeadColor: string;
  selectNodesOnDrag: boolean;
}
