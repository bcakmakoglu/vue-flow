<script setup>
import { VueFlow } from '@braks/vue-flow'
import { ref } from 'vue'
import InteractionControls from './InteractionControls.vue'

const elements = ref([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },
  { id: '4', label: 'Node 4', position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
])
</script>

<template>
  <VueFlow class="interactionflow" v-model="elements" :fit-view-on-init="true">
    <InteractionControls />
  </VueFlow>
</template>
