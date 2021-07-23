<template>
  <div class="revue-flow">
    <GraphView
      :onLoad="onLoad"
      :onMove="onMove"
      :onMoveStart="onMoveStart"
      :onMoveEnd="onMoveEnd"
      :onElementClick="onElementClick"
      :onNodeMouseEnter="onNodeMouseEnter"
      :onNodeMouseMove="onNodeMouseMove"
      :onNodeMouseLeave="onNodeMouseLeave"
      :onNodeContextMenu="onNodeContextMenu"
      :onNodeDoubleClick="onNodeDoubleClick"
      :onNodeDragStart="onNodeDragStart"
      :onNodeDrag="onNodeDrag"
      :onNodeDragStop="onNodeDragStop"
      :nodeTypes="nodeTypesParsed"
      :edgeTypes="edgeTypesParsed"
      :connectionMode="connectionMode"
      :connectionLineType="connectionLineType"
      :connectionLineStyle="connectionLineStyle"
      :connectionLineComponent="connectionLineComponent"
      :selectionKeyCode="selectionKeyCode"
      :onElementsRemove="onElementsRemove"
      :deleteKeyCode="deleteKeyCode"
      :multiSelectionKeyCode="multiSelectionKeyCode"
      :zoomActivationKeyCode="zoomActivationKeyCode"
      :onConnect="onConnect"
      :onConnectStart="onConnectStart"
      :onConnectStop="onConnectStop"
      :onConnectEnd="onConnectEnd"
      :snapToGrid="snapToGrid"
      :snapGrid="snapGrid"
      :onlyRenderVisibleElements="onlyRenderVisibleElements"
      :nodesDraggable="nodesDraggable"
      :nodesConnectable="nodesConnectable"
      :elementsSelectable="elementsSelectable"
      :selectNodesOnDrag="selectNodesOnDrag"
      :minZoom="minZoom"
      :maxZoom="maxZoom"
      :defaultZoom="defaultZoom"
      :defaultPosition="defaultPosition"
      :translateExtent="translateExtent"
      :nodeExtent="nodeExtent"
      :arrowHeadColor="arrowHeadColor"
      :markerEndId="markerEndId"
      :zoomOnScroll="zoomOnScroll"
      :zoomOnPinch="zoomOnPinch"
      :zoomOnDoubleClick="zoomOnDoubleClick"
      :panOnScroll="panOnScroll"
      :panOnScrollSpeed="panOnScrollSpeed"
      :panOnScrollMode="panOnScrollMode"
      :paneMoveable="paneMoveable"
      :onPaneClick="onPaneClick"
      :onPaneScroll="onPaneScroll"
      :onPaneContextMenu="onPaneContextMenu"
      :onSelectionDragStart="onSelectionDragStart"
      :onSelectionDrag="onSelectionDrag"
      :onSelectionDragStop="onSelectionDragStop"
      :onSelectionContextMenu="onSelectionContextMenu"
      :onEdgeUpdate="onEdgeUpdate"
      :onEdgeContextMenu="onEdgeContextMenu"
      :onEdgeDoubleClick="onEdgeDoubleClick"
      :onEdgeMouseEnter="onEdgeMouseEnter"
      :onEdgeMouseMove="onEdgeMouseMove"
      :onEdgeMouseLeave="onEdgeMouseLeave"
      :onEdgeUpdateStart="onEdgeUpdateStart"
      :onEdgeUpdateEnd="onEdgeUpdateEnd"
      :edgeUpdaterRadius="edgeUpdaterRadius"
    />
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onUpdated, PropType, provide, watch } from 'vue';
import { useVModel } from '@vueuse/core';
import '../../style.css';
import '../../theme-default.css';
import GraphView from '../GraphView/GraphView.vue';
import DefaultNode from '../../components/Nodes/DefaultNode';
import InputNode from '../../components/Nodes/InputNode';
import OutputNode from '../../components/Nodes/OutputNode';
import { createNodeTypes } from '../NodeRenderer/utils';
import { BezierEdge, StepEdge, SmoothStepEdge, StraightEdge } from '../../components/Edges';
import { createEdgeTypes } from '../EdgeRenderer/utils';
import { ConnectionMode, ConnectionLineType, PanOnScrollMode, RevueFlowStore, RevueFlowProps } from '../../types';
import { initialState } from '../../store';
import configureStore from '../../store/configure-store';
import { RevueFlowHooks, useRevueFlow } from '../../hooks/RevueFlowHooks';

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

const RevueFlow = defineComponent({
  name: 'RevueFlow',
  components: { GraphView },
  props: {
    modelValue: {
      type: Array as PropType<RevueFlowProps['elements']>,
      required: false,
      default: () => []
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
    }
  },
  emits: ['', 'load'],
  setup(props, { emit }) {
    const store = configureStore(initialState)();
    provide<RevueFlowStore>('store', store);
    provide<RevueFlowHooks>('hooks', useRevueFlow(emit));
    const elements = useVModel(props, 'modelValue', emit);

    store.setElements(elements.value);
    watch(elements.value, () => {
      store.setElements(elements.value);
    });

    onUpdated(() => {
      console.log('updated');
      store.setElements(elements.value);
    });

    onBeforeUnmount(() => {
      store.$reset();
      store.setElements([]);
    });

    const nodeTypesParsed = computed(() => props.nodeTypes && createNodeTypes({ ...defaultNodeTypes, ...props.nodeTypes }));
    const edgeTypesParsed = computed(() => props.edgeTypes && createEdgeTypes({ ...defaultEdgeTypes, ...props.edgeTypes }));

    return {
      nodeTypesParsed: nodeTypesParsed.value,
      edgeTypesParsed: edgeTypesParsed.value
    };
  }
});
export default RevueFlow;
</script>
