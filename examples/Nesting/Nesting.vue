<script lang="ts" setup>
import GroupNode from './GroupNode.vue'
import { VueFlow, Elements, Node, Edge, Connection, addEdge } from '~/index'

const elements = ref<Elements<{ label: string; group?: string }>>([
  { id: 'node-2', label: 'node-2', position: { x: 50, y: 5 } },
  {
    id: 'group-a',
    style: { zIndex: 2, width: '300px', height: '300px' },
    label: 'A',
    position: { x: 50, y: 100 },
    children: [
      {
        id: 'node-1',
        label: 'node-1',
        position: { x: 250, y: 5 },
        extent: 'parent',
      },
    ],
  },
  {
    id: 'group-b',
    style: { zIndex: 2 },
    selectable: false,
    label: 'B',
    position: { x: 500, y: 100 },
  },
])

const onConnect = (params: Edge | Connection) => addEdge(params, elements.value)
</script>
<template>
  <VueFlow v-model="elements" :node-types="['group-a', 'group-b']" @connect="onConnect">
    <template #node-group-a="aProps">
      <GroupNode v-bind="aProps" />
    </template>
    <template #node-group-b="bProps">
      <GroupNode v-bind="bProps" />
    </template>
  </VueFlow>
</template>
