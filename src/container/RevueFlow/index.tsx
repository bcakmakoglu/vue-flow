import {
  computed,
  CSSProperties,
  defineComponent,
  HTMLAttributes,
  onBeforeUnmount,
  PropType,
  provide,
  reactive,
  watchEffect
} from 'vue';
import GraphView from '../GraphView';
import DefaultNode from '../../components/Nodes/DefaultNode';
import InputNode from '../../components/Nodes/InputNode';
import OutputNode from '../../components/Nodes/OutputNode';
import { createNodeTypes } from '../NodeRenderer/utils';
import { BezierEdge, StepEdge, SmoothStepEdge, StraightEdge } from '../../components/Edges';
import { createEdgeTypes } from '../EdgeRenderer/utils';
import {
  Elements,
  NodeTypesType,
  EdgeTypesType,
  OnLoadFunc,
  Node,
  Edge,
  Connection,
  ConnectionMode,
  ConnectionLineType,
  ConnectionLineComponent,
  FlowTransform,
  OnConnectStartFunc,
  OnConnectStopFunc,
  OnConnectEndFunc,
  TranslateExtent,
  KeyCode,
  PanOnScrollMode,
  OnEdgeUpdateFunc,
  NodeExtent,
  RevueFlowStore
} from '../../types';
import '../../style.css';
import '../../theme-default.css';
import { initialState } from '../../store';
import configureStore from '../../store/configure-store';

const defaultNodeTypes = {
  input: InputNode,
  default: DefaultNode,
  output: OutputNode
};

const defaultEdgeTypes = {
  default: BezierEdge,
  straight: StraightEdge,
  step: StepEdge,
  smoothstep: SmoothStepEdge
};

export interface RevueFlowProps extends Omit<HTMLAttributes, 'onLoad'> {
  elements: Elements;
  onElementClick?: (event: MouseEvent, element: Node | Edge) => void;
  onElementsRemove?: (elements: Elements) => void;
  onNodeDoubleClick?: (event: MouseEvent, node: Node) => void;
  onNodeMouseEnter?: (event: MouseEvent, node: Node) => void;
  onNodeMouseMove?: (event: MouseEvent, node: Node) => void;
  onNodeMouseLeave?: (event: MouseEvent, node: Node) => void;
  onNodeContextMenu?: (event: MouseEvent, node: Node) => void;
  onNodeDragStart?: (event: MouseEvent, node: Node) => void;
  onNodeDrag?: (event: MouseEvent, node: Node) => void;
  onNodeDragStop?: (event: MouseEvent, node: Node) => void;
  onConnect?: (connection: Edge | Connection) => void;
  onConnectStart?: OnConnectStartFunc;
  onConnectStop?: OnConnectStopFunc;
  onConnectEnd?: OnConnectEndFunc;
  onLoad?: OnLoadFunc;
  onMove?: (flowTransform?: FlowTransform) => void;
  onMoveStart?: (flowTransform?: FlowTransform) => void;
  onMoveEnd?: (flowTransform?: FlowTransform) => void;
  onSelectionChange?: (elements: Elements | null) => void;
  onSelectionDragStart?: (event: MouseEvent, nodes: Node[]) => void;
  onSelectionDrag?: (event: MouseEvent, nodes: Node[]) => void;
  onSelectionDragStop?: (event: MouseEvent, nodes: Node[]) => void;
  onSelectionContextMenu?: (event: MouseEvent, nodes: Node[]) => void;
  onPaneScroll?: (event?: WheelEvent) => void;
  onPaneClick?: (event: MouseEvent) => void;
  onPaneContextMenu?: (event: MouseEvent) => void;
  nodeTypes?: NodeTypesType;
  edgeTypes?: EdgeTypesType;
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
  onEdgeUpdate?: OnEdgeUpdateFunc;
  onEdgeContextMenu?: (event: MouseEvent, edge: Edge) => void;
  onEdgeMouseEnter?: (event: MouseEvent, edge: Edge) => void;
  onEdgeMouseMove?: (event: MouseEvent, edge: Edge) => void;
  onEdgeMouseLeave?: (event: MouseEvent, edge: Edge) => void;
  onEdgeDoubleClick?: (event: MouseEvent, edge: Edge) => void;
  onEdgeUpdateStart?: (event: MouseEvent, edge: Edge) => void;
  onEdgeUpdateEnd?: (event: MouseEvent, edge: Edge) => void;
  edgeUpdaterRadius?: number;
  nodeTypesId?: string;
  edgeTypesId?: string;
}

const RevueFlow = defineComponent({
  name: 'RevueFlow',
  components: { GraphView },
  props: {
    elements: {
      type: Array as PropType<RevueFlowProps['elements']>,
      required: true
    },
    nodeTypesId: {
      type: String as PropType<RevueFlowProps['nodeTypesId']>,
      required: false,
      default: '1'
    },
    edgeTypesId: {
      type: String as PropType<RevueFlowProps['edgeTypesId']>,
      required: false,
      default: '1'
    },
    nodeTypes: {
      type: Object as PropType<RevueFlowProps['nodeTypes']>,
      required: false,
      default: () => defaultNodeTypes
    },
    edgeTypes: {
      type: Object as PropType<RevueFlowProps['edgeTypes']>,
      required: false,
      default: () => defaultEdgeTypes
    },
    onMove: {
      type: Function as unknown as PropType<RevueFlowProps['onMove']>,
      required: false,
      default: undefined
    },
    onMoveStart: {
      type: Function as unknown as PropType<RevueFlowProps['onMoveStart']>,
      required: false,
      default: undefined
    },
    onMoveEnd: {
      type: Function as unknown as PropType<RevueFlowProps['onMoveEnd']>,
      required: false,
      default: undefined
    },
    onLoad: {
      type: Function as unknown as PropType<RevueFlowProps['onLoad']>,
      required: false,
      default: undefined
    },
    onElementClick: {
      type: Function as unknown as PropType<RevueFlowProps['onElementClick']>,
      required: false,
      default: undefined
    },
    onNodeDoubleClick: {
      type: Function as unknown as PropType<RevueFlowProps['onNodeDoubleClick']>,
      required: false,
      default: undefined
    },
    onEdgeDoubleClick: {
      type: Function as unknown as PropType<RevueFlowProps['onEdgeDoubleClick']>,
      required: false,
      default: undefined
    },
    onNodeMouseEnter: {
      type: Function as unknown as PropType<RevueFlowProps['onNodeMouseEnter']>,
      required: false,
      default: undefined
    },
    onNodeMouseMove: {
      type: Function as unknown as PropType<RevueFlowProps['onNodeMouseMove']>,
      required: false,
      default: undefined
    },
    onNodeMouseLeave: {
      type: Function as unknown as PropType<RevueFlowProps['onNodeMouseLeave']>,
      required: false,
      default: undefined
    },
    onNodeContextMenu: {
      type: Function as unknown as PropType<RevueFlowProps['onNodeContextMenu']>,
      required: false,
      default: undefined
    },
    onNodeDragStart: {
      type: Function as unknown as PropType<RevueFlowProps['onNodeDragStart']>,
      required: false,
      default: undefined
    },
    onNodeDrag: {
      type: Function as unknown as PropType<RevueFlowProps['onNodeDrag']>,
      required: false,
      default: undefined
    },
    onNodeDragStop: {
      type: Function as unknown as PropType<RevueFlowProps['onNodeDragStop']>,
      required: false,
      default: undefined
    },
    onSelectionContextMenu: {
      type: Function as unknown as PropType<RevueFlowProps['onSelectionContextMenu']>,
      required: false,
      default: undefined
    },
    onElementsRemove: {
      type: Function as unknown as PropType<RevueFlowProps['onElementsRemove']>,
      required: false,
      default: undefined
    },
    onConnect: {
      type: Function as unknown as PropType<RevueFlowProps['onConnect']>,
      required: false,
      default: undefined
    },
    onConnectStart: {
      type: Function as unknown as PropType<RevueFlowProps['onConnectStart']>,
      required: false,
      default: undefined
    },
    onConnectStop: {
      type: Function as unknown as PropType<RevueFlowProps['onConnectStop']>,
      required: false,
      default: undefined
    },
    onConnectEnd: {
      type: Function as unknown as PropType<RevueFlowProps['onConnectEnd']>,
      required: false,
      default: undefined
    },
    connectionMode: {
      type: String as PropType<RevueFlowProps['connectionMode']>,
      required: false,
      default: ConnectionMode.Strict
    },
    connectionLineType: {
      type: String as PropType<RevueFlowProps['connectionLineType']>,
      required: false,
      default: ConnectionLineType.Bezier
    },
    connectionLineStyle: {
      type: Object as PropType<RevueFlowProps['connectionLineStyle']>,
      required: false,
      default: undefined
    },
    connectionLineComponent: {
      type: Object as PropType<RevueFlowProps['connectionLineComponent']>,
      required: false,
      default: undefined
    },
    selectionKeyCode: {
      type: [Number, String] as PropType<RevueFlowProps['selectionKeyCode']>,
      required: false,
      default: 'Shift'
    },
    multiSelectionKeyCode: {
      type: [Number, String] as PropType<RevueFlowProps['multiSelectionKeyCode']>,
      required: false,
      default: 'Meta'
    },
    zoomActivationKeyCode: {
      type: [Number, String] as PropType<RevueFlowProps['zoomActivationKeyCode']>,
      required: false,
      default: 'Meta'
    },
    deleteKeyCode: {
      type: [Number, String] as PropType<RevueFlowProps['deleteKeyCode']>,
      required: false,
      default: 'Backspace'
    },
    snapToGrid: {
      type: Boolean as PropType<RevueFlowProps['snapToGrid']>,
      required: false,
      default: false
    },
    snapGrid: {
      type: Array as unknown as PropType<RevueFlowProps['snapGrid']>,
      required: false,
      default: () => [15, 15]
    },
    onlyRenderVisibleElements: {
      type: Boolean as PropType<RevueFlowProps['onlyRenderVisibleElements']>,
      required: false,
      default: false
    },
    nodesDraggable: {
      type: Boolean as PropType<RevueFlowProps['nodesDraggable']>,
      required: false,
      default: undefined
    },
    nodesConnectable: {
      type: Boolean as PropType<RevueFlowProps['nodesConnectable']>,
      required: false,
      default: undefined
    },
    elementsSelectable: {
      type: Boolean as PropType<RevueFlowProps['elementsSelectable']>,
      required: false,
      default: undefined
    },
    selectNodesOnDrag: {
      type: Boolean as PropType<RevueFlowProps['selectNodesOnDrag']>,
      required: false,
      default: true
    },
    minZoom: {
      type: Number as PropType<RevueFlowProps['minZoom']>,
      required: false,
      default: undefined
    },
    maxZoom: {
      type: Number as PropType<RevueFlowProps['maxZoom']>,
      required: false,
      default: undefined
    },
    defaultZoom: {
      type: Number as PropType<RevueFlowProps['defaultZoom']>,
      required: false,
      default: 1
    },
    defaultPosition: {
      type: Array as unknown as PropType<RevueFlowProps['defaultPosition']>,
      required: false,
      default: () => [0, 0]
    },
    translateExtent: {
      type: Array as unknown as PropType<RevueFlowProps['translateExtent']>,
      required: false,
      default: undefined
    },
    nodeExtent: {
      type: Array as unknown as PropType<RevueFlowProps['nodeExtent']>,
      required: false,
      default: undefined
    },
    arrowHeadColor: {
      type: String as PropType<RevueFlowProps['arrowHeadColor']>,
      required: false,
      default: '#b1b1b7'
    },
    markerEndId: {
      type: String as PropType<RevueFlowProps['markerEndId']>,
      required: false,
      default: undefined
    },
    zoomOnScroll: {
      type: Boolean as PropType<RevueFlowProps['zoomOnScroll']>,
      required: false,
      default: true
    },
    zoomOnPinch: {
      type: Boolean as PropType<RevueFlowProps['zoomOnPinch']>,
      required: false,
      default: true
    },
    panOnScroll: {
      type: Boolean as PropType<RevueFlowProps['panOnScroll']>,
      required: false,
      default: false
    },
    panOnScrollSpeed: {
      type: Number as PropType<RevueFlowProps['panOnScrollSpeed']>,
      required: false,
      default: 0.5
    },
    panOnScrollMode: {
      type: String as PropType<RevueFlowProps['panOnScrollMode']>,
      required: false,
      default: PanOnScrollMode.Free
    },
    zoomOnDoubleClick: {
      type: Boolean as PropType<RevueFlowProps['zoomOnDoubleClick']>,
      required: false,
      default: true
    },
    paneMoveable: {
      type: Boolean as PropType<RevueFlowProps['paneMoveable']>,
      required: false,
      default: true
    },
    onPaneClick: {
      type: Function as unknown as PropType<RevueFlowProps['onPaneClick']>,
      required: false,
      default: undefined
    },
    onPaneScroll: {
      type: Function as unknown as PropType<RevueFlowProps['onPaneScroll']>,
      required: false,
      default: undefined
    },
    onPaneContextMenu: {
      type: Function as unknown as PropType<RevueFlowProps['onPaneContextMenu']>,
      required: false,
      default: undefined
    },
    onEdgeUpdate: {
      type: Function as unknown as PropType<RevueFlowProps['onEdgeUpdate']>,
      required: false,
      default: undefined
    },
    onEdgeMouseEnter: {
      type: Function as unknown as PropType<RevueFlowProps['onEdgeMouseEnter']>,
      required: false,
      default: undefined
    },
    onEdgeContextMenu: {
      type: Function as unknown as PropType<RevueFlowProps['onEdgeContextMenu']>,
      required: false,
      default: undefined
    },
    onEdgeMouseMove: {
      type: Function as unknown as PropType<RevueFlowProps['onEdgeMouseMove']>,
      required: false,
      default: undefined
    },
    onEdgeMouseLeave: {
      type: Function as unknown as PropType<RevueFlowProps['onEdgeMouseLeave']>,
      required: false,
      default: undefined
    },
    onEdgeUpdateEnd: {
      type: Function as unknown as PropType<RevueFlowProps['onEdgeUpdateEnd']>,
      required: false,
      default: undefined
    },
    onEdgeUpdateStart: {
      type: Function as unknown as PropType<RevueFlowProps['onEdgeUpdateStart']>,
      required: false,
      default: undefined
    },
    onSelectionDragStart: {
      type: Function as unknown as PropType<RevueFlowProps['onSelectionDragStart']>,
      required: false,
      default: undefined
    },
    onSelectionDrag: {
      type: Function as unknown as PropType<RevueFlowProps['onSelectionDrag']>,
      required: false,
      default: undefined
    },
    onSelectionDragStop: {
      type: Function as unknown as PropType<RevueFlowProps['onSelectionDragStop']>,
      required: false,
      default: undefined
    },
    onSelectionChange: {
      type: Function as unknown as PropType<RevueFlowProps['onSelectionChange']>,
      required: false,
      default: undefined
    },
    edgeUpdaterRadius: {
      type: Number as PropType<RevueFlowProps['edgeUpdaterRadius']>,
      required: false,
      default: 10
    },
    onDrop: {
      type: Function as unknown as PropType<(e: DragEvent) => any>,
      required: false,
      default: undefined as any
    },
    onDragover: {
      type: Function as unknown as PropType<(e: DragEvent) => any>,
      required: false,
      default: undefined as any
    }

    /*  // focus events
      onFocus: FocusEvent,
      onFocusin: FocusEvent,
      onFocusout: FocusEvent,
      onBlur: FocusEvent,

      // keyboard events
      onKeydown: KeyboardEvent,
      onKeypress: KeyboardEvent,
      onKeyup: KeyboardEvent,

      // mouse events
      onAuxclick: MouseEvent,
      onClick: MouseEvent,
      onContextmenu: MouseEvent,
      onDblclick: MouseEvent,
      onMousedown: MouseEvent,
      onMouseenter: MouseEvent,
      onMouseleave: MouseEvent,
      onMousemove: MouseEvent,
      onMouseout: MouseEvent,
      onMouseover: MouseEvent,
      onMouseup: MouseEvent,

      // selection events
      onSelect: Event,

      // UI events
      onScroll: UIEvent,

      // touch events
      onTouchcancel: TouchEvent,
      onTouchend: TouchEvent,
      onTouchmove: TouchEvent,
      onTouchstart: TouchEvent,

      // pointer events
      onPointerdown: PointerEvent,
      onPointermove: PointerEvent,
      onPointerup: PointerEvent,
      onPointercancel: PointerEvent,
      onPointerenter: PointerEvent,
      onPointerleave: PointerEvent,
      onPointerover: PointerEvent,
      onPointerout: PointerEvent,

      // wheel events
      onWheel: WheelEvent,

      // transition events
      onTransitionend: TransitionEvent,
      onTransitionstart: TransitionEvent,
     */
  },
  setup(props, { slots }) {
    const {
      elements = [],
      nodeTypes = defaultNodeTypes,
      edgeTypes = defaultEdgeTypes,
      onElementClick,
      onLoad,
      onMove,
      onMoveStart,
      onMoveEnd,
      onElementsRemove,
      onConnect,
      onConnectStart,
      onConnectStop,
      onConnectEnd,
      onNodeMouseEnter,
      onNodeMouseMove,
      onNodeMouseLeave,
      onNodeContextMenu,
      onNodeDoubleClick,
      onNodeDragStart,
      onNodeDrag,
      onNodeDragStop,
      onSelectionChange,
      onSelectionDragStart,
      onSelectionDrag,
      onSelectionDragStop,
      onSelectionContextMenu,
      connectionMode = ConnectionMode.Strict,
      connectionLineType = ConnectionLineType.Bezier,
      connectionLineStyle,
      connectionLineComponent,
      deleteKeyCode = 'Backspace',
      selectionKeyCode = 'Shift',
      multiSelectionKeyCode = 'Meta',
      zoomActivationKeyCode = 'Meta',
      snapToGrid = false,
      snapGrid = [15, 15],
      onlyRenderVisibleElements = false,
      selectNodesOnDrag = true,
      nodesDraggable,
      nodesConnectable,
      elementsSelectable,
      minZoom,
      maxZoom,
      defaultZoom = 1,
      defaultPosition = [0, 0],
      translateExtent,
      nodeExtent,
      arrowHeadColor = '#b1b1b7',
      markerEndId,
      zoomOnScroll = true,
      zoomOnPinch = true,
      panOnScroll = false,
      panOnScrollSpeed = 0.5,
      panOnScrollMode = PanOnScrollMode.Free,
      zoomOnDoubleClick = true,
      paneMoveable = true,
      onPaneClick,
      onPaneScroll,
      onPaneContextMenu,
      onEdgeUpdate,
      onEdgeContextMenu,
      onEdgeDoubleClick,
      onEdgeMouseEnter,
      onEdgeMouseMove,
      onEdgeMouseLeave,
      onEdgeUpdateStart,
      onEdgeUpdateEnd,
      edgeUpdaterRadius = 10,
      nodeTypesId = '1',
      edgeTypesId = '1',
      ...rest
    } = reactive(props);
    const store = configureStore(initialState)();
    provide<RevueFlowStore>('store', store);
    store.setElements(elements);

    watchEffect(() => {
      store.setElements(elements);
      onSelectionChange?.(store.selectedElements);
    });
    onBeforeUnmount(() => {
      store.$reset();
      store.setElements([]);
    });

    const nodeTypesParsed = computed(() => nodeTypes && createNodeTypes(nodeTypes));
    const edgeTypesParsed = computed(() => edgeTypes && createEdgeTypes(edgeTypes));

    return () => (
      <div {...rest} class="revue-flow">
        <GraphView
          onLoad={onLoad}
          onMove={onMove}
          onMoveStart={onMoveStart}
          onMoveEnd={onMoveEnd}
          onElementClick={onElementClick}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseMove={onNodeMouseMove}
          onNodeMouseLeave={onNodeMouseLeave}
          onNodeContextMenu={onNodeContextMenu}
          onNodeDoubleClick={onNodeDoubleClick}
          onNodeDragStart={onNodeDragStart}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          nodeTypes={nodeTypesParsed.value}
          edgeTypes={edgeTypesParsed.value}
          connectionMode={connectionMode}
          connectionLineType={connectionLineType}
          connectionLineStyle={connectionLineStyle}
          connectionLineComponent={connectionLineComponent}
          selectionKeyCode={selectionKeyCode}
          onElementsRemove={onElementsRemove}
          deleteKeyCode={deleteKeyCode}
          multiSelectionKeyCode={multiSelectionKeyCode}
          zoomActivationKeyCode={zoomActivationKeyCode}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectStop={onConnectStop}
          onConnectEnd={onConnectEnd}
          snapToGrid={snapToGrid}
          snapGrid={snapGrid}
          onlyRenderVisibleElements={onlyRenderVisibleElements}
          nodesDraggable={nodesDraggable}
          nodesConnectable={nodesConnectable}
          elementsSelectable={elementsSelectable}
          selectNodesOnDrag={selectNodesOnDrag}
          minZoom={minZoom}
          maxZoom={maxZoom}
          defaultZoom={defaultZoom}
          defaultPosition={defaultPosition}
          translateExtent={translateExtent}
          nodeExtent={nodeExtent}
          arrowHeadColor={arrowHeadColor}
          markerEndId={markerEndId}
          zoomOnScroll={zoomOnScroll}
          zoomOnPinch={zoomOnPinch}
          zoomOnDoubleClick={zoomOnDoubleClick}
          panOnScroll={panOnScroll}
          panOnScrollSpeed={panOnScrollSpeed}
          panOnScrollMode={panOnScrollMode}
          paneMoveable={paneMoveable}
          onPaneClick={onPaneClick}
          onPaneScroll={onPaneScroll}
          onPaneContextMenu={onPaneContextMenu}
          onSelectionDragStart={onSelectionDragStart}
          onSelectionDrag={onSelectionDrag}
          onSelectionDragStop={onSelectionDragStop}
          onSelectionContextMenu={onSelectionContextMenu}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeContextMenu={onEdgeContextMenu}
          onEdgeDoubleClick={onEdgeDoubleClick}
          onEdgeMouseEnter={onEdgeMouseEnter}
          onEdgeMouseMove={onEdgeMouseMove}
          onEdgeMouseLeave={onEdgeMouseLeave}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          edgeUpdaterRadius={edgeUpdaterRadius}
        />
        {slots.default ? slots.default() : ''}
      </div>
    );
  }
});
export default RevueFlow;
