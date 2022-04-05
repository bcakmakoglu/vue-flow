<script lang="ts" setup>
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'
import { useKeyPress, useVueFlow, useZoomPanHelper } from '../../composables'
import { FlowInstance } from '../../types'
import { onLoadGetEdges, onLoadGetElements, onLoadGetNodes, onLoadProject, onLoadToObject } from '../../utils'

const { id, store } = useVueFlow()

onMounted(() => {
  const { zoomIn, zoomOut, zoomTo, setTransform, getTransform, fitView, fitBounds, setCenter } = useZoomPanHelper(store)
  const instance: FlowInstance = {
    fitView: (params = { padding: 0.1 }) => fitView(params),
    zoomIn,
    zoomOut,
    zoomTo,
    setTransform,
    getTransform,
    setCenter,
    fitBounds,
    project: onLoadProject(store),
    getElements: onLoadGetElements(store),
    getNodes: onLoadGetNodes(store),
    getEdges: onLoadGetEdges(store),
    toObject: onLoadToObject(store),
  }
  store.instance = instance
  store.fitViewOnInit && instance.fitView()
  store.paneReady = true
  store.hooks.paneReady.trigger(instance)
})

const transform = computed(() => `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`)
</script>
<script lang="ts">
export default {
  name: 'TransformationPane',
}
</script>
<template>
  <div :key="`transformation-pane-${id}`" class="vue-flow__transformation-pane vue-flow__container" :style="{ transform }">
    <NodeRenderer :key="`node-renderer-${id}`" />
    <EdgeRenderer :key="`edge-renderer-${id}`" />
    <slot />
  </div>
</template>
