<script lang="ts" setup>
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'
import { useVueFlow, useWindow } from '../../composables'
import type { Dimensions } from '../../types'

const { id, nodes, edges, viewport, snapToGrid, snapGrid, dimensions, setState, fitViewOnInit, emits, fitView, ...rest } =
  useVueFlow()

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
  // wait until proper dimensions have been established, otherwise fitView will have wrong bounds when called at paneReady
  await untilDimensions(dimensions.value)

  // hide graph until dimensions are ready, so we don't have jumping graphs (ssr for example)
  ready = true

  fitViewOnInit?.value && fitView()
  emits.paneReady({
    id,
    nodes,
    edges,
    viewport,
    snapToGrid,
    snapGrid,
    dimensions,
    setState,
    fitViewOnInit,
    fitView,
    emits,
    ...rest,
  })
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
