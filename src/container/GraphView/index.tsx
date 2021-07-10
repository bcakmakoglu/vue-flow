import FlowRenderer from '../FlowRenderer';
import NodeRenderer from '../NodeRenderer';
import EdgeRenderer from '../EdgeRenderer';
import { onLoadProject, onLoadGetElements, onLoadToObject } from '../../utils/graph';
import { RevueFlowProps } from '../RevueFlow';
import { NodeTypesType, EdgeTypesType, ConnectionLineType, KeyCode } from '../../types';
import { CSSProperties, defineComponent, onBeforeMount, onMounted, PropType, ref } from 'vue-demi';
import store from '../../store';
import useZoomPanHelper from '../../hooks/useZoomPanHelper';

export interface GraphViewProps extends Omit<RevueFlowProps, 'onSelectionChange' | 'elements'> {
  nodeTypes: NodeTypesType;
  edgeTypes: EdgeTypesType;
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

const GraphView = defineComponent({
  name: 'GraphView',
  components: { NodeRenderer, EdgeRenderer },
  props: {
    nodeTypes: {
      type: Object as PropType<GraphViewProps['nodeTypes']>,
      required: false,
      default: undefined
    },
    edgeTypes: {
      type: Object as PropType<GraphViewProps['edgeTypes']>,
      required: false,
      default: undefined
    },
    onMove: {
      type: Function() as PropType<GraphViewProps['onMove']>,
      required: false,
      default: undefined as any
    },
    onMoveStart: {
      type: Function() as PropType<GraphViewProps['onMoveStart']>,
      required: false,
      default: undefined as any
    },
    onMoveEnd: {
      type: Function() as PropType<GraphViewProps['onMoveEnd']>,
      required: false,
      default: undefined as any
    },
    onLoad: {
      type: Function() as PropType<GraphViewProps['onLoad']>,
      required: false,
      default: undefined as any
    },
    onElementClick: {
      type: Function() as PropType<GraphViewProps['onElementClick']>,
      required: false,
      default: undefined as any
    },
    onNodeDoubleClick: {
      type: Function() as PropType<GraphViewProps['onNodeDoubleClick']>,
      required: false,
      default: undefined as any
    },
    onEdgeDoubleClick: {
      type: Function() as PropType<GraphViewProps['onEdgeDoubleClick']>,
      required: false,
      default: undefined as any
    },
    onNodeMouseEnter: {
      type: Function() as PropType<GraphViewProps['onNodeMouseEnter']>,
      required: false,
      default: undefined as any
    },
    onNodeMouseMove: {
      type: Function() as PropType<GraphViewProps['onNodeMouseMove']>,
      required: false,
      default: undefined as any
    },
    onNodeMouseLeave: {
      type: Function() as PropType<GraphViewProps['onNodeMouseLeave']>,
      required: false,
      default: undefined as any
    },
    onNodeContextMenu: {
      type: Function() as PropType<GraphViewProps['onNodeContextMenu']>,
      required: false,
      default: undefined as any
    },
    onNodeDragStart: {
      type: Function() as PropType<GraphViewProps['onNodeDragStart']>,
      required: false,
      default: undefined as any
    },
    onNodeDrag: {
      type: Function() as PropType<GraphViewProps['onNodeDrag']>,
      required: false,
      default: undefined as any
    },
    onNodeDragStop: {
      type: Function() as PropType<GraphViewProps['onNodeDragStop']>,
      required: false,
      default: undefined as any
    },
    onSelectionContextMenu: {
      type: Function() as PropType<GraphViewProps['onSelectionContextMenu']>,
      required: false,
      default: undefined as any
    },
    onElementsRemove: {
      type: Function() as PropType<GraphViewProps['onElementsRemove']>,
      required: false,
      default: undefined as any
    },
    onConnect: {
      type: Function() as PropType<GraphViewProps['onConnect']>,
      required: false,
      default: undefined as any
    },
    onConnectStart: {
      type: Function() as PropType<GraphViewProps['onConnectStart']>,
      required: false,
      default: undefined as any
    },
    onConnectStop: {
      type: Function() as PropType<GraphViewProps['onConnectStop']>,
      required: false,
      default: undefined as any
    },
    onConnectEnd: {
      type: Function() as PropType<GraphViewProps['onConnectEnd']>,
      required: false,
      default: undefined as any
    },
    connectionMode: {
      type: String as PropType<GraphViewProps['connectionMode']>,
      required: false,
      default: undefined
    },
    connectionLineType: {
      type: String as PropType<GraphViewProps['connectionLineType']>,
      required: false,
      default: undefined
    },
    connectionLineStyle: {
      type: Object as PropType<GraphViewProps['connectionLineStyle']>,
      required: false,
      default: () => ({} as CSSProperties)
    },
    connectionLineComponent: {
      type: Object as PropType<GraphViewProps['connectionLineComponent']>,
      required: false,
      default: undefined as any
    },
    selectionKeyCode: {
      type: [Number, String] as PropType<GraphViewProps['selectionKeyCode']>,
      required: false,
      default: undefined
    },
    multiSelectionKeyCode: {
      type: [Number, String] as PropType<GraphViewProps['multiSelectionKeyCode']>,
      required: false,
      default: undefined
    },
    zoomActivationKeyCode: {
      type: [Number, String] as PropType<GraphViewProps['zoomActivationKeyCode']>,
      required: false,
      default: undefined
    },
    deleteKeyCode: {
      type: [Number, String] as PropType<GraphViewProps['deleteKeyCode']>,
      required: false,
      default: undefined
    },
    snapToGrid: {
      type: Boolean as PropType<GraphViewProps['snapToGrid']>,
      required: false,
      default: undefined
    },
    snapGrid: {
      type: Array as unknown as PropType<GraphViewProps['snapGrid']>,
      required: false,
      default: undefined
    },
    onlyRenderVisibleElements: {
      type: Boolean as PropType<GraphViewProps['onlyRenderVisibleElements']>,
      required: false,
      default: undefined
    },
    nodesDraggable: {
      type: Boolean as PropType<GraphViewProps['nodesDraggable']>,
      required: false,
      default: undefined
    },
    nodesConnectable: {
      type: Boolean as PropType<GraphViewProps['nodesConnectable']>,
      required: false,
      default: undefined
    },
    elementsSelectable: {
      type: Boolean as PropType<GraphViewProps['elementsSelectable']>,
      required: false,
      default: undefined
    },
    selectNodesOnDrag: {
      type: Boolean as PropType<GraphViewProps['selectNodesOnDrag']>,
      required: false,
      default: undefined
    },
    minZoom: {
      type: Number as PropType<GraphViewProps['minZoom']>,
      required: false,
      default: undefined
    },
    maxZoom: {
      type: Number as PropType<GraphViewProps['maxZoom']>,
      required: false,
      default: undefined
    },
    defaultZoom: {
      type: Number as PropType<GraphViewProps['defaultZoom']>,
      required: false,
      default: undefined
    },
    defaultPosition: {
      type: Array as unknown as PropType<GraphViewProps['defaultPosition']>,
      required: false,
      default: undefined
    },
    translateExtent: {
      type: Array as unknown as PropType<GraphViewProps['translateExtent']>,
      required: false,
      default: undefined
    },
    nodeExtent: {
      type: Array as unknown as PropType<GraphViewProps['nodeExtent']>,
      required: false,
      default: undefined
    },
    arrowHeadColor: {
      type: String as PropType<GraphViewProps['arrowHeadColor']>,
      required: false,
      default: undefined
    },
    markerEndId: {
      type: String as PropType<GraphViewProps['markerEndId']>,
      required: false,
      default: undefined
    },
    zoomOnScroll: {
      type: Boolean as PropType<GraphViewProps['zoomOnScroll']>,
      required: false,
      default: undefined
    },
    zoomOnPinch: {
      type: Boolean as PropType<GraphViewProps['zoomOnPinch']>,
      required: false,
      default: undefined
    },
    panOnScroll: {
      type: Boolean as PropType<GraphViewProps['panOnScroll']>,
      required: false,
      default: undefined
    },
    panOnScrollSpeed: {
      type: Number as PropType<GraphViewProps['panOnScrollSpeed']>,
      required: false,
      default: undefined
    },
    panOnScrollMode: {
      type: String as PropType<GraphViewProps['panOnScrollMode']>,
      required: false,
      default: undefined
    },
    zoomOnDoubleClick: {
      type: Boolean as PropType<GraphViewProps['zoomOnDoubleClick']>,
      required: false,
      default: undefined
    },
    paneMoveable: {
      type: Boolean as PropType<GraphViewProps['paneMoveable']>,
      required: false,
      default: undefined
    },
    onPaneClick: {
      type: Function() as PropType<GraphViewProps['onPaneClick']>,
      required: false,
      default: undefined as any
    },
    onPaneScroll: {
      type: Function() as PropType<GraphViewProps['onPaneScroll']>,
      required: false,
      default: undefined as any
    },
    onPaneContextMenu: {
      type: Function() as PropType<GraphViewProps['onPaneContextMenu']>,
      required: false,
      default: undefined as any
    },
    onEdgeUpdate: {
      type: Function() as PropType<GraphViewProps['onEdgeUpdate']>,
      required: false,
      default: undefined as any
    },
    onEdgeMouseEnter: {
      type: Function() as PropType<GraphViewProps['onEdgeMouseEnter']>,
      required: false,
      default: undefined as any
    },
    onEdgeContextMenu: {
      type: Function() as PropType<GraphViewProps['onEdgeContextMenu']>,
      required: false,
      default: undefined as any
    },
    onEdgeMouseMove: {
      type: Function() as PropType<GraphViewProps['onEdgeMouseMove']>,
      required: false,
      default: undefined as any
    },
    onEdgeMouseLeave: {
      type: Function() as PropType<GraphViewProps['onEdgeMouseLeave']>,
      required: false,
      default: undefined as any
    },
    onEdgeUpdateEnd: {
      type: Function() as PropType<GraphViewProps['onEdgeUpdateEnd']>,
      required: false,
      default: undefined as any
    },
    onEdgeUpdateStart: {
      type: Function() as PropType<GraphViewProps['onEdgeUpdateStart']>,
      required: false,
      default: undefined as any
    },
    edgeUpdaterRadius: {
      type: Number as PropType<GraphViewProps['edgeUpdaterRadius']>,
      required: false,
      default: undefined
    }
  },
  setup(props) {
    const pinia = store();
    const isInitialized = ref<boolean>(false);

    onMounted(() => {
      const { zoomIn, zoomOut, zoomTo, transform, fitView, initialized } = useZoomPanHelper();

      if (!isInitialized.value && initialized) {
        if (props.onLoad) {
          props.onLoad({
            fitView: (params = { padding: 0.1 }) => fitView(params),
            zoomIn,
            zoomOut,
            zoomTo,
            setTransform: transform,
            project: onLoadProject(pinia),
            getElements: onLoadGetElements(pinia),
            toObject: onLoadToObject(pinia)
          });
        }
        isInitialized.value = true;
      }
    });

    onBeforeMount(() => {
      if (props.onConnect) {
        pinia.setOnConnect(props.onConnect);
      }

      if (props.onConnectStart) {
        pinia.setOnConnectStart(props.onConnectStart);
      }

      if (props.onConnectStop) {
        pinia.setOnConnectStop(props.onConnectStop);
      }

      if (props.onConnectEnd) {
        pinia.setOnConnectEnd(props.onConnectEnd);
      }

      if (typeof props.snapToGrid !== 'undefined') {
        pinia.setSnapToGrid(props.snapToGrid);
      }

      if (typeof props.snapGrid !== 'undefined') {
        pinia.setSnapGrid(props.snapGrid);
      }

      if (typeof props.nodesDraggable !== 'undefined') {
        pinia.setNodesDraggable(!!props.nodesDraggable);
      }

      if (typeof props.nodesConnectable !== 'undefined') {
        pinia.setNodesConnectable(!!props.nodesConnectable);
      }

      if (typeof props.elementsSelectable !== 'undefined') {
        pinia.setElementsSelectable(!!props.elementsSelectable);
      }

      if (typeof props.minZoom !== 'undefined') {
        pinia.setMinZoom(props.minZoom as any);
      }

      if (typeof props.maxZoom !== 'undefined') {
        pinia.setMaxZoom(props.maxZoom as any);
      }

      if (typeof props.translateExtent !== 'undefined') {
        pinia.setTranslateExtent(props.translateExtent as any);
      }

      if (typeof props.nodeExtent !== 'undefined') {
        pinia.setNodeExtent(props.nodeExtent as any);
      }
    });

    onMounted(() => {
      if (typeof props.nodesConnectable !== 'undefined') {
        pinia.setNodesConnectable(!!props.nodesConnectable);
      }
    });

    onMounted(() => {
      if (typeof props.elementsSelectable !== 'undefined') {
        pinia.setElementsSelectable(!!props.elementsSelectable);
      }

      if (typeof props.connectionMode !== 'undefined') {
        pinia.setConnectionMode(props.connectionMode as any);
      }
    });

    return () => (
      <FlowRenderer
        onPaneClick={props.onPaneClick}
        onPaneContextMenu={props.onPaneContextMenu}
        onPaneScroll={props.onPaneScroll}
        onElementsRemove={props.onElementsRemove}
        deleteKeyCode={props.deleteKeyCode as any}
        selectionKeyCode={props.selectionKeyCode as any}
        multiSelectionKeyCode={props.multiSelectionKeyCode as any}
        zoomActivationKeyCode={props.zoomActivationKeyCode as any}
        elementsSelectable={props.elementsSelectable}
        onMove={props.onMove}
        onMoveStart={props.onMoveStart}
        onMoveEnd={props.onMoveEnd}
        zoomOnScroll={props.zoomOnScroll}
        zoomOnPinch={props.zoomOnPinch}
        zoomOnDoubleClick={props.zoomOnDoubleClick}
        panOnScroll={props.panOnScroll}
        panOnScrollSpeed={props.panOnScrollSpeed}
        panOnScrollMode={props.panOnScrollMode}
        paneMoveable={props.paneMoveable}
        defaultPosition={props.defaultPosition as any}
        defaultZoom={props.defaultZoom as any}
        translateExtent={props.translateExtent}
        /*
        onSelectionDragStart={props.onSelectionDragStart}
        onSelectionDrag={props.onSelectionDrag}
        onSelectionDragStop={props.onSelectionDragStop}
         */
        onSelectionContextMenu={props.onSelectionContextMenu}
      >
        <NodeRenderer
          nodeTypes={props.nodeTypes}
          onElementClick={props.onElementClick}
          onNodeDoubleClick={props.onNodeDoubleClick}
          onNodeMouseEnter={props.onNodeMouseEnter}
          onNodeMouseMove={props.onNodeMouseMove}
          onNodeMouseLeave={props.onNodeMouseLeave}
          onNodeContextMenu={props.onNodeContextMenu}
          onNodeDragStop={props.onNodeDragStop}
          onNodeDrag={props.onNodeDrag}
          onNodeDragStart={props.onNodeDragStart}
          selectNodesOnDrag={props.selectNodesOnDrag}
          snapToGrid={props.snapToGrid}
          snapGrid={props.snapGrid}
          onlyRenderVisibleElements={props.onlyRenderVisibleElements}
        />
        <EdgeRenderer
          edgeTypes={props.edgeTypes}
          onElementClick={props.onElementClick}
          onEdgeDoubleClick={props.onEdgeDoubleClick}
          connectionLineType={props.connectionLineType}
          connectionLineStyle={props.connectionLineStyle}
          connectionLineComponent={props.connectionLineComponent}
          connectionMode={props.connectionMode}
          arrowHeadColor={props.arrowHeadColor}
          markerEndId={props.markerEndId}
          onEdgeUpdate={props.onEdgeUpdate}
          onlyRenderVisibleElements={props.onlyRenderVisibleElements}
          onEdgeContextMenu={props.onEdgeContextMenu}
          onEdgeMouseEnter={props.onEdgeMouseEnter}
          onEdgeMouseMove={props.onEdgeMouseMove}
          onEdgeMouseLeave={props.onEdgeMouseLeave}
          onEdgeUpdateStart={props.onEdgeUpdateStart}
          onEdgeUpdateEnd={props.onEdgeUpdateEnd}
          edgeUpdaterRadius={props.edgeUpdaterRadius}
        />
      </FlowRenderer>
    );
  }
});

export default GraphView;
