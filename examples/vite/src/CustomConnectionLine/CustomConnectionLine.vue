<script setup>
import { VueFlow } from '@vue-flow/core'
import ConnectionLine from './ConnectionLine.vue'

const elements = ref([
  {
    id: '1',
    type: 'input',
    label: 'Node 1',
    position: { x: 250, y: 5 },
  },
])
</script>

<template>
  <VueFlow v-model="elements">
    <template #connection-line="{ sourceX, sourceY, targetX, targetY }">
      <ConnectionLine :source-x="sourceX" :source-y="sourceY" :target-x="targetX" :target-y="targetY" />
    </template>
  </VueFlow>
</template>
