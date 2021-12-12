<script lang="ts" setup>
import GroupNode from './GroupNode.vue'
import { VueFlow, Elements, Node, Edge, Connection, addEdge } from '~/index'

const elements = ref<Elements<{ label: string; group?: string }>>([
  { id: 'node-2', label: 'node-2', position: { x: 50, y: 5 } },
  {
    id: 'group-a',
    type: 'group',
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
  <VueFlow v-model="elements" @connect="onConnect">
    <template #node-group="aProps">
      <GroupNode v-bind="aProps" />
    </template>
  </VueFlow>
</template>
