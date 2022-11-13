<script setup>
import { ref } from 'vue'
import { Position, VueFlow, useVueFlow } from '@vue-flow/core'
import TransitionEdge from './TransitionEdge.vue'

const elements = ref([
  {
    id: '1',
    type: 'input',
    label: 'Dblclick me',
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
  },
  {
    id: '2',
    type: 'output',
    label: 'Dblclick me',
    position: { x: 1000, y: 1000 },
    targetPosition: Position.Left,
  },

  { id: 'e1-2', type: 'custom', source: '1', target: '2', animated: true, style: { stroke: '#fff' } },
])

const { onPaneReady } = useVueFlow()

onPaneReady((i) => {
  i.fitView({
    nodes: ['1'],
  })
})
</script>

<template>
  <VueFlow v-model="elements" :style="{ backgroundColor: '#1A192B' }">
    <template #edge-custom="props">
      <TransitionEdge v-bind="props" />
    </template>
  </VueFlow>
</template>
