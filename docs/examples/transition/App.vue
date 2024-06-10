<script setup>
import { ref } from 'vue'
import { Position, VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import TransitionEdge from './TransitionEdge.vue'

const { onInit } = useVueFlow()

const nodes = ref([
  {
    id: '1',
    type: 'input',
    data: { label: 'DblClick me' },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
  },
  {
    id: '2',
    type: 'output',
    data: { label: 'DblClick me' },
    position: { x: 1000, y: 1000 },
    targetPosition: Position.Left,
  },
])

const edges = ref([{ id: 'e1-2', type: 'custom', source: '1', target: '2', style: { stroke: '#fff' } }])

onInit(({ fitView }) => {
  fitView({ nodes: ['1'] })
})
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" class="transition-flow">
    <Background />

    <template #edge-custom="props">
      <TransitionEdge v-bind="props" />
    </template>
  </VueFlow>
</template>

<style>
.transition-flow {
  background-color: #1a192b;
}
</style>
