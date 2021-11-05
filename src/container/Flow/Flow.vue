<script lang="ts" setup>
import { CSSProperties, onBeforeUnmount } from 'vue'
import ZoomPane from '../../container/ZoomPane/ZoomPane.vue'
import SelectionPane from '../../container/SelectionPane/SelectionPane.vue'
import NodeRenderer from '../../container/NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../../container/EdgeRenderer/EdgeRenderer.vue'
import {
  ConnectionLineType,
  ConnectionMode,
  Elements,
  PanOnScrollMode,
  NodeType,
  EdgeType,
  KeyCode,
  TranslateExtent,
  NodeExtent,
  FlowOptions,
} from '../../types'
import { DefaultNode, InputNode, OutputNode } from '../../components/Nodes'
import { BezierEdge, SmoothStepEdge, StepEdge, StraightEdge } from '../../components/Edges'
import { createEdgeTypes } from '../EdgeRenderer/utils'
import { createNodeTypes } from '../NodeRenderer/utils'
import { useHooks, useStore, createHooks } from '../../composables'

export interface FlowProps extends FlowOptions {
  elements: Elements
  nodeTypes?: Record<string, NodeType>
  edgeTypes?: Record<string, EdgeType>
  connectionMode?: ConnectionMode
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
  deleteKeyCode?: KeyCode
  selectionKeyCode?: KeyCode
  multiSelectionKeyCode?: KeyCode
  zoomActivationKeyCode?: KeyCode
  snapToGrid?: boolean
  snapGrid?: [number, number]
  onlyRenderVisibleElements?: boolean
  nodesDraggable?: boolean
  nodesConnectable?: boolean
  elementsSelectable?: boolean
  selectNodesOnDrag?: boolean
  paneMoveable?: boolean
  minZoom?: number
  maxZoom?: number
  defaultZoom?: number
  defaultPosition?: [number, number]
  translateExtent?: TranslateExtent
  nodeExtent?: NodeExtent
  arrowHeadColor?: string
  markerEndId?: string
  zoomOnScroll?: boolean
  zoomOnPinch?: boolean
  panOnScroll?: boolean
  panOnScrollSpeed?: number
  panOnScrollMode?: PanOnScrollMode
  zoomOnDoubleClick?: boolean
  edgeUpdaterRadius?: number
  edgeTypesId?: string
  nodeTypesId?: string
}

const props = withDefaults(defineProps<FlowProps>(), {
  elements: () => [],
  connectionMode: ConnectionMode.Loose,
  connectionLineType: ConnectionLineType.Bezier,
  selectionKeyCode: 'Shift',
  multiSelectionKeyCode: 'Meta',
  zoomActivationKeyCode: 'Meta',
  deleteKeyCode: 'Backspace',
  snapToGrid: false,
  snapGrid: () => [15, 15],
  onlyRenderVisibleElements: false,
  nodesConnectable: true,
  nodesDraggable: true,
  elementsSelectable: true,
  selectNodesOnDrag: true,
  minZoom: 0.5,
  maxZoom: 2,
  defaultZoom: 1,
  defaultPosition: () => [0, 0],
  translateExtent: () => [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  nodeExtent: () => [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  arrowHeadColor: '#b1b1b7',
  zoomOnScroll: true,
  zoomOnPinch: true,
  zoomOnDoubleClick: true,
  panOnScroll: false,
  panOnScrollSpeed: 0.5,
  panOnScrollMode: PanOnScrollMode.Free,
  paneMoveable: true,
  edgeUpdaterRadius: 10,
  edgeTypesId: '1',
  nodeTypesId: '1',
})
const emit = defineEmits(Object.keys(createHooks()))

const defaultNodeTypes: Record<string, NodeType> = {
  input: InputNode as NodeType,
  default: DefaultNode as NodeType,
  output: OutputNode as NodeType,
}

const defaultEdgeTypes: Record<string, EdgeType> = {
  default: BezierEdge as EdgeType,
  straight: StraightEdge as EdgeType,
  step: StepEdge as EdgeType,
  smoothstep: SmoothStepEdge as EdgeType,
}

const store = useStore(props)
const hooks = useHooks(emit)

const init = (opts: typeof props) => {
  store.$state = { ...store.$state, ...opts }
  store.setElements(opts.elements)
  store.setMinZoom(opts.minZoom)
  store.setMaxZoom(opts.maxZoom)
  store.setTranslateExtent(opts.translateExtent)
  store.setNodeExtent(opts.nodeExtent)
}

onBeforeUnmount(() => store?.$dispose())

watch(
  () => props,
  (val) => init(val),
  { flush: 'pre', deep: true },
)
init(props)

const nodeTypes = controlledComputed(
  () => props.nodeTypesId,
  () => createNodeTypes({ ...defaultNodeTypes, ...props.nodeTypes }),
)
const edgeTypes = controlledComputed(
  () => props.edgeTypesId,
  () => createEdgeTypes({ ...defaultEdgeTypes, ...props.edgeTypes }),
)
</script>
<template>
  <div class="vue-flow">
    <ZoomPane
      :selection-key-code="props.selectionKeyCode"
      :zoom-activation-key-code="props.zoomActivationKeyCode"
      :default-zoom="props.defaultZoom"
      :default-position="props.defaultPosition"
      :zoom-on-scroll="props.zoomOnScroll"
      :zoom-on-pinch="props.zoomOnPinch"
      :zoom-on-double-click="props.zoomOnDoubleClick"
      :pan-on-scroll="props.panOnScroll"
      :pan-on-scroll-speed="props.panOnScrollSpeed"
      :pan-on-scroll-mode="props.panOnScrollMode"
      :pane-moveable="props.paneMoveable"
    >
      <SelectionPane
        :delete-key-code="props.deleteKeyCode"
        :multi-selection-key-code="props.multiSelectionKeyCode"
        :selection-key-code="props.selectionKeyCode"
      >
        <NodeRenderer :node-types="nodeTypes" :select-nodes-on-drag="props.selectNodesOnDrag">
          <template v-for="nodeName of Object.keys(nodeTypes)" #[`node-${nodeName}`]="nodeProps">
            <slot :name="`node-${nodeName}`" v-bind="nodeProps"></slot>
          </template>
        </NodeRenderer>
        <EdgeRenderer
          :connection-line-type="props.connectionLineType"
          :connection-line-style="props.connectionLineStyle"
          :arrow-head-color="props.arrowHeadColor"
          :marker-end-id="props.markerEndId"
          :edge-types="edgeTypes"
        >
          <template v-for="edgeName of Object.keys(edgeTypes)" #[`edge-${edgeName}`]="edgeProps">
            <slot :name="`edge-${edgeName}`" v-bind="edgeProps"></slot>
          </template>
          <template #custom-connection-line="customConnectionLineProps">
            <slot name="custom-connection-line" v-bind="customConnectionLineProps"></slot>
          </template>
        </EdgeRenderer>
      </SelectionPane>
      <slot v-bind="{ ...props, store, hooks }"></slot>
    </ZoomPane>
  </div>
</template>
<style>
@import '../../style.css';
@import '../../theme-default.css';
</style>
