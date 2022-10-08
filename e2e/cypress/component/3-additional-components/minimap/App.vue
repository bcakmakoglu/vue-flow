<script setup>
import { MiniMap, VueFlow } from '@vue-flow/core'

defineProps({
  nodes: {
    type: Array,
    default: () => [],
  },
  edges: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <MiniMap />
  </VueFlow>
</template>
