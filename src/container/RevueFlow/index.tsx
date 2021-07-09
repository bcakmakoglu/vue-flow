import { computed, CSSProperties, defineComponent, HTMLAttributes, onUpdated, PropType } from 'vue';
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
  NodeExtent
} from '../../types';

import '../../style.css';
import '../../theme-default.css';
import store from '../../store';

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

export interface ReactFlowProps extends Omit<HTMLAttributes, 'onLoad'> {
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
      type: Object as PropType<ReactFlowProps['elements']>,
      required: true
    },
    nodeTypesId: {
      type: String as PropType<ReactFlowProps['nodeTypesId']>,
      required: false,
      default: '1'
    },
    edgeTypesId: {
      type: String as PropType<ReactFlowProps['edgeTypesId']>,
      required: false,
      default: '1'
    },
    nodeTypes: {
      type: Object as PropType<ReactFlowProps['nodeTypes']>,
      required: false,
      default: () => defaultNodeTypes
    },
    edgeTypes: {
      type: Object as PropType<ReactFlowProps['edgeTypes']>,
      required: false,
      default: () => defaultEdgeTypes
    },
    onMove: {
      type: Function() as PropType<ReactFlowProps['onMove']>,
      required: false,
      default: undefined as any
    },
    onMoveStart: {
      type: Function() as PropType<ReactFlowProps['onMoveStart']>,
      required: false,
      default: undefined as any
    },
    onMoveEnd: {
      type: Function() as PropType<ReactFlowProps['onMoveEnd']>,
      required: false,
      default: undefined as any
    },
    onLoad: {
      type: Function() as PropType<ReactFlowProps['onLoad']>,
      required: false,
      default: undefined as any
    },
    onElementClick: {
      type: Function() as PropType<ReactFlowProps['onElementClick']>,
      required: false,
      default: undefined as any
    },
    onNodeDoubleClick: {
      type: Function() as PropType<ReactFlowProps['onNodeDoubleClick']>,
      required: false,
      default: undefined as any
    },
    onEdgeDoubleClick: {
      type: Function() as PropType<ReactFlowProps['onEdgeDoubleClick']>,
      required: false,
      default: undefined as any
    },
    onNodeMouseEnter: {
      type: Function() as PropType<ReactFlowProps['onNodeMouseEnter']>,
      required: false,
      default: undefined as any
    },
    onNodeMouseMove: {
      type: Function() as PropType<ReactFlowProps['onNodeMouseMove']>,
      required: false,
      default: undefined as any
    },
    onNodeMouseLeave: {
      type: Function() as PropType<ReactFlowProps['onNodeMouseLeave']>,
      required: false,
      default: undefined as any
    },
    onNodeContextMenu: {
      type: Function() as PropType<ReactFlowProps['onNodeContextMenu']>,
      required: false,
      default: undefined as any
    },
    onNodeDragStart: {
      type: Function() as PropType<ReactFlowProps['onNodeDragStart']>,
      required: false,
      default: undefined as any
    },
    onNodeDrag: {
      type: Function() as PropType<ReactFlowProps['onNodeDrag']>,
      required: false,
      default: undefined as any
    },
    onNodeDragStop: {
      type: Function() as PropType<ReactFlowProps['onNodeDragStop']>,
      required: false,
      default: undefined as any
    },
    onSelectionContextMenu: {
      type: Function() as PropType<ReactFlowProps['onSelectionContextMenu']>,
      required: false,
      default: undefined as any
    },
    onElementsRemove: {
      type: Function() as PropType<ReactFlowProps['onElementsRemove']>,
      required: false,
      default: undefined as any
    },
    onConnect: {
      type: Function() as PropType<ReactFlowProps['onConnect']>,
      required: false,
      default: undefined as any
    },
    onConnectStart: {
      type: Function() as PropType<ReactFlowProps['onConnectStart']>,
      required: false,
      default: undefined as any
    },
    onConnectStop: {
      type: Function() as PropType<ReactFlowProps['onConnectStop']>,
      required: false,
      default: undefined as any
    },
    onConnectEnd: {
      type: Function() as PropType<ReactFlowProps['onConnectEnd']>,
      required: false,
      default: undefined as any
    },
    connectionMode: {
      type: String as PropType<ReactFlowProps['connectionMode']>,
      required: false,
      default: ConnectionMode.Strict
    },
    connectionLineType: {
      type: String as PropType<ReactFlowProps['connectionLineType']>,
      required: false,
      default: ConnectionLineType.Bezier
    },
    connectionLineStyle: {
      type: Object as PropType<ReactFlowProps['connectionLineStyle']>,
      required: false,
      default: () => ({} as CSSProperties)
    },
    connectionLineComponent: {
      type: Object as PropType<ReactFlowProps['connectionLineComponent']>,
      required: false,
      default: undefined as any
    },
    selectionKeyCode: {
      type: (Number || String) as PropType<ReactFlowProps['selectionKeyCode']>,
      required: false,
      default: 'Shift'
    },
    multiSelectionKeyCode: {
      type: (Number || String) as PropType<ReactFlowProps['multiSelectionKeyCode']>,
      required: false,
      default: 'Meta'
    },
    zoomActivationKeyCode: {
      type: (Number || String) as PropType<ReactFlowProps['zoomActivationKeyCode']>,
      required: false,
      default: 'Meta'
    },
    deleteKeyCode: {
      type: (Number || String) as PropType<ReactFlowProps['deleteKeyCode']>,
      required: false,
      default: 'Backspace'
    },
    snapToGrid: {
      type: Boolean as PropType<ReactFlowProps['snapToGrid']>,
      required: false,
      default: false
    },
    snapGrid: {
      type: Array as unknown as PropType<ReactFlowProps['snapGrid']>,
      required: false,
      default: () => [15, 15]
    },
    onlyRenderVisibleElements: {
      type: Boolean as PropType<ReactFlowProps['onlyRenderVisibleElements']>,
      required: false,
      default: false
    },
    nodesDraggable: {
      type: Boolean as PropType<ReactFlowProps['nodesDraggable']>,
      required: false,
      default: undefined
    },
    nodesConnectable: {
      type: Boolean as PropType<ReactFlowProps['nodesConnectable']>,
      required: false,
      default: undefined
    },
    elementsSelectable: {
      type: Boolean as PropType<ReactFlowProps['elementsSelectable']>,
      required: false,
      default: undefined
    },
    selectNodesOnDrag: {
      type: Boolean as PropType<ReactFlowProps['selectNodesOnDrag']>,
      required: false,
      default: true
    },
    minZoom: {
      type: Number as PropType<ReactFlowProps['minZoom']>,
      required: false,
      default: undefined
    },
    maxZoom: {
      type: Number as PropType<ReactFlowProps['maxZoom']>,
      required: false,
      default: undefined
    },
    defaultZoom: {
      type: Number as PropType<ReactFlowProps['defaultZoom']>,
      required: false,
      default: 1
    },
    defaultPosition: {
      type: Array as unknown as PropType<ReactFlowProps['defaultPosition']>,
      required: false,
      default: () => [0, 0]
    },
    translateExtent: {
      type: Array as unknown as PropType<ReactFlowProps['translateExtent']>,
      required: false,
      default: undefined
    },
    nodeExtent: {
      type: Array as unknown as PropType<ReactFlowProps['nodeExtent']>,
      required: false,
      default: undefined
    },
    arrowHeadColor: {
      type: String as PropType<ReactFlowProps['arrowHeadColor']>,
      required: false,
      default: '#b1b1b7'
    },
    markerEndId: {
      type: String as PropType<ReactFlowProps['markerEndId']>,
      required: false,
      default: undefined
    },
    zoomOnScroll: {
      type: Boolean as PropType<ReactFlowProps['zoomOnScroll']>,
      required: false,
      default: true
    },
    zoomOnPinch: {
      type: Boolean as PropType<ReactFlowProps['zoomOnPinch']>,
      required: false,
      default: true
    },
    panOnScroll: {
      type: Boolean as PropType<ReactFlowProps['panOnScroll']>,
      required: false,
      default: false
    },
    panOnScrollSpeed: {
      type: Number as PropType<ReactFlowProps['panOnScrollSpeed']>,
      required: false,
      default: 0.5
    },
    panOnScrollMode: {
      type: String as PropType<ReactFlowProps['panOnScrollMode']>,
      required: false,
      default: PanOnScrollMode.Free
    },
    zoomOnDoubleClick: {
      type: Boolean as PropType<ReactFlowProps['zoomOnDoubleClick']>,
      required: false,
      default: true
    },
    paneMoveable: {
      type: Boolean as PropType<ReactFlowProps['paneMoveable']>,
      required: false,
      default: true
    },
    onPaneClick: {
      type: Function() as PropType<ReactFlowProps['onPaneClick']>,
      required: false,
      default: undefined as any
    },
    onPaneScroll: {
      type: Function() as PropType<ReactFlowProps['onPaneScroll']>,
      required: false,
      default: undefined as any
    },
    onPaneContextMenu: {
      type: Function() as PropType<ReactFlowProps['onPaneContextMenu']>,
      required: false,
      default: undefined as any
    },
    onEdgeUpdate: {
      type: Function() as PropType<ReactFlowProps['onEdgeUpdate']>,
      required: false,
      default: undefined as any
    },
    onEdgeMouseEnter: {
      type: Function() as PropType<ReactFlowProps['onEdgeMouseEnter']>,
      required: false,
      default: undefined as any
    },
    onEdgeContextMenu: {
      type: Function() as PropType<ReactFlowProps['onEdgeContextMenu']>,
      required: false,
      default: undefined as any
    },
    onEdgeMouseMove: {
      type: Function() as PropType<ReactFlowProps['onEdgeMouseMove']>,
      required: false,
      default: undefined as any
    },
    onEdgeMouseLeave: {
      type: Function() as PropType<ReactFlowProps['onEdgeMouseLeave']>,
      required: false,
      default: undefined as any
    },
    onEdgeUpdateEnd: {
      type: Function() as PropType<ReactFlowProps['onEdgeUpdateEnd']>,
      required: false,
      default: undefined as any
    },
    onEdgeUpdateStart: {
      type: Function() as PropType<ReactFlowProps['onEdgeUpdateStart']>,
      required: false,
      default: undefined as any
    },
    edgeUpdaterRadius: {
      type: Number as PropType<ReactFlowProps['edgeUpdaterRadius']>,
      required: false,
      default: 10
    }
  },
  setup(props, { slots }) {
    const pinia = store();
    pinia.setElements(props.elements);
    onUpdated(() => {
      pinia.setElements(props.elements);
    });

    const nodeTypesParsed = computed(() => props.nodeTypes && createNodeTypes(props.nodeTypes));
    const edgeTypesParsed = computed(() => props.edgeTypes && createEdgeTypes(props.edgeTypes));
    const reactFlowClasses = ['react-flow'];

    return () => (
      <div class={reactFlowClasses}>
        <GraphView
          onLoad={props.onLoad}
          onMove={props.onMove}
          onMoveStart={props.onMoveStart}
          onMoveEnd={props.onMoveEnd}
          onElementClick={props.onElementClick}
          onNodeMouseEnter={props.onNodeMouseEnter}
          onNodeMouseMove={props.onNodeMouseMove}
          onNodeMouseLeave={props.onNodeMouseLeave}
          onNodeContextMenu={props.onNodeContextMenu}
          onNodeDoubleClick={props.onNodeDoubleClick}
          onNodeDragStart={props.onNodeDragStart}
          onNodeDrag={props.onNodeDrag}
          onNodeDragStop={props.onNodeDragStop}
          nodeTypes={nodeTypesParsed.value}
          edgeTypes={edgeTypesParsed.value}
          connectionMode={props.connectionMode}
          connectionLineType={props.connectionLineType}
          connectionLineStyle={props.connectionLineStyle}
          connectionLineComponent={props.connectionLineComponent}
          selectionKeyCode={props.selectionKeyCode}
          onElementsRemove={props.onElementsRemove}
          deleteKeyCode={props.deleteKeyCode}
          multiSelectionKeyCode={props.multiSelectionKeyCode}
          zoomActivationKeyCode={props.zoomActivationKeyCode}
          onConnect={props.onConnect}
          onConnectStart={props.onConnectStart}
          onConnectStop={props.onConnectStop}
          onConnectEnd={props.onConnectEnd}
          snapToGrid={props.snapToGrid}
          snapGrid={props.snapGrid}
          onlyRenderVisibleElements={props.onlyRenderVisibleElements}
          nodesDraggable={props.nodesDraggable}
          nodesConnectable={props.nodesConnectable}
          elementsSelectable={props.elementsSelectable}
          selectNodesOnDrag={props.selectNodesOnDrag}
          minZoom={props.minZoom}
          maxZoom={props.maxZoom}
          defaultZoom={props.defaultZoom}
          defaultPosition={props.defaultPosition}
          translateExtent={props.translateExtent}
          nodeExtent={props.nodeExtent}
          arrowHeadColor={props.arrowHeadColor}
          markerEndId={props.markerEndId}
          zoomOnScroll={props.zoomOnScroll}
          zoomOnPinch={props.zoomOnPinch}
          zoomOnDoubleClick={props.zoomOnDoubleClick}
          panOnScroll={props.panOnScroll}
          panOnScrollSpeed={props.panOnScrollSpeed}
          panOnScrollMode={props.panOnScrollMode}
          paneMoveable={props.paneMoveable}
          onPaneClick={props.onPaneClick}
          onPaneScroll={props.onPaneScroll}
          onPaneContextMenu={props.onPaneContextMenu}
          onSelectionContextMenu={props.onSelectionContextMenu}
          onEdgeUpdate={props.onEdgeUpdate}
          onEdgeContextMenu={props.onEdgeContextMenu}
          onEdgeDoubleClick={props.onEdgeDoubleClick}
          onEdgeMouseEnter={props.onEdgeMouseEnter}
          onEdgeMouseMove={props.onEdgeMouseMove}
          onEdgeMouseLeave={props.onEdgeMouseLeave}
          onEdgeUpdateStart={props.onEdgeUpdateStart}
          onEdgeUpdateEnd={props.onEdgeUpdateEnd}
          edgeUpdaterRadius={props.edgeUpdaterRadius}
        />
        {slots.default ? slots.default() : ''}
      </div>
    );
  }
});

export default RevueFlow;
