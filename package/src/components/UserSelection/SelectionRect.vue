<script lang="ts" setup>
interface SelectionRectProps {
  width: number
  height: number
  x: number
  y: number
}

const { width, height, x, y } = defineProps<SelectionRectProps>()
</script>
<script lang="ts">
export default {
  name: 'SelectionRect',
}
</script>
<template>
  <div
    class="vue-flow__selection"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(${x}px, ${y}px)`,
    }"
  />
</template>
