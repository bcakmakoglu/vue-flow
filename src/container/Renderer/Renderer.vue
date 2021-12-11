<script lang="ts" setup>
import { useStore, useWindow, useZoomPanHelper } from '../../composables'
import { FlowInstance } from '../../types'
import { onLoadGetEdges, onLoadGetElements, onLoadGetNodes, onLoadProject, onLoadToObject } from '../../utils'
import ZoomPane from '../ZoomPane/ZoomPane.vue'

const store = useStore()

nextTick(async () => {
  store.isReady = true
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
    getElements: onLoadGetElements(store),
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
    <ZoomPane :key="`zoom-pane-${store.id}`">
      <template
        v-for="nodeName of Object.keys(store.getNodeTypes)"
        #[`node-${nodeName}`]="nodeProps"
        :key="`node-${nodeName}-${store.id}`"
      >
        <slot :name="`node-${nodeName}`" v-bind="nodeProps" />
      </template>
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
    </ZoomPane>
  </div>
</template>
