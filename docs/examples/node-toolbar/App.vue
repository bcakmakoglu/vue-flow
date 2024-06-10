<script setup>
import { ref } from 'vue'
import { Position, VueFlow } from '@vue-flow/core'
import ToolbarNode from './ToolbarNode.vue'

const nodes = ref([
  {
    id: '1',
    type: 'menu',
    data: { label: 'toolbar top', toolbarPosition: Position.Top },
    position: { x: 200, y: 0 },
  },
  {
    id: '2',
    type: 'menu',
    data: { label: 'toolbar right', toolbarPosition: Position.Right },
    position: { x: -50, y: 100 },
  },
  {
    id: '3',
    type: 'menu',
    data: { label: 'toolbar bottom', toolbarPosition: Position.Bottom },
    position: { x: 0, y: 200 },
  },
  {
    id: '4',
    type: 'menu',
    data: { label: 'toolbar left', toolbarPosition: Position.Left },
    position: { x: 200, y: 300 },
  },
  {
    id: '5',
    type: 'menu',
    data: { label: 'toolbar always open', toolbarPosition: Position.Top, toolbarVisible: true },
    position: { x: 0, y: -100 },
  },
])
</script>

<template>
  <VueFlow :nodes="nodes" fit-view-on-init>
    <template #node-menu="props">
      <ToolbarNode :id="props.id" :data="props.data" />
    </template>
  </VueFlow>
</template>

<style>
.vue-flow__node-toolbar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background-color: #2d3748;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.vue-flow__node-toolbar button {
  background: #4a5568;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.vue-flow__node-toolbar button.selected {
  background: #2563eb;
}

.vue-flow__node-toolbar button:hover {
  background: #2563eb;
}

.vue-flow__node-menu {
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.vue-flow__node-menu.selected {
  box-shadow: 0 0 0 2px #2563eb;
}
</style>
