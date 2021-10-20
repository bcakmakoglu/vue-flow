<script lang="ts" setup>
interface MarkerProps {
  id: string
}

const props = defineProps<MarkerProps>()
</script>
<template>
  <marker
    :id="props.id"
    class="vue-flow__arrowhead"
    markerWidth="12.5"
    markerHeight="12.5"
    viewBox="-10 -10 20 20"
    orient="auto"
    refX="0"
    refY="0"
  >
    <slot></slot>
  </marker>
</template>
