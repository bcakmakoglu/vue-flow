<script lang="ts" setup>
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'
import { useVueFlow, useWindow, useZoomPanHelper } from '../../composables'
import type { Dimensions, FlowExportObject, FlowInstance, XYPosition } from '../../types'
import { pointToRendererPoint } from '../../utils'

const { id, nodes, edges, viewport, snapToGrid, snapGrid, dimensions, setState, fitViewOnInit, emits } = $(useVueFlow())

const untilDimensions = async (dim: Dimensions) => {
  // if ssr we can't wait for dimensions, they'll never really exist
  const window = useWindow()
  if ('screen' in window) {
    // wait until viewport dimensions has been established
    await until(dim).toMatch(({ height, width }) => !isNaN(width) && width > 0 && !isNaN(height) && height > 0)
  }

  return true
}

let ready = $ref(false)
onMounted(async () => {
  // create new instance and set to state
  const { fitView, ...rest } = useZoomPanHelper()

  let instance: FlowInstance | null = {
    fitView: (params = { padding: 0.1 }) => fitView(params),
    ...rest,

    project(position: XYPosition) {
      return pointToRendererPoint(position, viewport, snapToGrid, snapGrid)
    },
    getElements() {
      return [...nodes, ...edges]
    },
    getNodes() {
      return nodes
    },
    getEdges() {
      return edges
    },
    toObject() {
      // we have to stringify/parse so objects containing refs (like nodes and edges) can potentially be saved in a storage
      return JSON.parse(
        JSON.stringify({
          nodes,
          edges,
          position: [viewport.x, viewport.y],
          zoom: viewport.zoom,
        } as FlowExportObject),
      )
    },
  }

  onScopeDispose(() => (instance = null))

  // wait until proper dimensions have been established, otherwise fitView will have wrong bounds when called at paneReady
  await untilDimensions(dimensions)

  // hide graph until dimensions are ready, so we don't have jumping graphs (ssr for example)
  ready = true

  setState({
    instance,
  })

  fitViewOnInit && instance.fitView()
  emits.paneReady(instance)
})
</script>

<script lang="ts">
export default {
  name: 'Transform',
}
</script>

<template>
  <div
    :key="`transform-${id}`"
    class="vue-flow__transformationpane vue-flow__container"
    :style="{ transform: `translate(${viewport.x}px,${viewport.y}px) scale(${viewport.zoom})`, opacity: ready ? undefined : 0 }"
  >
    <NodeRenderer />
    <EdgeRenderer />
    <slot />
  </div>
</template>
