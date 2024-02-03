<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import InteractionControls from './InteractionControls.vue'

const nodes = ref([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },
  { id: '4', label: 'Node 4', position: { x: 400, y: 200 } },
])

const edges = ref([
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
])
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" class="interactionflow" fit-view-on-init>
    <InteractionControls />
  </VueFlow>
</template>
