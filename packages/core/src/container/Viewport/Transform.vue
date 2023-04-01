<script lang="ts" setup>
import { isClient } from '@vueuse/core'
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'

const { id, viewport, emits, d3Zoom, d3Selection, dimensions, ...rest } = useVueFlow()

const viewportReady = ref(!isClient)

until(() => d3Zoom.value && d3Selection.value && dimensions.value.width > 0 && dimensions.value.height > 0)
  .toBeTruthy()
  .then(() => {
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

    setTimeout(() => {
      viewportReady.value = true
    }, 0)
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
    :style="{
      transform: `translate(${viewport.x}px,${viewport.y}px) scale(${viewport.zoom})`,
      opacity: viewportReady ? undefined : 0,
    }"
  >
    <EdgeRenderer />

    <div class="vue-flow__edge-labels" />

    <NodeRenderer />

    <slot />
  </div>
</template>
