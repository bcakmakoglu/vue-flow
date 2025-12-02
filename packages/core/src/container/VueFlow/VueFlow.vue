<script lang="ts" setup generic="Data = ElementData">
import { useVModel } from '@vueuse/core'
import { onUnmounted, provide } from 'vue'
import Viewport from '../Viewport/Viewport.vue'
import A11yDescriptions from '../../components/A11y/A11yDescriptions.vue'
import type { ElementData, FlowEmits, FlowProps, FlowSlots, VueFlowStore } from '../../types'
import { Slots } from '../../context'
import { useOnInitHandler } from '../../composables/useOnInitHandler'
import { useWatchProps } from '../../composables/useWatchProps'
import { useVueFlow } from '../../composables/useVueFlow'
import { useHooks } from '../../store/hooks'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import { useStylesLoadedWarning } from '../../composables/useStylesLoadedWarning'

const props = withDefaults(defineProps<FlowProps<Data>>(), {
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

const slots = defineSlots<FlowSlots<Data>>()
const modelValue = useVModel(props, 'modelValue', emit)
const modelNodes = useVModel(props, 'nodes', emit)
const modelEdges = useVModel(props, 'edges', emit)

const vfInstance = useVueFlow(props)

// watch props and update store state
const disposeWatchers = useWatchProps({ modelValue, nodes: modelNodes, edges: modelEdges }, props, vfInstance)

useHooks(emit, vfInstance.hooks)

useOnInitHandler()

useStylesLoadedWarning()

// slots will be passed via provide
// this is to avoid having to pass them down through all the components
// as that would require a lot of boilerplate and causes significant performance drops
provide(Slots, slots)

onUnmounted(disposeWatchers)

defineExpose<VueFlowStore>(vfInstance)
</script>

<script lang="ts">
export default {
  name: 'VueFlow',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <div :ref="vfInstance.vueFlowRef" class="vue-flow">
    <Viewport>
      <EdgeRenderer />

      <div class="vue-flow__edge-labels" />

      <NodeRenderer />

      <!-- This slot is affected by zooming & panning -->
      <slot name="zoom-pane" />
    </Viewport>

    <!-- This slot is _not_ affected by zooming & panning -->
    <slot />

    <A11yDescriptions />
  </div>
</template>
