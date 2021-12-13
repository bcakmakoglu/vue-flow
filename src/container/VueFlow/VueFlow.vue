<script lang="ts" setup>
import { createHooks, useHooks } from '../../store'
import type { FlowProps } from '../../types/flow'
import ZoomPane from '../ZoomPane/ZoomPane.vue'
import { useVueFlow, applyNodeChanges, applyEdgeChanges } from '../../composables'
import useWatch from './watch'

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
  applyDefault: true,
})
const emit = defineEmits([...Object.keys(createHooks()), 'update:modelValue', 'update:edges', 'update:nodes'])
const { modelValue, nodes, edges } = useVModels(props, emit)

const { id, store } = useVueFlow(props)
useHooks(store.hooks, emit)

if (store.applyDefault) {
  store.hooks.nodesChange.on((c) => applyNodeChanges(c, store.nodes))
  store.hooks.edgesChange.on((c) => applyEdgeChanges(c, store.edges))
}
if (modelValue?.value && !store.nodes.length) store.setElements(modelValue.value)
if (nodes?.value && !store.nodes.length) store.setNodes(nodes.value)
if (edges?.value && !store.edges.length) store.setEdges(edges.value)
onMounted(() => useWatch(modelValue, nodes, edges, props, store))
modelValue && (modelValue.value = [...store.nodes, ...store.edges])
nodes && (nodes.value = store.nodes)
edges && (edges.value = store.edges)
</script>
<script lang="ts">
export default {
  name: 'VueFlow',
}
</script>
<template>
  <div class="vue-flow">
    <ZoomPane :key="`renderer-${id}`">
      <template
        v-for="nodeName of Object.keys(store.getNodeTypes)"
        #[`node-${nodeName}`]="nodeProps"
        :key="`node-${nodeName}-${id}`"
      >
        <slot :name="`node-${nodeName}`" v-bind="nodeProps" />
      </template>
      <template
        v-for="edgeName of Object.keys(store.getEdgeTypes)"
        #[`edge-${edgeName}`]="edgeProps"
        :key="`edge-${edgeName}-${id}`"
      >
        <slot :name="`edge-${edgeName}`" v-bind="edgeProps" />
      </template>
      <template #connection-line="customConnectionLineProps">
        <slot name="connection-line" v-bind="customConnectionLineProps" />
      </template>
      <slot name="zoom-pane" />
    </ZoomPane>
    <slot />
  </div>
</template>
<style>
@import '../../style.css';
</style>
