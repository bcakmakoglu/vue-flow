<script lang="ts" setup>
import Viewport from '../Viewport/Viewport.vue'
import { useHooks } from '../../store'
import { useVueFlow } from '../../composables'
import type { FlowProps } from '../../types/flow'
import type { Emits } from '../../types/hooks'
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
  connectionLineStyle: undefined,
})

const emit = defineEmits<Emits>()

const modelValue = useVModel(props, 'modelValue', emit)
const modelNodes = useVModel(props, 'nodes', emit)
const modelEdges = useVModel(props, 'edges', emit)

const { id, hooks, getNodeTypes, getEdgeTypes, $reset, ...rest } = useVueFlow({ id: props.id })

const dispose = useWatch({ modelValue, nodes: modelNodes, edges: modelEdges }, props, {
  id,
  hooks,
  getNodeTypes,
  getEdgeTypes,
  $reset,
  ...rest,
})

onUnmounted(() => {
  dispose()
  $reset()
})

useHooks(emit, hooks.value)

provide(Slots, useSlots())
</script>

<script lang="ts">
export default {
  name: 'VueFlow',
}
</script>

<template>
  <div class="vue-flow">
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
