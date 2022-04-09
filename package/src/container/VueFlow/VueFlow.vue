<script lang="ts" setup>
import Viewport from '../Viewport/Viewport.vue'
import { createHooks, useHooks } from '../../store'
import { useVueFlow } from '../../composables'
import type { FlowProps } from '../../types/flow'
import { Slots } from '../../context'
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
  connectOnClick: undefined,
  connectionLineStyle: null,
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
} = useVueFlow(props)
useHooks(emit, hooks.value)
const { modelValue, nodes, edges } = useVModels(props, emit)
onMounted(() => useWatch({ modelValue, nodes, edges }, props, store))

if (applyDefault.value) {
  onNodesChange(applyNodeChanges)
  onEdgesChange(applyEdgeChanges)
}
if (props.modelValue && !storedNodes.value.length) setElements(props.modelValue)
if (props.nodes && !storedNodes.value.length) setNodes(props.nodes)
if (props.edges && !storedEdges.value.length) setEdges(props.edges)

if (modelValue && modelValue.value) {
  watch(
    [() => storedEdges.value.length, () => storedNodes.value.length],
    () => {
      modelValue.value = [...storedNodes.value, ...storedEdges.value]
    },
    { immediate: true },
  )
}

if (nodes && nodes.value) {
  watch(
    () => storedNodes.value.length,
    () => (nodes.value = [...storedNodes.value]),
    { immediate: true },
  )
}

if (edges && edges.value) {
  watch(
    () => storedEdges.value.length,
    () => (edges.value = [...storedEdges.value]),
    { immediate: true },
  )
}

provide(Slots, useSlots())
</script>
<script lang="ts">
export default {
  name: 'VueFlow',
}
</script>
<template>
  <div class="vue-flow">
    <Viewport :key="`renderer-${id}`">
      <template #nodes>
        <template v-for="nodeName of Object.keys(getNodeTypes)" :key="`node-${nodeName}-${id}`">
          <slot :name="`node-${nodeName}`" />
        </template>
      </template>
      <template #edges>
        <template v-for="edgeName of Object.keys(getEdgeTypes)" :key="`edge-${edgeName}-${id}`">
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
