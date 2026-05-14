<script lang="ts" setup>
import type { Edge, Elements, Node } from '@vue-flow/core'
import { VueFlow, isEdge, isNode } from '@vue-flow/core'
import Controls from './Controls.vue'

const initialElements: Elements = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
]

const nodes = ref<Node[]>(initialElements.filter(isNode))
const edges = ref<Edge[]>(initialElements.filter(isEdge))
</script>

<template>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges">
    <Controls />
  </VueFlow>
</template>

<style>
@import 'save.css';
</style>
