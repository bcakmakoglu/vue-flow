<script lang="ts" setup>
interface SelectionRectProps {
  width: number
  height: number
  x: number
  y: number
}

const props = defineProps<SelectionRectProps>()
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
      width: `${props.width}px`,
      height: `${props.height}px`,
      transform: `translate(${props.x}px, ${props.y}px)`,
    }"
  />
</template>
