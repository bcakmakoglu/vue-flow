<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import CustomConnectionLine from './CustomConnectionLine.vue'

const nodes = ref([
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
])
</script>

<template>
  <VueFlow :nodes="nodes">
    <template #connection-line="{ sourceX, sourceY, targetX, targetY }">
      <CustomConnectionLine :source-x="sourceX" :source-y="sourceY" :target-x="targetX" :target-y="targetY" />
    </template>
  </VueFlow>
</template>
