<template>
  <div class="revue-flow">
    <GraphView
      :node-types="nodeTypesParsed"
      :edge-types="edgeTypesParsed"
      :connection-mode="connectionMode"
      :connection-line-type="connectionLineType"
      :connection-line-style="connectionLineStyle"
      :connection-line-component="connectionLineComponent"
      :selection-key-code="selectionKeyCode"
      :delete-key-code="deleteKeyCode"
      :multi-selection-key-code="multiSelectionKeyCode"
      :zoom-activation-key-code="zoomActivationKeyCode"
      :snap-to-grid="snapToGrid"
      :snap-grid="snapGrid"
      :only-render-visible-elements="onlyRenderVisibleElements"
      :nodes-draggable="nodesDraggable"
      :nodes-connectable="nodesConnectable"
      :elements-selectable="elementsSelectable"
      :select-nodes-on-drag="selectNodesOnDrag"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :default-zoom="defaultZoom"
      :default-position="defaultPosition"
      :translate-extent="translateExtent"
      :node-extent="nodeExtent"
      :arrow-head-color="arrowHeadColor"
      :marker-end-id="markerEndId"
      :zoom-on-scroll="zoomOnScroll"
      :zoom-on-pinch="zoomOnPinch"
      :zoom-on-double-click="zoomOnDoubleClick"
      :pan-on-scroll="panOnScroll"
      :pan-on-scroll-speed="panOnScrollSpeed"
      :pan-on-scroll-mode="panOnScrollMode"
      :pane-moveable="paneMoveable"
      :edge-updater-radius="edgeUpdaterRadius"
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

export default defineComponent({
  name: 'RevueFlow',
  components: { GraphView },
  props: {
    modelValue: {
      type: Array as PropType<RevueFlowProps['modelValue']>,
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
    edgeUpdaterRadius: {
      type: Number as PropType<RevueFlowProps['edgeUpdaterRadius']>,
      required: false,
      default: 10
    }
  },
  emits: Object.keys(useRevueFlow()),
  setup(props, { emit }) {
    const store = configureStore(initialState)();
    provide<RevueFlowStore>('store', store);
    const hooks = useRevueFlow().bind(emit);
    provide<RevueFlowHooks>('hooks', hooks);
    const elements = useVModel(props, 'modelValue', emit);

    store.setElements(elements.value);
    watch(elements.value, () => {
      store.setElements(elements.value);
    });

    onUpdated(() => {
      store.setElements(elements.value);
    });

    onBeforeUnmount(() => {
      store.$reset();
      store.setElements([]);
    });

    const nodeTypesParsed = computed(
      () => props.nodeTypes && createNodeTypes({ ...defaultNodeTypes, ...props.nodeTypes } as any)
    );
    const edgeTypesParsed = computed(
      () => props.edgeTypes && createEdgeTypes({ ...defaultEdgeTypes, ...props.edgeTypes } as any)
    );

    return {
      nodeTypesParsed,
      edgeTypesParsed
    };
  }
});
</script>
