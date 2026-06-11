<script lang="ts" setup generic="NodeType extends Node = Node, EdgeType extends Edge = Edge">
import type { Ref } from 'vue'
import { inject, onUnmounted, provide } from 'vue'
import ZoomPane from '../ZoomPane/ZoomPane.vue'
import A11yDescriptions from '../../components/A11y/A11yDescriptions.vue'
import type { Edge, FlowEmits, FlowProps, FlowSlots, Node, VueFlowStore } from '../../types'
import { Slots, VueFlow as VueFlowInjectionKey } from '../../context'
import { useOnInitHandler } from '../../composables/useOnInitHandler'
import { useWatchProps } from '../../composables/useWatchProps'
import { useCreateVueFlow } from '../../composables/useCreateVueFlow'
import { useHooks } from '../../store/hooks'
import { useStylesLoadedWarning } from '../../composables/useStylesLoadedWarning'

const props = withDefaults(defineProps<FlowProps<NodeType, EdgeType>>(), {
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

const emit = defineEmits<FlowEmits<NodeType, EdgeType>>()

const slots = defineSlots<FlowSlots<NodeType, EdgeType>>()

const modelNodes = defineModel<NodeType[]>('nodes')
const modelEdges = defineModel<EdgeType[]>('edges')

// Reuse an ancestor `<VueFlowProvider>`'s store if present; otherwise this `<VueFlow>` owns it —
// create + provide our own (auto-wrap, like react's `<Wrapper>`). The store is only ever created by a
// provider boundary; `useVueFlow()` is a pure consumer.
const injectedStore = inject(VueFlowInjectionKey, null) as VueFlowStore<NodeType, EdgeType> | null

// This `<VueFlow>` owns its store unless it reuses an ancestor provider's. When it owns the store, the
// v-model refs back it directly as signals — single source of truth (svelte's `$bindable` proxy), so the
// store mutating nodes/edges IS the v-model update, no out-sync. When it reuses a provider's store, the
// model refs can't back the already-created store, so `useWatchProps` syncs them instead (rebinding a
// reused store to the hosting `<VueFlow>`'s models is deferred to the multi-instance guard work).
const ownsStore = !injectedStore

const vfInstance =
  injectedStore ??
  useCreateVueFlow<NodeType, EdgeType>(props, {
    nodes: modelNodes as unknown as Ref<NodeType[]>,
    edges: modelEdges as unknown as Ref<EdgeType[]>,
  })

// when reusing a provider's store, apply this `<VueFlow>`'s props to it
if (injectedStore) {
  injectedStore.setState(props as Parameters<typeof injectedStore.setState>[0])
}

// watch props and update store state (nodes/edges are signal-backed when we own the store — see above)
const disposeWatchers = useWatchProps({ nodes: modelNodes, edges: modelEdges }, props, vfInstance, ownsStore)

useHooks(emit, vfInstance.hooks)

useOnInitHandler(vfInstance)

useStylesLoadedWarning(vfInstance)

// slots will be passed via provide
// this is to avoid having to pass them down through all the components
// as that would require a lot of boilerplate and causes significant performance drops
provide(Slots, slots as unknown as FlowSlots)

onUnmounted(disposeWatchers)

defineExpose<VueFlowStore<NodeType, EdgeType>>(vfInstance)
</script>

<script lang="ts">
export default {
  name: 'VueFlow',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <div :ref="vfInstance.vueFlowRef" class="vue-flow">
    <ZoomPane>
      <!-- This slot is affected by zooming & panning -->
      <slot v-bind="{} as any" name="zoom-pane" />
    </ZoomPane>

    <!-- This slot is _not_ affected by zooming & panning -->
    <slot v-bind="{} as any" />

    <A11yDescriptions />
  </div>
</template>
