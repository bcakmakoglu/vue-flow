import { defineComponent, inject, PropType, watchEffect } from 'vue';
import FlowRenderer from '../FlowRenderer';
import NodeRenderer from '../NodeRenderer';
import EdgeRenderer from '../EdgeRenderer';
import { onLoadProject, onLoadGetElements, onLoadToObject } from '../../utils/graph';
import { GraphViewProps, RevueFlowStore } from '../../types';
import useZoomPanHelper from '../../hooks/useZoomPanHelper';
import { RevueFlowHooks } from '../../hooks/RevueFlowHooks';

export default defineComponent({
  name: 'GraphView',
  components: { NodeRenderer, EdgeRenderer, FlowRenderer },
  props: {
    nodeTypes: {
      type: Object as PropType<GraphViewProps['nodeTypes']>,
      required: true
    },
    edgeTypes: {
      type: Object as PropType<GraphViewProps['edgeTypes']>,
      required: true
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
      default: () => {}
    },
    connectionLineComponent: {
      type: Object as PropType<GraphViewProps['connectionLineComponent']>,
      required: false,
      default: undefined
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
    edgeUpdaterRadius: {
      type: Number as PropType<GraphViewProps['edgeUpdaterRadius']>,
      required: false,
      default: undefined
    }
  },
  setup(props) {
    const store = inject<RevueFlowStore>('store')!;
    const hooks = inject<RevueFlowHooks>('hooks')!;

    const { onReady } = useZoomPanHelper();
    onReady(({ zoomIn, zoomOut, zoomTo, transform, fitView }) => {
      hooks.load.trigger({
        fitView: (params = { padding: 0.1 }) => fitView(params),
        zoomIn,
        zoomOut,
        zoomTo,
        setTransform: transform,
        project: onLoadProject(store),
        getElements: onLoadGetElements(store),
        toObject: onLoadToObject(store)
      });
    });

    const init = () => {
      if (typeof props.snapToGrid !== 'undefined') {
        store.snapToGrid = props.snapToGrid;
      }

      if (typeof props.snapGrid !== 'undefined') {
        store.snapGrid = props.snapGrid;
      }

      if (typeof props.minZoom !== 'undefined') {
        store.setMinZoom(props.minZoom);
      }

      if (typeof props.maxZoom !== 'undefined') {
        store.setMaxZoom(props.maxZoom);
      }

      if (typeof props.translateExtent !== 'undefined') {
        store.setTranslateExtent(props.translateExtent);
      }

      if (typeof props.nodeExtent !== 'undefined') {
        store.setNodeExtent(props.nodeExtent);
      }

      if (typeof props.nodesConnectable !== 'undefined') {
        store.nodesConnectable = !!props.nodesConnectable;
      }
      if (typeof props.elementsSelectable !== 'undefined') {
        store.elementsSelectable = !!props.elementsSelectable;
      }
      if (typeof props.nodesDraggable !== 'undefined') {
        store.nodesDraggable = !!props.nodesDraggable;
      }

      if (typeof props.connectionMode !== 'undefined') {
        store.connectionMode = props.connectionMode;
      }
    };

    watchEffect(() => {
      init();
    });

    return () => (
      <FlowRenderer
        deleteKeyCode={props.deleteKeyCode}
        selectionKeyCode={props.selectionKeyCode}
        multiSelectionKeyCode={props.multiSelectionKeyCode}
        zoomActivationKeyCode={props.zoomActivationKeyCode}
        elementsSelectable={props.elementsSelectable}
        zoomOnScroll={props.zoomOnScroll}
        zoomOnPinch={props.zoomOnPinch}
        zoomOnDoubleClick={props.zoomOnDoubleClick}
        panOnScroll={props.panOnScroll}
        panOnScrollSpeed={props.panOnScrollSpeed}
        panOnScrollMode={props.panOnScrollMode}
        paneMoveable={props.paneMoveable}
        defaultPosition={props.defaultPosition}
        defaultZoom={props.defaultZoom}
        translateExtent={props.translateExtent}
      >
        <NodeRenderer
          nodeTypes={props.nodeTypes}
          selectNodesOnDrag={props.selectNodesOnDrag}
          snapToGrid={props.snapToGrid}
          snapGrid={props.snapGrid}
          onlyRenderVisibleElements={props.onlyRenderVisibleElements}
        />
        <EdgeRenderer
          edgeTypes={props.edgeTypes}
          connectionLineType={props.connectionLineType}
          connectionLineStyle={props.connectionLineStyle}
          connectionLineComponent={props.connectionLineComponent}
          connectionMode={props.connectionMode}
          arrowHeadColor={props.arrowHeadColor}
          markerEndId={props.markerEndId}
          onlyRenderVisibleElements={props.onlyRenderVisibleElements}
          edgeUpdaterRadius={props.edgeUpdaterRadius}
        />
      </FlowRenderer>
    );
  }
});
