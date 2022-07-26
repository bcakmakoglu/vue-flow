<script lang="ts" setup>
import Viewport from '../Viewport/Viewport.vue'
import { useHooks } from '../../store'
import { useVueFlow } from '../../composables'
import type { FlowProps } from '../../types/flow'
import { Slots } from '../../context'
import type { Emits, VueFlowStore } from '../../types'
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
  connectionLineStyle: undefined,
  autoConnect: undefined,
  elevateEdgesOnSelect: undefined,
})

const emit = defineEmits<Emits>()

const modelValue = useVModel(props, 'modelValue', emit)
const modelNodes = useVModel(props, 'nodes', emit)
const modelEdges = useVModel(props, 'edges', emit)

const { vueFlowRef, id, hooks, getNodeTypes, getEdgeTypes, $reset, ...rest } = useVueFlow({ id: props.id })

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
  $reset()
})

onMounted(() => {
  vueFlowRef.value = el.value!
})

useHooks(emit, hooks.value)

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
