<script lang="ts" setup>
import { VueFlow } from '@vue-flow/core'
import ResizableNode from './ResizableNode.vue'

const elements = ref([
  {
    id: '1',
    type: 'resizable',
    label: 'NodeResizer',
    position: { x: 0, y: 50 },
    style: { background: '#fff', border: '1px solid black', borderRadius: '15px', fontSize: '12px' },
  },
  {
    id: '2',
    type: 'resizableSelected',
    label: 'NodeResizer when selected',
    position: { x: 100, y: 300 },
    style: { background: '#fff', border: '1px solid black', borderRadius: '15px', fontSize: '12px' },
  },
  {
    id: '3',
    type: 'custom-resizable',
    label: 'Custom Resize Icon',
    position: { x: 150, y: 150 },
    style: {
      background: '#fff',
      fontSize: '12px',
      border: '1px solid black',
      padding: '5px',
      borderRadius: '15px',
      height: '100px',
    },
  },
])
</script>

<template>
  <VueFlow v-model="elements" fit-view-on-init class="vue-flow-basic-example">
    <template #node-resizable="resizableNodeProps">
      <ResizableNode :label="resizableNodeProps.label" />
    </template>
  </VueFlow>
</template>
