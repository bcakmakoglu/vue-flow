<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { onUnmounted, provide } from 'vue'
import Viewport from '../Viewport/Viewport.vue'
import A11yDescriptions from '../../components/A11y/A11yDescriptions.vue'
import type { FlowEmits, FlowProps, FlowSlots, VueFlowStore } from '../../types'
import { useVueFlow, useWatchProps } from '../../composables'
import { useHooks } from '../../store'
import { Slots } from '../../context'

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
  connectionLineOptions: undefined,
  autoConnect: undefined,
  elevateEdgesOnSelect: undefined,
  elevateNodesOnSelect: undefined,
  disableKeyboardA11y: undefined,
  edgesFocusable: undefined,
  nodesFocusable: undefined,
  autoPanOnConnect: undefined,
  autoPanOnNodeDrag: undefined,
  isValidConnection: undefined,
  deleteKeyCode: undefined,
  selectionKeyCode: undefined,
  multiSelectionKeyCode: undefined,
  panActivationKeyCode: undefined,
  zoomActivationKeyCode: undefined,
})

const emit = defineEmits<FlowEmits>()

const slots = defineSlots<FlowSlots>()

const modelValue = useVModel(props, 'modelValue', emit)
const modelNodes = useVModel(props, 'nodes', emit)
const modelEdges = useVModel(props, 'edges', emit)

const { vueFlowRef, hooks, getNodeTypes, getEdgeTypes, ...rest } = useVueFlow(props)

const dispose = useWatchProps({ modelValue, nodes: modelNodes, edges: modelEdges }, props, {
  vueFlowRef,
  hooks,
  getNodeTypes,
  getEdgeTypes,
  ...rest,
})

useHooks(emit, hooks)

provide(Slots, slots)

onUnmounted(() => {
  dispose()
})

defineExpose<VueFlowStore>({
  vueFlowRef,
  hooks,
  getNodeTypes,
  getEdgeTypes,
  ...rest,
})
</script>

<script lang="ts">
export default {
  name: 'VueFlow',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <div ref="vueFlowRef" class="vue-flow">
    <Viewport>
      <!-- This slot will be passed down to the transformation-pane and rendered inside there, meaning it's affected by zooming/panning -->
      <slot name="zoom-pane" />
    </Viewport>

    <!-- This slot will render outside the transformation-pane, meaning it's *not* affected by zooming and panning -->
    <slot />

    <A11yDescriptions />
  </div>
</template>
