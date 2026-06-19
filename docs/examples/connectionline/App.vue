<script setup>
import { VueFlow } from '@vue-flow/core';
import { ref } from 'vue';
import CustomConnectionLine from './CustomConnectionLine.vue';

const nodes = ref([
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
]);
</script>

<template>
  <VueFlow :nodes="nodes">
    <template #connection-line="{ fromX, fromY, toX, toY }">
      <CustomConnectionLine :from-x="fromX" :from-y="fromY" :to-x="toX" :to-y="toY" />
    </template>
  </VueFlow>
</template>
