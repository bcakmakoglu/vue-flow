import { defineComponent, inject, onBeforeMount, onMounted, ref, reactive, PropType, CSSProperties } from 'vue';
import FlowRenderer from '../FlowRenderer';
import NodeRenderer from '../NodeRenderer';
import EdgeRenderer from '../EdgeRenderer';
import { onLoadProject, onLoadGetElements, onLoadToObject } from '../../utils/graph';
import { RevueFlowProps } from '../RevueFlow';
import { NodeTypesType, EdgeTypesType, ConnectionLineType, KeyCode, RevueFlowStore } from '../../types';
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
      type: Function as unknown as PropType<GraphViewProps['onMove']>,
      required: false,
      default: undefined as any
    },
    onMoveStart: {
      type: Function as unknown as PropType<GraphViewProps['onMoveStart']>,
      required: false,
      default: undefined as any
    },
    onMoveEnd: {
      type: Function as unknown as PropType<GraphViewProps['onMoveEnd']>,
      required: false,
      default: undefined as any
    },
    onLoad: {
      type: Function as unknown as PropType<GraphViewProps['onLoad']>,
      required: false,
      default: undefined as any
    },
    onElementClick: {
      type: Function as unknown as PropType<GraphViewProps['onElementClick']>,
      required: false,
      default: undefined as any
    },
    onNodeDoubleClick: {
      type: Function as unknown as PropType<GraphViewProps['onNodeDoubleClick']>,
      required: false,
      default: undefined as any
    },
    onEdgeDoubleClick: {
      type: Function as unknown as PropType<GraphViewProps['onEdgeDoubleClick']>,
      required: false,
      default: undefined as any
    },
    onNodeMouseEnter: {
      type: Function as unknown as PropType<GraphViewProps['onNodeMouseEnter']>,
      required: false,
      default: undefined as any
    },
    onNodeMouseMove: {
      type: Function as unknown as PropType<GraphViewProps['onNodeMouseMove']>,
      required: false,
      default: undefined as any
    },
    onNodeMouseLeave: {
      type: Function as unknown as PropType<GraphViewProps['onNodeMouseLeave']>,
      required: false,
      default: undefined as any
    },
    onNodeContextMenu: {
      type: Function as unknown as PropType<GraphViewProps['onNodeContextMenu']>,
      required: false,
      default: undefined as any
    },
    onNodeDragStart: {
      type: Function as unknown as PropType<GraphViewProps['onNodeDragStart']>,
      required: false,
      default: undefined as any
    },
    onNodeDrag: {
      type: Function as unknown as PropType<GraphViewProps['onNodeDrag']>,
      required: false,
      default: undefined as any
    },
    onNodeDragStop: {
      type: Function as unknown as PropType<GraphViewProps['onNodeDragStop']>,
      required: false,
      default: undefined as any
    },
    onSelectionContextMenu: {
      type: Function as unknown as PropType<GraphViewProps['onSelectionContextMenu']>,
      required: false,
      default: undefined as any
    },
    onElementsRemove: {
      type: Function as unknown as PropType<GraphViewProps['onElementsRemove']>,
      required: false,
      default: undefined as any
    },
    onConnect: {
      type: Function as unknown as PropType<GraphViewProps['onConnect']>,
      required: false,
      default: undefined as any
    },
    onConnectStart: {
      type: Function as unknown as PropType<GraphViewProps['onConnectStart']>,
      required: false,
      default: undefined as any
    },
    onConnectStop: {
      type: Function as unknown as PropType<GraphViewProps['onConnectStop']>,
      required: false,
      default: undefined as any
    },
    onConnectEnd: {
      type: Function as unknown as PropType<GraphViewProps['onConnectEnd']>,
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
      type: Function as unknown as PropType<GraphViewProps['onPaneClick']>,
      required: false,
      default: undefined as any
    },
    onPaneScroll: {
      type: Function as unknown as PropType<GraphViewProps['onPaneScroll']>,
      required: false,
      default: undefined as any
    },
    onPaneContextMenu: {
      type: Function as unknown as PropType<GraphViewProps['onPaneContextMenu']>,
      required: false,
      default: undefined as any
    },
    onEdgeUpdate: {
      type: Function as unknown as PropType<GraphViewProps['onEdgeUpdate']>,
      required: false,
      default: undefined as any
    },
    onEdgeMouseEnter: {
      type: Function as unknown as PropType<GraphViewProps['onEdgeMouseEnter']>,
      required: false,
      default: undefined as any
    },
    onEdgeContextMenu: {
      type: Function as unknown as PropType<GraphViewProps['onEdgeContextMenu']>,
      required: false,
      default: undefined as any
    },
    onEdgeMouseMove: {
      type: Function as unknown as PropType<GraphViewProps['onEdgeMouseMove']>,
      required: false,
      default: undefined as any
    },
    onEdgeMouseLeave: {
      type: Function as unknown as PropType<GraphViewProps['onEdgeMouseLeave']>,
      required: false,
      default: undefined as any
    },
    onEdgeUpdateEnd: {
      type: Function as unknown as PropType<GraphViewProps['onEdgeUpdateEnd']>,
      required: false,
      default: undefined as any
    },
    onEdgeUpdateStart: {
      type: Function as unknown as PropType<GraphViewProps['onEdgeUpdateStart']>,
      required: false,
      default: undefined as any
    },
    onSelectionDragStart: {
      type: Function as unknown as PropType<GraphViewProps['onSelectionDragStart']>,
      required: false,
      default: undefined as any
    },
    onSelectionDrag: {
      type: Function as unknown as PropType<GraphViewProps['onSelectionDrag']>,
      required: false,
      default: undefined as any
    },
    onSelectionDragStop: {
      type: Function as unknown as PropType<GraphViewProps['onSelectionDragStop']>,
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
    const {
      nodeTypes,
      edgeTypes,
      onMove,
      onMoveStart,
      onMoveEnd,
      onLoad,
      onElementClick,
      onNodeDoubleClick,
      onEdgeDoubleClick,
      onNodeMouseEnter,
      onNodeMouseMove,
      onNodeMouseLeave,
      onNodeContextMenu,
      onNodeDragStart,
      onNodeDrag,
      onNodeDragStop,
      onSelectionDragStart,
      onSelectionDrag,
      onSelectionDragStop,
      onSelectionContextMenu,
      connectionMode,
      connectionLineType,
      connectionLineStyle,
      connectionLineComponent,
      selectionKeyCode,
      multiSelectionKeyCode,
      zoomActivationKeyCode,
      onElementsRemove,
      deleteKeyCode,
      onConnect,
      onConnectStart,
      onConnectStop,
      onConnectEnd,
      snapToGrid,
      snapGrid,
      onlyRenderVisibleElements,
      nodesDraggable,
      nodesConnectable,
      elementsSelectable,
      selectNodesOnDrag,
      minZoom,
      maxZoom,
      defaultZoom,
      defaultPosition,
      translateExtent,
      nodeExtent,
      arrowHeadColor,
      markerEndId,
      zoomOnScroll,
      zoomOnPinch,
      panOnScroll,
      panOnScrollSpeed,
      panOnScrollMode,
      zoomOnDoubleClick,
      paneMoveable,
      onPaneClick,
      onPaneScroll,
      onPaneContextMenu,
      onEdgeUpdate,
      onEdgeContextMenu,
      onEdgeMouseEnter,
      onEdgeMouseMove,
      onEdgeMouseLeave,
      edgeUpdaterRadius,
      onEdgeUpdateStart,
      onEdgeUpdateEnd
    } = reactive(props);
    const store = inject<RevueFlowStore>('store');
    const isInitialized = ref<boolean>(false);

    onMounted(() => {
      const { zoomIn, zoomOut, zoomTo, transform, fitView, initialized } = useZoomPanHelper();

      if (!isInitialized.value && initialized) {
        if (onLoad && store) {
          onLoad({
            fitView: (params = { padding: 0.1 }) => fitView(params),
            zoomIn,
            zoomOut,
            zoomTo,
            setTransform: transform,
            project: onLoadProject(store),
            getElements: onLoadGetElements(store),
            toObject: onLoadToObject(store)
          });
        }
        isInitialized.value = true;
      }
    });

    onBeforeMount(() => {
      if (onConnect) {
        store?.setOnConnect(onConnect);
      }

      if (onConnectStart) {
        store?.setOnConnectStart(onConnectStart);
      }

      if (onConnectStop) {
        store?.setOnConnectStop(onConnectStop);
      }

      if (onConnectEnd) {
        store?.setOnConnectEnd(onConnectEnd);
      }

      if (typeof snapToGrid !== 'undefined') {
        store?.setSnapToGrid(snapToGrid);
      }

      if (typeof snapGrid !== 'undefined') {
        store?.setSnapGrid(snapGrid);
      }

      if (typeof nodesDraggable !== 'undefined') {
        store?.setNodesDraggable(!!nodesDraggable);
      }

      if (typeof nodesConnectable !== 'undefined') {
        store?.setNodesConnectable(!!nodesConnectable);
      }

      if (typeof elementsSelectable !== 'undefined') {
        store?.setElementsSelectable(!!elementsSelectable);
      }

      if (typeof minZoom !== 'undefined') {
        store?.setMinZoom(minZoom);
      }

      if (typeof maxZoom !== 'undefined') {
        store?.setMaxZoom(maxZoom);
      }

      if (typeof translateExtent !== 'undefined') {
        store?.setTranslateExtent(translateExtent);
      }

      if (typeof nodeExtent !== 'undefined') {
        store?.setNodeExtent(nodeExtent);
      }
    });

    onMounted(() => {
      if (typeof nodesConnectable !== 'undefined') {
        store?.setNodesConnectable(!!nodesConnectable);
      }
    });

    onMounted(() => {
      if (typeof elementsSelectable !== 'undefined') {
        store?.setElementsSelectable(!!elementsSelectable);
      }

      if (typeof connectionMode !== 'undefined') {
        store?.setConnectionMode(connectionMode);
      }
    });

    return () => (
      <FlowRenderer
        onPaneClick={onPaneClick}
        onPaneContextMenu={onPaneContextMenu}
        onPaneScroll={onPaneScroll}
        onElementsRemove={onElementsRemove}
        deleteKeyCode={deleteKeyCode}
        selectionKeyCode={selectionKeyCode}
        multiSelectionKeyCode={multiSelectionKeyCode}
        zoomActivationKeyCode={zoomActivationKeyCode}
        elementsSelectable={elementsSelectable}
        onMove={onMove}
        onMoveStart={onMoveStart}
        onMoveEnd={onMoveEnd}
        zoomOnScroll={zoomOnScroll}
        zoomOnPinch={zoomOnPinch}
        zoomOnDoubleClick={zoomOnDoubleClick}
        panOnScroll={panOnScroll}
        panOnScrollSpeed={panOnScrollSpeed}
        panOnScrollMode={panOnScrollMode}
        paneMoveable={paneMoveable}
        defaultPosition={defaultPosition}
        defaultZoom={defaultZoom}
        translateExtent={translateExtent}
        onSelectionDragStart={onSelectionDragStart}
        onSelectionDrag={onSelectionDrag}
        onSelectionDragStop={onSelectionDragStop}
        onSelectionContextMenu={onSelectionContextMenu}
      >
        <NodeRenderer
          nodeTypes={nodeTypes}
          onElementClick={onElementClick}
          onNodeDoubleClick={onNodeDoubleClick}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseMove={onNodeMouseMove}
          onNodeMouseLeave={onNodeMouseLeave}
          onNodeContextMenu={onNodeContextMenu}
          onNodeDragStop={onNodeDragStop}
          onNodeDrag={onNodeDrag}
          onNodeDragStart={onNodeDragStart}
          selectNodesOnDrag={selectNodesOnDrag}
          snapToGrid={snapToGrid}
          snapGrid={snapGrid}
          onlyRenderVisibleElements={onlyRenderVisibleElements}
        />
        <EdgeRenderer
          edgeTypes={edgeTypes}
          onElementClick={onElementClick}
          onEdgeDoubleClick={onEdgeDoubleClick}
          connectionLineType={connectionLineType}
          connectionLineStyle={connectionLineStyle}
          connectionLineComponent={connectionLineComponent}
          connectionMode={connectionMode}
          arrowHeadColor={arrowHeadColor}
          markerEndId={markerEndId}
          onEdgeUpdate={onEdgeUpdate}
          onlyRenderVisibleElements={onlyRenderVisibleElements}
          onEdgeContextMenu={onEdgeContextMenu}
          onEdgeMouseEnter={onEdgeMouseEnter}
          onEdgeMouseMove={onEdgeMouseMove}
          onEdgeMouseLeave={onEdgeMouseLeave}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          edgeUpdaterRadius={edgeUpdaterRadius}
        />
      </FlowRenderer>
    );
  }
});

export default GraphView;
