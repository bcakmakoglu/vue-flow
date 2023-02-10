<script lang="ts" setup>
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'

const { id, viewport, emits, onNodesInitialized, ...rest } = useVueFlow()

let isReady = $ref(false)

onNodesInitialized(() => {
  setTimeout(() => {
    // hide graph until nodes are ready, so we don't have jumping nodes
    isReady = true
  }, 0)
})

onMounted(async () => {
  setTimeout(() => {
    emits.paneReady({
      id,
      viewport,
      emits,
      onNodesInitialized,
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
    :style="{ transform: `translate(${viewport.x}px,${viewport.y}px) scale(${viewport.zoom})`, opacity: isReady ? undefined : 0 }"
  >
    <EdgeRenderer />

    <div class="vue-flow__edge-labels" />

    <NodeRenderer />

    <slot />
  </div>
</template>
