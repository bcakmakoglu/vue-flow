<script lang="ts" setup>
import type { Elements } from '../../packages/vue-flow'
import { VueFlow } from '../../packages/vue-flow'
import Controls from './Controls.vue'

const initialElements: Elements = [
  { id: '1', label: 'Node 1', position: { x: 100, y: 100 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
]

const elements = ref(initialElements)
</script>

<template>
  <VueFlow v-model="elements">
    <Controls />
  </VueFlow>
</template>

<style>
@import 'save.css';
</style>
