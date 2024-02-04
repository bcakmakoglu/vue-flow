<script lang="ts" setup>
import { useVueFlow } from '../../composables'

const { viewport } = useVueFlow()
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
    :style="{ transform: `translate(${viewport.x}px,${viewport.y}px) scale(${viewport.zoom})` }"
  >
    <slot />
  </div>
</template>
