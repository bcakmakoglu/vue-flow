<script lang="ts" setup>
import type { D3ZoomEvent } from 'd3-zoom'
import Viewport from '../Viewport/Viewport.vue'
import type { FlowElements, FlowProps } from '../../types/flow'
import type {
  Connection,
  EdgeChange,
  EdgeMouseEvent,
  EdgeUpdateEvent,
  GraphEdge,
  GraphNode,
  NodeChange,
  NodeDragEvent,
  NodeMouseEvent,
  OnConnectStartParams,
  ViewpaneTransform,
  VueFlowStore,
} from '../../types'

const props = withDefaults(defineProps<FlowProps>(), {
  snapToGrid: undefined,
  onlyRenderVisibleElements: undefined,
  edgesUpdatable: undefined,
  nodesConnectable: undefined,
  nodesDraggable: undefined,
  elementsSelectable: undefined,
  selectNodesOnDrag: undefined,
  preventScrolling: undefined,
  zoomOnScroll: undefined,
  zoomOnPinch: undefined,
  zoomOnDoubleClick: undefined,
  panOnScroll: undefined,
  panOnDrag: undefined,
  applyDefault: undefined,
  fitViewOnInit: undefined,
  connectOnClick: undefined,
  connectionLineStyle: undefined,
  autoConnect: undefined,
  elevateEdgesOnSelect: undefined,
  elevateNodesOnSelect: undefined,
})

const emit = defineEmits<{
  (event: 'nodesChange', changes: NodeChange[]): void
  (event: 'edgesChange', changes: EdgeChange[]): void
  (event: 'nodeDoubleClick', nodeMouseEvent: NodeMouseEvent): void
  (event: 'nodeClick', nodeMouseEvent: NodeMouseEvent): void
  (event: 'nodeMouseEnter', nodeMouseEvent: NodeMouseEvent): void
  (event: 'nodeMouseMove', nodeMouseEvent: NodeMouseEvent): void
  (event: 'nodeMouseLeave', nodeMouseEvent: NodeMouseEvent): void
  (event: 'nodeContextMenu', nodeMouseEvent: NodeMouseEvent): void
  (event: 'nodeDragStart', nodeDragEvent: NodeDragEvent): void
  (event: 'nodeDrag', nodeDragEvent: NodeDragEvent): void
  (event: 'nodeDragStop', nodeDragEvent: NodeDragEvent): void
  (event: 'nodesInitialized'): void
  (event: 'miniMapNodeClick', nodeMouseEvent: NodeMouseEvent): void
  (event: 'miniMapNodeDoubleClick', nodeMouseEvent: NodeMouseEvent): void
  (event: 'miniMapNodeMouseEnter', nodeMouseEvent: NodeMouseEvent): void
  (event: 'miniMapNodeMouseMove', nodeMouseEvent: NodeMouseEvent): void
  (event: 'miniMapNodeMouseLeave', nodeMouseEvent: NodeMouseEvent): void
  (event: 'connect', connectionEvent: Connection): void
  (
    event: 'connectStart',
    connectionEvent: {
      event?: MouseEvent
    } & OnConnectStartParams,
  ): void
  (event: 'connectEnd', connectionEvent?: MouseEvent): void
  (event: 'moveStart', moveEvent: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: ViewpaneTransform }): void
  (event: 'move', moveEvent: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: ViewpaneTransform }): void
  (event: 'moveEnd', moveEvent: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: ViewpaneTransform }): void
  (event: 'selectionDragStart', selectionEvent: NodeDragEvent): void
  (event: 'selectionDrag', selectionEvent: NodeDragEvent): void
  (event: 'selectionDragStop', selectionEvent: NodeDragEvent): void
  (event: 'selectionContextMenu', selectionEvent: { event: MouseEvent; nodes: GraphNode[] }): void
  (event: 'paneReady', paneEvent: VueFlowStore): void
  (event: 'paneScroll', paneEvent: WheelEvent | undefined): void
  (event: 'paneClick', paneEvent: MouseEvent): void
  (event: 'paneContextMenu', paneEvent: MouseEvent): void
  (event: 'paneMouseEnter', paneEvent: MouseEvent): void
  (event: 'paneMouseMove', paneEvent: MouseEvent): void
  (event: 'paneMouseLeave', paneEvent: MouseEvent): void
  (event: 'edgeContextMenu', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'edgeMouseEnter', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'edgeMouseMove', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'edgeMouseLeave', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'edgeDoubleClick', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'edgeClick', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'edgeUpdateStart', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'edgeUpdate', edgeUpdateEvent: EdgeUpdateEvent): void
  (event: 'edgeUpdateEnd', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'updateNodeInternals'): void

  /** v-model event definitions */
  (event: 'update:modelValue', value: FlowElements): void
  (event: 'update:nodes', value: GraphNode[]): void
  (event: 'update:edges', value: GraphEdge[]): void
}>()

const modelValue = useVModel(props, 'modelValue', emit)
const modelNodes = useVModel(props, 'nodes', emit)
const modelEdges = useVModel(props, 'edges', emit)

const { vueFlowRef, id, hooks, getNodeTypes, getEdgeTypes, $reset, ...rest } = useVueFlow(props)

const dispose = useWatch({ modelValue, nodes: modelNodes, edges: modelEdges }, props, {
  vueFlowRef,
  id,
  hooks,
  getNodeTypes,
  getEdgeTypes,
  $reset,
  ...rest,
})

const el = ref<HTMLDivElement>()

onUnmounted(() => {
  dispose()
})

onMounted(() => {
  vueFlowRef.value = el.value!
})

useHooks(emit, hooks)

provide(Slots, useSlots())

defineExpose<VueFlowStore>({
  vueFlowRef,
  id,
  hooks,
  getNodeTypes,
  getEdgeTypes,
  $reset,
  ...rest,
})
</script>

<script lang="ts">
export default {
  name: 'VueFlow',
}
</script>

<template>
  <div ref="el" class="vue-flow">
    <Viewport>
      <template #nodes>
        <template v-for="nodeName of Object.keys(getNodeTypes)">
          <slot :name="`node-${nodeName}`" />
        </template>
      </template>

      <template #edges>
        <template v-for="edgeName of Object.keys(getEdgeTypes)">
          <slot :name="`edge-${edgeName}`" />
        </template>
      </template>

      <template #connection-name>
        <slot name="connection-line" />
      </template>

      <slot name="zoom-pane" />
    </Viewport>

    <slot />
  </div>
</template>
