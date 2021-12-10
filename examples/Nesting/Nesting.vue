<script lang="ts" setup>
import GroupNode from './GroupNode.vue'
import { VueFlow, Elements, Node, Edge, Connection, addEdge } from '~/index'

const elements = ref<Elements<{ label: string; group?: string }>>([
  {
    id: 'node-1',
    data: { label: 'node-1', group: undefined },
    position: { x: 250, y: 5 },
    parentNode: 'group-a',
    extent: 'parent',
  },
  { id: 'node-2', data: { label: 'node-2', group: undefined }, position: { x: 50, y: 5 } },
  {
    id: 'group-a',
    style: { zIndex: 2, width: '300px', height: '300px' },
    selectable: false,
    data: { label: 'A' },
    position: { x: 50, y: 100 },
  },
  {
    id: 'group-b',
    type: 'group-b',
    style: { zIndex: 2 },
    selectable: false,
    data: { label: 'B' },
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
