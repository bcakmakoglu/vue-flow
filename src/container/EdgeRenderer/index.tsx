import ConnectionLine from '../../components/ConnectionLine/index';
import { isEdge } from '../../utils/graph';
import { getEdgePositions, getHandle, isEdgeVisible, getSourceTargetNodes } from './utils';
import {
  Position,
  Edge,
  Node,
  Elements,
  Connection,
  ConnectionLineType,
  ConnectionLineComponent,
  ConnectionMode,
  Transform,
  OnEdgeUpdateFunc
} from '../../types';
import { computed, CSSProperties, defineComponent, PropType } from 'vue';
import store from '../../store';

interface EdgeRendererProps {
  edgeTypes: any;
  connectionLineType: ConnectionLineType;
  connectionLineStyle?: CSSProperties;
  connectionLineComponent?: ConnectionLineComponent;
  connectionMode?: ConnectionMode;
  onElementClick?: (event: MouseEvent, element: Node | Edge) => void;
  onEdgeDoubleClick?: (event: MouseEvent, edge: Edge) => void;
  arrowHeadColor: string;
  markerEndId?: string;
  onlyRenderVisibleElements: boolean;
  onEdgeUpdate?: OnEdgeUpdateFunc;
  onEdgeContextMenu?: (event: MouseEvent, edge: Edge) => void;
  onEdgeMouseEnter?: (event: MouseEvent, edge: Edge) => void;
  onEdgeMouseMove?: (event: MouseEvent, edge: Edge) => void;
  onEdgeMouseLeave?: (event: MouseEvent, edge: Edge) => void;
  onEdgeUpdateStart?: (event: MouseEvent, edge: Edge) => void;
  onEdgeUpdateEnd?: (event: MouseEvent, edge: Edge) => void;
  edgeUpdaterRadius?: number;
}

interface EdgeWrapperProps {
  edge: Edge;
  props: EdgeRendererProps;
  nodes: Node[];
  selectedElements: Elements | null;
  elementsSelectable: boolean;
  transform: Transform;
  width: number;
  height: number;
  onlyRenderVisibleElements: boolean;
  connectionMode?: ConnectionMode;
}

const EdgeCmp = defineComponent({
  props: {
    edge: {
      type: Object as PropType<EdgeWrapperProps['edge']>,
      required: true
    },
    props: {
      type: Object as PropType<EdgeWrapperProps['props']>,
      required: true
    },
    nodes: {
      type: Array as unknown as PropType<EdgeWrapperProps['nodes']>,
      required: true
    },
    selectedElements: {
      type: Array as unknown as PropType<EdgeWrapperProps['selectedElements']>,
      required: false,
      default: undefined
    },
    elementsSelectable: {
      type: Boolean as PropType<EdgeWrapperProps['elementsSelectable']>,
      required: false,
      default: false
    },
    transform: {
      type: Array as unknown as PropType<EdgeWrapperProps['transform']>,
      required: false,
      default: () => []
    },
    width: {
      type: Number as PropType<EdgeWrapperProps['width']>,
      required: false,
      default: undefined
    },
    height: {
      type: Number as PropType<EdgeWrapperProps['height']>,
      required: false,
      default: undefined
    },
    onlyRenderVisibleElements: {
      type: Boolean as PropType<EdgeWrapperProps['onlyRenderVisibleElements']>,
      required: false,
      default: false
    },
    connectionMode: {
      type: String as PropType<EdgeWrapperProps['connectionMode']>,
      required: false,
      default: undefined
    }
  },
  setup(props) {
    const sourceHandleId = computed(() => props.edge.sourceHandle || null);
    const targetHandleId = computed(() => props.edge.targetHandle || null);
    const nodes = computed(() => getSourceTargetNodes(props.edge, props.nodes));

    const onConnectEdge = (connection: Connection) => {
      props.props.onEdgeUpdate?.(props.edge, connection);
    };

    if (!nodes.value.sourceNode) {
      console.log(`couldn't create edge for source id: ${props.edge.source}; edge id: ${props.edge.id}`);
      return () => null;
    }

    if (!nodes.value.targetNode) {
      console.log(`couldn't create edge for target id: ${props.edge.target}; edge id: ${props.edge.id}`);
      return () => null;
    }

    const edgeType = props.edge.type || 'default';
    const EdgeComponent: any = props.props.edgeTypes[edgeType] || props.props.edgeTypes.default;
    const targetNodeBounds = nodes.value.targetNode.__rf.handleBounds;
    // when connection type is loose we can define all handles as sources
    const targetNodeHandles =
      props.connectionMode === ConnectionMode.Strict
        ? targetNodeBounds.target
        : targetNodeBounds.target || targetNodeBounds.source;
    const sourceHandle = computed(
      () => nodes.value.sourceNode && getHandle(nodes.value.sourceNode.__rf.handleBounds.source, sourceHandleId.value)
    );
    const targetHandle = computed(() => getHandle(targetNodeHandles, targetHandleId.value));
    const sourcePosition = sourceHandle.value ? sourceHandle.value.position : Position.Bottom;
    const targetPosition = targetHandle.value ? targetHandle.value.position : Position.Top;

    const edgePositions = computed(() => {
      return (
        nodes.value.sourceNode &&
        nodes.value.targetNode &&
        getEdgePositions(
          nodes.value.sourceNode,
          sourceHandle,
          sourcePosition,
          nodes.value.targetNode,
          targetHandle,
          targetPosition
        )
      );
    });

    const isVisible = computed(() => {
      return props.onlyRenderVisibleElements
        ? edgePositions.value &&
            isEdgeVisible({
              sourcePos: { x: edgePositions.value?.sourceX, y: edgePositions.value?.sourceY },
              targetPos: { x: edgePositions.value?.targetX, y: edgePositions.value?.targetY },
              width: props.width || 0,
              height: props.height || 0,
              transform: props.transform
            })
        : true;
    });

    if (!isVisible.value) {
      return null;
    }

    const isSelected = computed(() => props.selectedElements?.some((elm) => isEdge(elm) && elm.id === props.edge.id) || false);

    return () => (
      <EdgeComponent
        key={props.edge.id}
        id={props.edge.id}
        class={props.edge.className}
        type={props.edge.type}
        data={props.edge.data}
        onClick={props.props.onElementClick}
        selected={isSelected}
        animated={props.edge.animated}
        label={props.edge.label}
        labelStyle={props.edge.labelStyle}
        labelShowBg={props.edge.labelShowBg}
        labelBgStyle={props.edge.labelBgStyle}
        labelBgPadding={props.edge.labelBgPadding}
        labelBgBorderRadius={props.edge.labelBgBorderRadius}
        style={props.edge.style}
        arrowHeadType={props.edge.arrowHeadType}
        source={props.edge.source}
        target={props.edge.target}
        sourceHandleId={sourceHandleId}
        targetHandleId={targetHandleId}
        sourceX={edgePositions.value?.sourceX}
        sourceY={edgePositions.value?.sourceY}
        targetX={edgePositions.value?.targetX}
        targetY={edgePositions.value?.targetY}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        elementsSelectable={props.elementsSelectable}
        markerEndId={props.props.markerEndId}
        isHidden={props.edge.isHidden}
        onConnectEdge={onConnectEdge}
        handleEdgeUpdate={typeof props.props.onEdgeUpdate !== 'undefined'}
        onContextMenu={props.props.onEdgeContextMenu}
        onMouseEnter={props.props.onEdgeMouseEnter}
        onMouseMove={props.props.onEdgeMouseMove}
        onMouseLeave={props.props.onEdgeMouseLeave}
        edgeUpdaterRadius={props.props.edgeUpdaterRadius}
        onEdgeDoubleClick={props.props.onEdgeDoubleClick}
        onEdgeUpdateStart={props.props.onEdgeUpdateStart}
        onEdgeUpdateEnd={props.props.onEdgeUpdateEnd}
      />
    );
  }
});

const EdgeRenderer = defineComponent({
  name: 'EdgeRenderer',
  components: {
    EdgeCmp,
    ConnectionLine
  },
  props: {
    edgeTypes: {
      type: Object,
      required: false,
      default: undefined
    },
    connectionLineType: {
      type: String as PropType<EdgeRendererProps['connectionLineType']>,
      required: false,
      default: undefined
    },
    connectionLineStyle: {
      type: Object as PropType<EdgeRendererProps['connectionLineStyle']>,
      required: false,
      default: undefined
    },
    connectionLineComponent: {
      type: Object as PropType<EdgeRendererProps['connectionLineComponent']>,
      required: false,
      default: undefined
    },
    connectionMode: {
      type: String as PropType<EdgeRendererProps['connectionMode']>,
      required: false,
      default: undefined
    },
    onElementClick: {
      type: Function() as PropType<EdgeRendererProps['onElementClick']>,
      required: false,
      default: undefined
    },
    onEdgeDoubleClick: {
      type: Function() as PropType<EdgeRendererProps['onEdgeDoubleClick']>,
      required: false,
      default: undefined
    },
    arrowHeadColor: {
      type: String as PropType<EdgeRendererProps['arrowHeadColor']>,
      required: false,
      default: undefined
    },
    markerEndId: {
      type: String as PropType<EdgeRendererProps['markerEndId']>,
      required: false,
      default: undefined
    },
    onlyRenderVisibleElements: {
      type: Boolean as PropType<EdgeRendererProps['onlyRenderVisibleElements']>,
      required: false,
      default: undefined
    },
    onEdgeUpdate: {
      type: Function() as PropType<EdgeRendererProps['onEdgeUpdate']>,
      required: false,
      default: undefined
    },
    onEdgeContextMenu: {
      type: Function() as PropType<EdgeRendererProps['onEdgeContextMenu']>,
      required: false,
      default: undefined
    },
    onEdgeMouseEnter: {
      type: Function() as PropType<EdgeRendererProps['onEdgeMouseEnter']>,
      required: false,
      default: undefined
    },
    onEdgeMouseMove: {
      type: Function() as PropType<EdgeRendererProps['onEdgeMouseMove']>,
      required: false,
      default: undefined
    },
    onEdgeMouseLeave: {
      type: Function() as PropType<EdgeRendererProps['onEdgeMouseLeave']>,
      required: false,
      default: undefined
    },
    onEdgeUpdateStart: {
      type: Function() as PropType<EdgeRendererProps['onEdgeUpdateStart']>,
      required: false,
      default: undefined
    },
    onEdgeUpdateEnd: {
      type: Function() as PropType<EdgeRendererProps['onEdgeUpdateEnd']>,
      required: false,
      default: undefined
    },
    edgeUpdaterRadius: {
      type: Number as PropType<EdgeRendererProps['edgeUpdaterRadius']>,
      required: false,
      default: undefined
    }
  },
  setup(props) {
    const pinia = store();
    const transformStyle = computed(() => `translate(${pinia.transform[0]},${pinia.transform[1]}) scale(${pinia.transform[2]})`);
    const renderConnectionLine = computed(() => pinia.connectionNodeId && pinia.connectionHandleType);

    return () => (
      <svg width={pinia.width} height={pinia.height} class="revue-flow__edges">
        <g transform={transformStyle.value}>
          {pinia.edges.map((edge: Edge) => (
            <EdgeCmp
              key={edge.id}
              edge={edge}
              props={props as any}
              nodes={pinia.nodes}
              selectedElements={pinia.selectedElements}
              elementsSelectable={pinia.elementsSelectable}
              transform={pinia.transform}
              width={pinia.width}
              height={pinia.height}
              onlyRenderVisibleElements={props.onlyRenderVisibleElements}
            />
          ))}
          {renderConnectionLine.value && (
            <ConnectionLine
              nodes={pinia.nodes}
              connectionNodeId={pinia.connectionNodeId!}
              connectionHandleId={pinia.connectionHandleId}
              connectionHandleType={pinia.connectionHandleType!}
              connectionPositionX={pinia.connectionPosition.x}
              connectionPositionY={pinia.connectionPosition.y}
              transform={pinia.transform}
              connectionLineStyle={props.connectionLineStyle}
              connectionLineType={props.connectionLineType}
              isConnectable={pinia.nodesConnectable}
              CustomConnectionLineComponent={props.connectionLineComponent}
            />
          )}
        </g>
      </svg>
    );
  }
});

export default EdgeRenderer;
