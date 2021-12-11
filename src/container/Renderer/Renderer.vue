<script lang="ts" setup>
import { useStore, useWindow, useZoomPanHelper } from '../../composables'
import { FlowInstance } from '../../types'
import { onLoadGetEdges, onLoadGetNodes, onLoadProject, onLoadToObject } from '../../utils'

const store = useStore()
store.isReady = true

nextTick(async () => {
  // if ssr we can't wait for dimensions, they'll never really exist
  const window = useWindow()
  if ('screen' in window)
    await until(store.dimensions).toMatch(({ height, width }) => !isNaN(width) && width > 0 && !isNaN(height) && height > 0)

  const { zoomIn, zoomOut, zoomTo, transform: setTransform, fitView } = useZoomPanHelper(store)
  const instance: FlowInstance = {
    fitView: (params = { padding: 0.1 }) => fitView(params),
    zoomIn,
    zoomOut,
    zoomTo,
    setTransform,
    project: onLoadProject(store),
    getNodes: onLoadGetNodes(store),
    getEdges: onLoadGetEdges(store),
    toObject: onLoadToObject(store),
  }
  store.hooks.load.trigger(instance)
  store.instance = instance
})
</script>
<script lang="ts">
export default {
  name: 'Renderer',
}
</script>
<template>
  <div class="vue-flow__renderer">
    <slot />
  </div>
</template>
