<script lang="ts" setup>
import { createHooks, useHooks } from '../../store'
import type { FlowProps } from '../../types/flow'
import ZoomPane from '../ZoomPane/ZoomPane.vue'
import { useVueFlow } from '../../composables'

const props = withDefaults(defineProps<FlowProps>(), {
  snapToGrid: false,
  onlyRenderVisibleElements: false,
  edgesUpdatable: false,
  nodesConnectable: true,
  nodesDraggable: true,
  elementsSelectable: true,
  selectNodesOnDrag: true,
  preventScrolling: true,
  zoomOnScroll: true,
  zoomOnPinch: true,
  zoomOnDoubleClick: true,
  panOnScroll: false,
  paneMoveable: true,
})
const emit = defineEmits([...Object.keys(createHooks()), 'update:modelValue', 'update:edges', 'update:nodes'])
const { modelValue, nodes, edges } = useVModels(props, emit)

const { store } = useVueFlow(props)
useHooks(store.hooks, emit)

nextTick(() => {
  modelValue && (modelValue.value = [...store.nodes, ...store.edges])
  nodes && (nodes.value = store.nodes)
})
nextTick(() => {
  modelValue && (modelValue.value = [...store.nodes, ...store.edges])
  edges && (edges.value = store.edges)
})
watch(
  () => props,
  (v) => nextTick(() => store.setState(v)),
  { flush: 'sync', deep: true, immediate: true },
)
</script>
<script lang="ts">
export default {
  name: 'VueFlow',
}
</script>
<template>
  <div class="vue-flow">
    <ZoomPane :key="`renderer-${store.id}`">
      <template
        v-for="nodeName of Object.keys(store.getNodeTypes)"
        #[`node-${nodeName}`]="nodeProps"
        :key="`node-${nodeName}-${store.id}`"
      >
        <slot :name="`node-${nodeName}`" v-bind="nodeProps" />
      </template>
      <template
        v-for="edgeName of Object.keys(store.getEdgeTypes)"
        #[`edge-${edgeName}`]="edgeProps"
        :key="`edge-${edgeName}-${store.id}`"
      >
        <slot :name="`edge-${edgeName}`" v-bind="edgeProps" />
      </template>
      <template #connection-line="customConnectionLineProps">
        <slot name="connection-line" v-bind="customConnectionLineProps" />
      </template>
      <slot name="zoom-pane" />
    </ZoomPane>
    <slot v-bind="store" />
  </div>
</template>
<style>
@import '../../style.css';
</style>
