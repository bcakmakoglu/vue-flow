<script lang="ts" setup>
import Renderer from '../Renderer/Renderer.vue'
import ZoomPane from '../ZoomPane/ZoomPane.vue'
import SelectionPane from '../SelectionPane/SelectionPane.vue'
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'
import LoadingIndicator from '../../components/Loading/LoadingIndicator.vue'
import { createHooks, initFlow } from '../../composables'
import type { FlowProps } from '../../types/flow'

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
const emit = defineEmits([...Object.keys(createHooks()), 'update:nodes', 'update:edges'])
const store = initFlow(emit, props.id)
const { nodes, edges } = useVModels(props, emit)
store.setState(props)
watch(
  () => props,
  () => store.setState(props),
  { flush: 'post', deep: true },
)
</script>
<script lang="ts">
export default {
  name: 'VueFlow',
}
</script>
<template>
  <div class="vue-flow">
    <Suspense timeout="0">
      <template #default>
        <Renderer :key="`renderer-${store.id}`">
          <ZoomPane :key="`zoom-pane-${store.id}`">
            <template #default="zoomPaneProps">
              <SelectionPane :key="`selection-pane-${store.id}`">
                <NodeRenderer :key="`node-renderer-${store.id}`">
                  <template
                    v-for="nodeName of Object.keys(store.getNodeTypes)"
                    #[`node-${nodeName}`]="nodeProps"
                    :key="`node-${nodeName}-${store.id}`"
                  >
                    <slot :name="`node-${nodeName}`" v-bind="nodeProps" />
                  </template>
                </NodeRenderer>
                <EdgeRenderer :key="`edge-renderer-${store.id}`">
                  <template
                    v-for="edgeName of Object.keys(store.getEdgeTypes)"
                    #[`edge-${edgeName}`]="edgeProps"
                    :key="`edge-${edgeName}-${store.id}`"
                  >
                    <slot :name="`edge-${edgeName}`" v-bind="edgeProps" />
                  </template>
                  <template #custom-connection-line="customConnectionLineProps">
                    <slot name="custom-connection-line" v-bind="customConnectionLineProps" />
                  </template>
                </EdgeRenderer>
              </SelectionPane>
              <slot name="zoom-pane" v-bind="zoomPaneProps"></slot>
            </template>
          </ZoomPane>
        </Renderer>
      </template>
      <template #fallback>
        <slot name="loading-indicator">
          <LoadingIndicator v-if="store.loading && store.loading !== '' && !store.isReady" :label="store.loading">
            <slot name="loading-label" />
          </LoadingIndicator>
        </slot>
      </template>
    </Suspense>
    <slot v-bind="store"></slot>
  </div>
</template>
<style>
@import '../../style.css';
</style>
