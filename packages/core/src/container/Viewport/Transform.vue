<script lang="ts" setup>
import { useVueFlow } from '../../composables'
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'

const { viewport, fitViewOnInitDone } = useVueFlow()
</script>

<script lang="ts">
export default {
  name: 'Transform',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <div
    class="vue-flow__transformationpane vue-flow__container"
    :style="{
      transform: `translate(${viewport.x}px,${viewport.y}px) scale(${viewport.zoom})`,
      opacity: fitViewOnInitDone ? undefined : 0,
    }"
  >
    <EdgeRenderer />

    <div class="vue-flow__edge-labels" />

    <NodeRenderer />

    <slot />
  </div>
</template>
