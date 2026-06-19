<script setup>
import { Background, Position, VueFlow } from '@vue-flow/core';
import { ref } from 'vue';
import TransitionEdge from './TransitionEdge.vue';

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
]);

const edges = ref([{ id: 'e1-2', type: 'custom', source: '1', target: '2', style: { stroke: '#fff' } }]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" :fit-view-options="{ nodes: [{ id: '1' }] }" class="transition-flow" fit-view>
    <Background :style="{ backgroundColor: '#1a192b' }" />

    <template #edge-custom="props">
      <TransitionEdge v-bind="props" />
    </template>
  </VueFlow>
</template>
