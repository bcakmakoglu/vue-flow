<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import ConnectionLine from './SnappableConnectionLine.vue'

const nodes = ref([
  {
    id: '1',
    data: { label: 'Node 1' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 200, y: 0 },
  },
])
</script>

<template>
  <VueFlow :nodes="nodes" :connection-radius="30" auto-connect fit-view-on-init>
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
