<script setup>
import { VueFlow } from '@vue-flow/core';
import { ref } from 'vue';
import ConnectionLine from './SnappableConnectionLine.vue';

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
]);
</script>

<template>
  <VueFlow :nodes="nodes" :connection-radius="30" auto-connect fit-view>
    <template #connection-line="{ fromX, fromY, toX, toY, fromPosition, toPosition }">
      <ConnectionLine
        :from-x="fromX"
        :from-y="fromY"
        :to-x="toX"
        :to-y="toY"
        :from-position="fromPosition"
        :to-position="toPosition"
      />
    </template>
  </VueFlow>
</template>
