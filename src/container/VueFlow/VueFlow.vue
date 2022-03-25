<script lang="ts" setup>
import ZoomPane from '../ZoomPane/ZoomPane.vue'
import { createHooks, useHooks } from '../../store'
import { useVueFlow } from '../../composables'
import type { FlowProps } from '../../types/flow'
import useWatch from './watch'

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
  connectionLineStyle: () => null,
})
const emit = defineEmits([...Object.keys(createHooks()), 'update:modelValue', 'update:edges', 'update:nodes'])

const {
  id,
  store,
  hooks,
  applyDefault,
  setElements,
  setEdges,
  setNodes,
  getNodeTypes,
  getEdgeTypes,
  onNodesChange,
  onEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  nodes: storedNodes,
  edges: storedEdges,
  fitViewOnInit,
} = useVueFlow(props)
useHooks(hooks.value, emit)
const { modelValue, nodes, edges } = useVModels(props, emit)

if (applyDefault.value) {
  onNodesChange(applyNodeChanges)
  onEdgesChange(applyEdgeChanges)
}
if (props.modelValue && !storedNodes.value.length) setElements(props.modelValue)
if (props.nodes && !storedNodes.value.length) setNodes(props.nodes)
if (props.edges && !storedEdges.value.length) setEdges(props.edges)

if (modelValue && modelValue.value) modelValue.value = [...store.nodes, ...store.edges]
if (nodes && nodes.value) nodes.value = store.nodes
if (edges && edges.value) edges.value = store.edges

onMounted(() => useWatch({ modelValue, nodes, edges }, props, store))
</script>
<script lang="ts">
export default {
  name: 'VueFlow',
}
</script>
<template>
  <div class="vue-flow">
    <ZoomPane :key="`renderer-${id}`">
      <template v-for="nodeName of Object.keys(getNodeTypes)" #[`node-${nodeName}`]="nodeProps" :key="`node-${nodeName}-${id}`">
        <slot :name="`node-${nodeName}`" v-bind="nodeProps" />
      </template>
      <template v-for="edgeName of Object.keys(getEdgeTypes)" #[`edge-${edgeName}`]="edgeProps" :key="`edge-${edgeName}-${id}`">
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
