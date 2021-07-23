<template>
  <FlowRenderer
    :onPaneClick="onPaneClick"
    :onPaneContextMenu="onPaneContextMenu"
    :onPaneScroll="onPaneScroll"
    :onElementsRemove="onElementsRemove"
    :deleteKeyCode="deleteKeyCode"
    :selectionKeyCode="selectionKeyCode"
    :multiSelectionKeyCode="multiSelectionKeyCode"
    :zoomActivationKeyCode="zoomActivationKeyCode"
    :elementsSelectable="elementsSelectable"
    :onMove="onMove"
    :onMoveStart="onMoveStart"
    :onMoveEnd="onMoveEnd"
    :zoomOnScroll="zoomOnScroll"
    :zoomOnPinch="zoomOnPinch"
    :zoomOnDoubleClick="zoomOnDoubleClick"
    :panOnScroll="panOnScroll"
    :panOnScrollSpeed="panOnScrollSpeed"
    :panOnScrollMode="panOnScrollMode"
    :paneMoveable="paneMoveable"
    :defaultPosition="defaultPosition"
    :defaultZoom="defaultZoom"
    :translateExtent="translateExtent"
    :onSelectionDragStart="onSelectionDragStart"
    :onSelectionDrag="onSelectionDrag"
    :onSelectionDragStop="onSelectionDragStop"
    :onSelectionContextMenu="onSelectionContextMenu"
  >
    <NodeRenderer
      :nodeTypes="nodeTypes"
      :onElementClick="onElementClick"
      :onNodeDoubleClick="onNodeDoubleClick"
      :onNodeMouseEnter="onNodeMouseEnter"
      :onNodeMouseMove="onNodeMouseMove"
      :onNodeMouseLeave="onNodeMouseLeave"
      :onNodeContextMenu="onNodeContextMenu"
      :onNodeDragStop="onNodeDragStop"
      :onNodeDrag="onNodeDrag"
      :onNodeDragStart="onNodeDragStart"
      :selectNodesOnDrag="selectNodesOnDrag"
      :snapToGrid="snapToGrid"
      :snapGrid="snapGrid"
      :onlyRenderVisibleElements="onlyRenderVisibleElements"
    />
    <EdgeRenderer
      :edgeTypes="edgeTypes"
      :onElementClick="onElementClick"
      :onEdgeDoubleClick="onEdgeDoubleClick"
      :connectionLineType="connectionLineType"
      :connectionLineStyle="connectionLineStyle"
      :connectionLineComponent="connectionLineComponent"
      :connectionMode="connectionMode"
      :arrowHeadColor="arrowHeadColor"
      :markerEndId="markerEndId"
      :onEdgeUpdate="onEdgeUpdate"
      :onlyRenderVisibleElements="onlyRenderVisibleElements"
      :onEdgeContextMenu="onEdgeContextMenu"
      :onEdgeMouseEnter="onEdgeMouseEnter"
      :onEdgeMouseMove="onEdgeMouseMove"
      :onEdgeMouseLeave="onEdgeMouseLeave"
      :onEdgeUpdateStart="onEdgeUpdateStart"
      :onEdgeUpdateEnd="onEdgeUpdateEnd"
      :edgeUpdaterRadius="edgeUpdaterRadius"
    />
  </FlowRenderer>
</template>
<script lang="ts">
import { defineComponent, inject, PropType, CSSProperties, watchEffect } from 'vue';
import FlowRenderer from '../FlowRenderer/FlowRenderer.vue';
import NodeRenderer from '../NodeRenderer';
import EdgeRenderer from '../EdgeRenderer';
import { onLoadProject, onLoadGetElements, onLoadToObject } from '../../utils/graph';
import { GraphViewProps, RevueFlowStore } from '../../types';
import useZoomPanHelper from '../../hooks/useZoomPanHelper';
import { RevueFlowHooks } from '../../hooks/RevueFlowHooks';

const GraphView = defineComponent({
  name: 'GraphView',
  components: { NodeRenderer, EdgeRenderer, FlowRenderer },
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
      default: undefined
    },
    onMoveStart: {
      type: Function as unknown as PropType<GraphViewProps['onMoveStart']>,
      required: false,
      default: undefined
    },
    onMoveEnd: {
      type: Function as unknown as PropType<GraphViewProps['onMoveEnd']>,
      required: false,
      default: undefined
    },
    onLoad: {
      type: Function as unknown as PropType<GraphViewProps['onLoad']>,
      required: false,
      default: undefined
    },
    onElementClick: {
      type: Function as unknown as PropType<GraphViewProps['onElementClick']>,
      required: false,
      default: undefined
    },
    onNodeDoubleClick: {
      type: Function as unknown as PropType<GraphViewProps['onNodeDoubleClick']>,
      required: false,
      default: undefined
    },
    onEdgeDoubleClick: {
      type: Function as unknown as PropType<GraphViewProps['onEdgeDoubleClick']>,
      required: false,
      default: undefined
    },
    onNodeMouseEnter: {
      type: Function as unknown as PropType<GraphViewProps['onNodeMouseEnter']>,
      required: false,
      default: undefined
    },
    onNodeMouseMove: {
      type: Function as unknown as PropType<GraphViewProps['onNodeMouseMove']>,
      required: false,
      default: undefined
    },
    onNodeMouseLeave: {
      type: Function as unknown as PropType<GraphViewProps['onNodeMouseLeave']>,
      required: false,
      default: undefined
    },
    onNodeContextMenu: {
      type: Function as unknown as PropType<GraphViewProps['onNodeContextMenu']>,
      required: false,
      default: undefined
    },
    onNodeDragStart: {
      type: Function as unknown as PropType<GraphViewProps['onNodeDragStart']>,
      required: false,
      default: undefined
    },
    onNodeDrag: {
      type: Function as unknown as PropType<GraphViewProps['onNodeDrag']>,
      required: false,
      default: undefined
    },
    onNodeDragStop: {
      type: Function as unknown as PropType<GraphViewProps['onNodeDragStop']>,
      required: false,
      default: undefined
    },
    onSelectionContextMenu: {
      type: Function as unknown as PropType<GraphViewProps['onSelectionContextMenu']>,
      required: false,
      default: undefined
    },
    onElementsRemove: {
      type: Function as unknown as PropType<GraphViewProps['onElementsRemove']>,
      required: false,
      default: undefined
    },
    onConnect: {
      type: Function as unknown as PropType<GraphViewProps['onConnect']>,
      required: false,
      default: undefined
    },
    onConnectStart: {
      type: Function as unknown as PropType<GraphViewProps['onConnectStart']>,
      required: false,
      default: undefined
    },
    onConnectStop: {
      type: Function as unknown as PropType<GraphViewProps['onConnectStop']>,
      required: false,
      default: undefined
    },
    onConnectEnd: {
      type: Function as unknown as PropType<GraphViewProps['onConnectEnd']>,
      required: false,
      default: undefined
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
    onPaneClick: {
      type: Function as unknown as PropType<GraphViewProps['onPaneClick']>,
      required: false,
      default: undefined
    },
    onPaneScroll: {
      type: Function as unknown as PropType<GraphViewProps['onPaneScroll']>,
      required: false,
      default: undefined
    },
    onPaneContextMenu: {
      type: Function as unknown as PropType<GraphViewProps['onPaneContextMenu']>,
      required: false,
      default: undefined
    },
    onEdgeUpdate: {
      type: Function as unknown as PropType<GraphViewProps['onEdgeUpdate']>,
      required: false,
      default: undefined
    },
    onEdgeMouseEnter: {
      type: Function as unknown as PropType<GraphViewProps['onEdgeMouseEnter']>,
      required: false,
      default: undefined
    },
    onEdgeContextMenu: {
      type: Function as unknown as PropType<GraphViewProps['onEdgeContextMenu']>,
      required: false,
      default: undefined
    },
    onEdgeMouseMove: {
      type: Function as unknown as PropType<GraphViewProps['onEdgeMouseMove']>,
      required: false,
      default: undefined
    },
    onEdgeMouseLeave: {
      type: Function as unknown as PropType<GraphViewProps['onEdgeMouseLeave']>,
      required: false,
      default: undefined
    },
    onEdgeUpdateEnd: {
      type: Function as unknown as PropType<GraphViewProps['onEdgeUpdateEnd']>,
      required: false,
      default: undefined
    },
    onEdgeUpdateStart: {
      type: Function as unknown as PropType<GraphViewProps['onEdgeUpdateStart']>,
      required: false,
      default: undefined
    },
    onSelectionDragStart: {
      type: Function as unknown as PropType<GraphViewProps['onSelectionDragStart']>,
      required: false,
      default: undefined
    },
    onSelectionDrag: {
      type: Function as unknown as PropType<GraphViewProps['onSelectionDrag']>,
      required: false,
      default: undefined
    },
    onSelectionDragStop: {
      type: Function as unknown as PropType<GraphViewProps['onSelectionDragStop']>,
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

    const { onReady } = useZoomPanHelper(store);
    onReady(({ zoomIn, zoomOut, zoomTo, transform, fitView, initialized }) => {
      if (initialized) {
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
      }
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
  }
});

export default GraphView;
</script>
