<script lang="ts" setup>
import type { Elements } from '../../packages/vue-flow'
import { Background, VueFlow } from '../../packages/vue-flow'
const initialElements: Elements = [
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 }, class: 'light' },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, class: 'light' },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 }, class: 'light' },
  { id: '4', label: 'Node 4', position: { x: 400, y: 200 }, class: 'light' },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
]

const elements = ref<Elements>(initialElements)
</script>

<template>
  <VueFlow v-model="elements" :fit-view-on-init="true">
    <Background />
  </VueFlow>
</template>
