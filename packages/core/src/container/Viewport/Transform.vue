<script lang="ts" setup>
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'

const { id, viewport, emits, d3Zoom, d3Selection, dimensions, ...rest } = useVueFlow()

until(() => d3Zoom.value && d3Selection.value && dimensions.value.width > 0 && dimensions.value.height > 0)
  .toBeTruthy()
  .then(() => {
    setTimeout(() => {
      // emit pane ready event
      emits.paneReady({
        id,
        viewport,
        emits,
        d3Zoom,
        d3Selection,
        dimensions,
        ...rest,
      })
    }, 1)
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
    :style="{ transform: `translate(${viewport.x}px,${viewport.y}px) scale(${viewport.zoom})` }"
  >
    <EdgeRenderer />

    <div class="vue-flow__edge-labels" />

    <NodeRenderer />

    <slot />
  </div>
</template>
