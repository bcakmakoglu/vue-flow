<script lang="ts" setup>
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'
import { useVueFlow, useZoomPanHelper, useWindow } from '../../composables'
import { FlowExportObject, FlowInstance, Store, XYPosition } from '../../types'
import { pointToRendererPoint } from '../../utils'

const { store } = useVueFlow()

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
  const { fitView, ...rest } = useZoomPanHelper(store)
  let instance: FlowInstance | null = {
    fitView: (params = { padding: 0.1 }) => fitView(params),
    ...rest,

    project(position: XYPosition) {
      return pointToRendererPoint(position, store.viewport, store.snapToGrid, store.snapGrid)
    },
    getElements() {
      return [...store.nodes, ...store.edges]
    },
    getNodes() {
      return store.nodes
    },
    getEdges() {
      return store.edges
    },
    toObject() {
      // we have to stringify/parse so objects containing refs (like nodes and edges) can potentially be saved in a storage
      return JSON.parse(
        JSON.stringify({
          nodes: store.nodes,
          edges: store.edges,
          position: [store.viewport.x, store.viewport.y],
          zoom: store.viewport.zoom,
        } as FlowExportObject),
      )
    },
  }

  onScopeDispose(() => (instance = null))

  await untilDimensions(store)

  ready.value = true
  store.instance = instance as FlowInstance
  store.fitViewOnInit && instance.fitView()
  store.hooks.paneReady.trigger(instance as FlowInstance)
})

const transform = computed(() => `translate(${store.viewport.x}px,${store.viewport.y}px) scale(${store.viewport.zoom})`)
</script>
<script lang="ts">
export default {
  name: 'Transform',
}
</script>
<template>
  <div class="vue-flow__transformationpane vue-flow__container" :style="{ transform, opacity: ready ? undefined : 0 }">
    <NodeRenderer
      :draggable="store.nodesDraggable"
      :selectable="store.elementsSelectable"
      :connectable="store.nodesConnectable"
      :nodes="store.getNodes"
      :snap-to-grid="store.snapToGrid"
      :snap-grid="store.snapGrid"
    />
    <EdgeRenderer />
    <slot />
  </div>
</template>
