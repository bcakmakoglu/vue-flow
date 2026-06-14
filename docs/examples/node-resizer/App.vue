<script setup>
import { VueFlow } from '@vue-flow/core';
import { ref } from 'vue';
import ResizableNode from './ResizableNode.vue';

const nodes = ref([
  {
    id: '1',
    type: 'resizable',
    data: { label: 'NodeResizer' },
    position: { x: 0, y: 0 },
    style: { background: '#fff', border: '2px solid black' },
  },
]);
</script>

<template>
  <VueFlow :nodes="nodes" fit-view>
    <template #node-resizable="resizableNodeProps">
      <ResizableNode :data="resizableNodeProps.data" />
    </template>
  </VueFlow>
</template>
