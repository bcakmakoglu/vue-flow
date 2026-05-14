<script lang="ts" setup>
import type { Edge, Elements, Node } from '@vue-flow/core'
import { Background, VueFlow, isEdge, isNode } from '@vue-flow/core'

const initialElements: Elements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 }, class: 'light' },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 }, class: 'light' },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 }, class: 'light' },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 }, class: 'light' },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
]

const nodes = ref<Node[]>(initialElements.filter(isNode))
const edges = ref<Edge[]>(initialElements.filter(isEdge))
</script>

<template>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges" fit-view-on-init>
    <Background />
  </VueFlow>
</template>
