<script lang="ts" setup>
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'
import { useVueFlow, useZoomPanHelper, useWindow } from '../../composables'
import { FlowInstance, Store } from '../../types'
import { onLoadGetEdges, onLoadGetElements, onLoadGetNodes, onLoadProject, onLoadToObject } from '../../utils'

const { id, store } = useVueFlow()

const untilDimensions = async (store: Store) => {
  // if ssr we can't wait for dimensions, they'll never really exist
  const window = useWindow()
  if ('screen' in window) {
    // wait until viewport dimensions has been established
    await until(store.dimensions).toMatch(({ height, width }) => !isNaN(width) && width > 0 && !isNaN(height) && height > 0)
  }

  return true
}

const ready = ref(false)
onMounted(async () => {
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

  await untilDimensions(store)

  ready.value = true
  store.instance = instance
  store.fitViewOnInit && instance.fitView()
  store.hooks.paneReady.trigger(instance)
})

const transform = computed(() => `translate(${store.viewport.x}px,${store.viewport.y}px) scale(${store.viewport.zoom})`)
</script>
<script lang="ts">
export default {
  name: 'Transform',
}
</script>
<template>
  <div
    :key="`transformation-pane-${id}`"
    class="vue-flow__transformationpane vue-flow__container"
    :style="{ transform, opacity: ready ? undefined : 0 }"
  >
    <NodeRenderer :key="`node-renderer-${id}`" />
    <EdgeRenderer :key="`edge-renderer-${id}`" />
    <slot />
  </div>
</template>
