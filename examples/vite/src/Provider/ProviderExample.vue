<script lang="ts" setup>
import type { Edge, Elements, Node } from '@vue-flow/core'
import { Controls, VueFlow, isEdge, isNode, useVueFlow } from '@vue-flow/core'

import Sidebar from './Sidebar.vue'

const initialElements: Elements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
]

useVueFlow()

const nodes = ref<Node[]>(initialElements.filter(isNode))
const edges = ref<Edge[]>(initialElements.filter(isEdge))
</script>

<template>
  <div class="providerflow">
    <Sidebar />

    <div class="vue-flow-wrapper">
      <VueFlow v-model:nodes="nodes" v-model:edges="edges">
        <Controls />
      </VueFlow>
    </div>
  </div>
</template>

<style>
@import 'provider.css';
</style>
