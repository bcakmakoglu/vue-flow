import { Selection as D3Selection, ZoomBehavior } from 'd3';
import { Component, HTMLAttributes, PropType, VNode } from 'vue-demi';

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
  __rf?: any;
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

export type NodeTypesType = { [key: string]: Component };

export type EdgeTypesType = NodeTypesType;

export interface SelectionRect extends Rect {
  startX: number;
  startY: number;
  draw: boolean;
}

export interface WrapEdgeProps<T = any> {
  id: ElementId;
  className?: string;
  type: string;
  data?: T;
  onClick?: (event: MouseEvent, edge: Edge) => void;
  onEdgeDoubleClick?: (event: MouseEvent, edge: Edge) => void;
  selected: boolean;
  animated?: boolean;
  label?: string | VNode;
  labelStyle?: any;
  labelShowBg?: boolean;
  labelBgStyle?: any;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  style?: any;
  arrowHeadType?: ArrowHeadType;
  source: ElementId;
  target: ElementId;
  sourceHandleId: ElementId | null;
  targetHandleId: ElementId | null;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
  elementsSelectable?: boolean;
  markerEndId?: string;
  isHidden?: boolean;
  handleEdgeUpdate: boolean;
  onConnectEdge: OnConnectFunc;
  onContextMenu?: (event: MouseEvent, edge: Edge) => void;
  onMouseEnter?: (event: MouseEvent, edge: Edge) => void;
  onMouseMove?: (event: MouseEvent, edge: Edge) => void;
  onMouseLeave?: (event: MouseEvent, edge: Edge) => void;
  edgeUpdaterRadius?: number;
  onEdgeUpdateStart?: (event: MouseEvent, edge: Edge) => void;
  onEdgeUpdateEnd?: (event: MouseEvent, edge: Edge) => void;
}

export const WrapEdgeProps = {
  id: {
    type: String as PropType<WrapEdgeProps['id']>,
    required: false,
    default: undefined
  },
  type: {
    type: String as PropType<WrapEdgeProps['type']>,
    required: true
  },
  data: {
    type: String as PropType<WrapEdgeProps['data']>,
    required: false,
    default: undefined
  },
  onClick: {
    type: Function('event', 'edge') as PropType<WrapEdgeProps['onClick']>,
    required: false,
    default: undefined
  },
  onEdgeDoubleClick: {
    type: Function('event', 'edge') as PropType<WrapEdgeProps['onEdgeDoubleClick']>,
    required: false,
    default: undefined
  },
  selected: {
    type: Boolean as PropType<WrapEdgeProps['selected']>,
    required: true,
    default: false
  },
  animated: {
    type: Boolean as PropType<WrapEdgeProps['animated']>,
    required: false,
    default: false
  },
  label: {
    type: Object as PropType<WrapEdgeProps['label']>,
    required: false,
    default: undefined
  },
  labelStyle: {
    type: Object as PropType<WrapEdgeProps['labelStyle']>,
    required: false,
    default: undefined
  },
  labelShowBg: {
    type: Boolean as PropType<WrapEdgeProps['labelShowBg']>,
    required: false,
    default: false
  },
  labelBgStyle: {
    type: Object as PropType<WrapEdgeProps['labelBgStyle']>,
    required: false,
    default: undefined
  },
  labelBgPadding: {
    type: Array as unknown as PropType<WrapEdgeProps['labelBgPadding']>,
    required: false,
    default: undefined
  },
  labelBgBorderRadius: {
    type: Number as PropType<WrapEdgeProps['labelBgBorderRadius']>,
    required: false,
    default: undefined
  },
  style: {
    type: Object as PropType<WrapEdgeProps['style']>,
    required: false,
    default: undefined
  },
  arrowHeadType: {
    type: String as PropType<WrapEdgeProps['arrowHeadType']>,
    required: false,
    default: undefined
  },
  source: {
    type: String as PropType<WrapEdgeProps['source']>,
    required: true
  },
  target: {
    type: String as PropType<WrapEdgeProps['target']>,
    required: true
  },
  sourceHandleId: {
    type: String as PropType<WrapEdgeProps['sourceHandleId']>,
    required: true,
    default: null
  },
  targetHandleId: {
    type: String as PropType<WrapEdgeProps['targetHandleId']>,
    required: true,
    default: null
  },
  sourceX: {
    type: Number as PropType<WrapEdgeProps['sourceX']>,
    required: true
  },
  sourceY: {
    type: Number as PropType<WrapEdgeProps['sourceY']>,
    required: true
  },
  targetX: {
    type: Number as PropType<WrapEdgeProps['targetX']>,
    required: true
  },
  targetY: {
    type: Number as PropType<WrapEdgeProps['targetY']>,
    required: true
  },
  sourcePosition: {
    type: String as PropType<WrapEdgeProps['sourcePosition']>,
    required: true
  },
  targetPosition: {
    type: String as PropType<WrapEdgeProps['targetPosition']>,
    required: true
  },
  elementsSelectable: {
    type: Boolean as PropType<WrapEdgeProps['elementsSelectable']>,
    required: false,
    default: false
  },
  markerEndId: {
    type: String as PropType<WrapEdgeProps['markerEndId']>,
    required: false,
    default: undefined
  },
  isHidden: {
    type: Boolean as PropType<WrapEdgeProps['isHidden']>,
    required: false,
    default: false
  },
  handleEdgeUpdate: {
    type: Boolean as PropType<WrapEdgeProps['handleEdgeUpdate']>,
    required: false,
    default: false
  },
  onConnectEdge: {
    type: Function() as PropType<WrapEdgeProps['onConnectEdge']>,
    required: false,
    default: undefined
  },
  onContextMenu: {
    type: Function() as PropType<WrapEdgeProps['onContextMenu']>,
    required: false,
    default: undefined
  },
  onMouseEnter: {
    type: Function() as PropType<WrapEdgeProps['onMouseEnter']>,
    required: false,
    default: undefined
  },
  onMouseMove: {
    type: Function() as PropType<WrapEdgeProps['onMouseMove']>,
    required: false,
    default: undefined
  },
  onMouseLeave: {
    type: Function() as PropType<WrapEdgeProps['onMouseLeave']>,
    required: false,
    default: undefined
  },
  edgeUpdaterRadius: {
    type: Number as PropType<WrapEdgeProps['edgeUpdaterRadius']>,
    required: false,
    default: undefined
  },
  onEdgeUpdateStart: {
    type: Function() as PropType<WrapEdgeProps['onEdgeUpdateStart']>,
    required: false,
    default: undefined
  },
  onEdgeUpdateEnd: {
    type: Function() as PropType<WrapEdgeProps['onEdgeUpdateEnd']>,
    required: false,
    default: undefined
  }
};

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

export const EdgeProps = {
  id: {
    type: String as PropType<EdgeSmoothStepProps['id']>,
    required: true
  },
  sourceX: {
    type: Number as PropType<EdgeSmoothStepProps['sourceX']>,
    required: true,
    default: 0
  },
  sourceY: {
    type: Number as PropType<EdgeSmoothStepProps['sourceY']>,
    required: true,
    default: 0
  },
  targetX: {
    type: Number as PropType<EdgeSmoothStepProps['targetX']>,
    required: true,
    default: 0
  },
  targetY: {
    type: Number as PropType<EdgeSmoothStepProps['targetY']>,
    required: true,
    default: 0
  },
  sourcePosition: {
    type: String as PropType<EdgeSmoothStepProps['sourcePosition']>,
    required: true,
    default: Position.Bottom
  },
  targetPosition: {
    type: String as PropType<EdgeSmoothStepProps['targetPosition']>,
    required: true,
    default: Position.Top
  },
  label: {
    type: String as PropType<EdgeSmoothStepProps['label']>,
    required: false,
    default: undefined
  },
  labelStyle: {
    type: Object as PropType<EdgeSmoothStepProps['labelStyle']>,
    required: true,
    default: undefined
  },
  labelShowBg: {
    type: Boolean as PropType<EdgeSmoothStepProps['labelShowBg']>,
    required: false,
    default: false
  },
  labelBgStyle: {
    type: String as PropType<EdgeSmoothStepProps['labelBgStyle']>,
    required: false,
    default: undefined
  },
  labelBgPadding: {
    type: [0, 0] as any as PropType<[number, number]>,
    required: false,
    default: undefined
  },
  labelBgBorderRadius: {
    type: Number as PropType<EdgeSmoothStepProps['labelBgBorderRadius']>,
    required: false,
    default: undefined
  },
  arrowHeadType: {
    type: Object as PropType<EdgeSmoothStepProps['arrowHeadType']>,
    required: false,
    default: undefined
  },
  markerEndId: {
    type: String as PropType<EdgeSmoothStepProps['markerEndId']>,
    required: false,
    default: undefined
  },
  style: {
    type: Object as PropType<EdgeSmoothStepProps['style']>,
    required: false,
    default: undefined
  },
  data: {
    type: Object as PropType<EdgeSmoothStepProps['data']>,
    required: false,
    default: undefined
  },
  sourceHandleId: {
    type: Object as PropType<EdgeSmoothStepProps['sourceHandleId']>,
    required: false,
    default: undefined
  },
  targetHandleId: {
    type: Object as PropType<EdgeSmoothStepProps['targetHandleId']>,
    required: false,
    default: undefined
  }
};

export const EdgeSmoothStepProps = {
  ...EdgeProps,
  borderRadius: {
    type: Number as PropType<EdgeSmoothStepProps['borderRadius']>,
    required: false,
    default: 5
  }
};

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

export interface NodeComponentProps<T = any> {
  id: ElementId;
  type: string;
  data: T;
  selected?: boolean;
  isConnectable: boolean;
  transform?: Transform;
  xPos?: number;
  yPos?: number;
  targetPosition?: Position;
  sourcePosition?: Position;
  onClick?: (node: Node) => void;
  onNodeDoubleClick?: (node: Node) => void;
  onMouseEnter?: (node: Node) => void;
  onMouseMove?: (node: Node) => void;
  onMouseLeave?: (node: Node) => void;
  onContextMenu?: (node: Node) => void;
  onNodeDragStart?: (node: Node) => void;
  onNodeDrag?: (node: Node) => void;
  onNodeDragStop?: (node: Node) => void;
  style?: any;
  isDragging?: boolean;
}

export const WrapNodeProps = {
  id: {
    type: String as PropType<WrapNodeProps['id']>,
    required: true
  },
  type: {
    type: String as PropType<WrapNodeProps['type']>,
    required: true
  },
  data: {
    type: Object as PropType<WrapNodeProps['data']>,
    required: false,
    default: undefined as any
  },
  selected: {
    type: Boolean as PropType<WrapNodeProps['selected']>,
    required: false,
    default: false
  },
  scale: {
    type: Number as PropType<WrapNodeProps['scale']>,
    required: false,
    default: undefined
  },
  xPos: {
    type: Number as PropType<WrapNodeProps['xPos']>,
    required: false,
    default: undefined
  },
  yPos: {
    type: Number as PropType<WrapNodeProps['yPos']>,
    required: false,
    default: undefined
  },
  isSelectable: {
    type: Boolean as PropType<WrapNodeProps['isSelectable']>,
    required: false,
    default: undefined
  },
  isDraggable: {
    type: Boolean as PropType<WrapNodeProps['isDraggable']>,
    required: false,
    default: undefined
  },
  isConnectable: {
    type: Boolean as PropType<WrapNodeProps['isConnectable']>,
    required: false,
    default: undefined
  },
  selectNodesOnDrag: {
    type: Boolean as PropType<WrapNodeProps['selectNodesOnDrag']>,
    required: false,
    default: undefined
  },
  onClick: {
    type: Function() as PropType<WrapNodeProps['onClick']>,
    required: false,
    default: undefined
  },
  onNodeDoubleClick: {
    type: Function() as PropType<WrapNodeProps['onNodeDoubleClick']>,
    required: false,
    default: undefined
  },
  onMouseEnter: {
    type: Function() as PropType<WrapNodeProps['onMouseEnter']>,
    required: false,
    default: undefined
  },
  onMouseMove: {
    type: Function() as PropType<WrapNodeProps['onMouseMove']>,
    required: false,
    default: undefined
  },
  onMouseLeave: {
    type: Function() as PropType<WrapNodeProps['onMouseLeave']>,
    required: false,
    default: undefined
  },
  onContextMenu: {
    type: Function() as PropType<WrapNodeProps['onContextMenu']>,
    required: false,
    default: undefined
  },
  onNodeDragStart: {
    type: Function() as PropType<WrapNodeProps['onNodeDragStart']>,
    required: false,
    default: undefined
  },
  onNodeDrag: {
    type: Function() as PropType<WrapNodeProps['onNodeDrag']>,
    required: false,
    default: undefined
  },
  onNodeDragStop: {
    type: Function() as PropType<WrapNodeProps['onNodeDragStop']>,
    required: false,
    default: undefined
  },
  style: {
    type: Object as PropType<WrapNodeProps['style']>,
    required: false,
    default: undefined as any
  },
  sourcePosition: {
    type: String as PropType<WrapNodeProps['sourcePosition']>,
    required: false,
    default: undefined
  },
  targetPosition: {
    type: String as PropType<WrapNodeProps['targetPosition']>,
    required: false,
    default: undefined
  },
  isHidden: {
    type: Boolean as PropType<WrapNodeProps['isHidden']>,
    required: false,
    default: undefined
  },
  isInitialized: {
    type: Boolean as PropType<WrapNodeProps['isInitialized']>,
    required: false,
    default: undefined
  },
  snapToGrid: {
    type: Boolean as PropType<WrapNodeProps['snapToGrid']>,
    required: false,
    default: undefined
  },
  snapGrid: {
    type: Object as PropType<WrapNodeProps['snapGrid']>,
    required: false,
    default: undefined
  },
  isDragging: {
    type: Boolean as PropType<WrapNodeProps['isDragging']>,
    required: false,
    default: undefined
  },
  resizeObserver: {
    type: Object as PropType<WrapNodeProps['resizeObserver']>,
    required: false,
    default: undefined
  }
};

export interface WrapNodeProps<T = any> {
  id: ElementId;
  type: string;
  data: T;
  selected: boolean;
  scale: number;
  xPos: number;
  yPos: number;
  isSelectable: boolean;
  isDraggable: boolean;
  isConnectable: boolean;
  selectNodesOnDrag: boolean;
  onClick?: (event: MouseEvent, node: Node) => void;
  onNodeDoubleClick?: (event: MouseEvent, node: Node) => void;
  onMouseEnter?: (event: MouseEvent, node: Node) => void;
  onMouseMove?: (event: MouseEvent, node: Node) => void;
  onMouseLeave?: (event: MouseEvent, node: Node) => void;
  onContextMenu?: (event: MouseEvent, node: Node) => void;
  onNodeDragStart?: (event: MouseEvent, node: Node) => void;
  onNodeDrag?: (event: MouseEvent, node: Node) => void;
  onNodeDragStop?: (event: MouseEvent, node: Node) => void;
  style?: any;
  className?: string;
  sourcePosition?: Position;
  targetPosition?: Position;
  isHidden?: boolean;
  isInitialized?: boolean;
  snapToGrid?: boolean;
  snapGrid?: SnapGrid;
  isDragging?: boolean;
  resizeObserver: ResizeObserver | null;
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

export type ConnectionLineComponent = Component<ConnectionLineComponentProps>;

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
  initialized: boolean;
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

export interface ReactFlowState {
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

  reactFlowVersion: string;

  onConnect?: OnConnectFunc;
  onConnectStart?: OnConnectStartFunc;
  onConnectStop?: OnConnectStopFunc;
  onConnectEnd?: OnConnectEndFunc;
}

export type RevueFlowActionsTree = {
  setOnConnect: (onConnect: OnConnectFunc) => void;
  setOnConnectStart: (onConnectStart: OnConnectStartFunc) => void;
  setOnConnectStop: (onConnectStop: OnConnectStopFunc) => void;
  setOnConnectEnd: (onConnectEnd: OnConnectEndFunc) => void;
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
  updateTransform: (transform: Transform) => void;
  updateSize: (size: Dimensions) => void;
  setConnectionPosition: (connectionPosition: XYPosition) => void;
  setConnectionNodeId: (payload: SetConnectionId) => void;
  setSnapToGrid: (snapToGrid: boolean) => void;
  setSnapGrid: (snapGrid: SnapGrid) => void;
  setInteractive: (isInteractive: boolean) => void;
  setNodesDraggable: (nodesDraggable: boolean) => void;
  setNodesConnectable: (nodesConnectable: boolean) => void;
  setElementsSelectable: (elementsSelectable: boolean) => void;
  setMultiSelectionActive: (multiSelectionActive: boolean) => void;
  setConnectionMode: (connectionMode: ConnectionMode) => void;
};

export type UpdateNodeInternals = (nodeId: ElementId) => void;
