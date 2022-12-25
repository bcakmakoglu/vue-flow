<script lang="ts" setup>
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'
import type { Dimensions } from '../../types'

const { id, viewport, dimensions, fitViewOnInit, emits, fitView, ...rest } = useVueFlow()

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

  emits.paneReady({
    id,
    viewport,
    dimensions,
    fitViewOnInit,
    fitView,
    emits,
    ...rest,
  })

  fitViewOnInit?.value && fitView()
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
    <EdgeRenderer />

    <div class="vue-flow__edge-labels" />

    <NodeRenderer />

    <slot />
  </div>
</template>
