<script setup>
import { VueFlow } from '@vue-flow/core'
import { ref } from 'vue'
import ConnectionLine from './SnappableConnectionLine.vue'

const elements = ref([
  {
    id: '1',
    label: 'Node 1',
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    label: 'Node 2',
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    label: 'Node 3',
    position: { x: 200, y: 0 },
  },
])
</script>

<template>
  <VueFlow v-model="elements" auto-connect fit-view-on-init>
    <template #connection-line="{ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }">
      <ConnectionLine
        :source-x="sourceX"
        :source-y="sourceY"
        :target-x="targetX"
        :target-y="targetY"
        :source-position="sourcePosition"
        :target-position="targetPosition"
      />
    </template>
  </VueFlow>
</template>
