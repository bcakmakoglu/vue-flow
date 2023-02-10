<script lang="ts" setup>
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'
import type { Dimensions } from '../../types'

const { id, viewport, dimensions, emits, onNodesInitialized, ...rest } = useVueFlow()

const untilDimensions = async (dim: Dimensions) => {
  // if ssr we can't wait for dimensions, they'll never really exist
  const window = useWindow()
  if ('screen' in window) {
    // wait until viewport dimensions has been established
    await until(dim).toMatch(({ height, width }) => !isNaN(width) && width > 0 && !isNaN(height) && height > 0)
  }

  return true
}

let isReady = $ref(false)

onNodesInitialized(() => {
  setTimeout(() => {
    // hide graph until nodes are ready, so we don't have jumping graphs (ssr for example)
    isReady = true
  }, 0)
})

onMounted(async () => {
  // wait until proper dimensions have been established, otherwise fitView will have wrong bounds when called at paneReady
  await untilDimensions(dimensions.value)

  emits.paneReady({
    id,
    viewport,
    dimensions,
    emits,
    onNodesInitialized,
    ...rest,
  })
})
</script>

<script lang="ts">
export default {
  name: 'Transform',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <div
    :key="`transform-${id}`"
    class="vue-flow__transformationpane vue-flow__container"
    :style="{ transform: `translate(${viewport.x}px,${viewport.y}px) scale(${viewport.zoom})`, opacity: isReady ? undefined : 0 }"
  >
    <EdgeRenderer />

    <div class="vue-flow__edge-labels" />

    <NodeRenderer />

    <slot />
  </div>
</template>
