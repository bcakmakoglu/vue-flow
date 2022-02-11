<script lang="ts" setup>
import { VueFlow, Elements } from '@braks/vue-flow'

const elementsA: Elements = [
  { id: '1a', type: 'input', label: 'Node 1', position: { x: 250, y: 5 }, class: 'light' },
  { id: '2a', label: 'Node 2', position: { x: 100, y: 100 }, class: 'light' },
  { id: '3a', label: 'Node 3', position: { x: 400, y: 100 }, class: 'light' },
  { id: '4a', label: 'Node 4', position: { x: 400, y: 200 }, class: 'light' },
  { id: 'e1-2', source: '1a', target: '2a' },
  { id: 'e1-3', source: '1a', target: '3a' },
]

const elementsB: Elements = [
  { id: 'inputb', type: 'input', label: 'Input', position: { x: 300, y: 5 }, class: 'light' },
  { id: '1b', label: 'Node 1', position: { x: 0, y: 100 }, class: 'light' },
  { id: '2b', label: 'Node 2', position: { x: 200, y: 100 }, class: 'light' },
  { id: '3b', label: 'Node 3', position: { x: 400, y: 100 }, class: 'light' },
  { id: '4b', label: 'Node 4', position: { x: 600, y: 100 }, class: 'light' },

  { id: 'e1b', source: 'inputb', target: '1b' },
  { id: 'e2b', source: 'inputb', target: '2b' },
  { id: 'e3b', source: 'inputb', target: '3b' },
  { id: 'e4b', source: 'inputb', target: '4b' },
]

const elements = ref(elementsA)
</script>
<template>
  <VueFlow v-model="elements">
    <div :style="{ position: 'absolute', right: 10, top: 10, zIndex: 4 }">
      <button style="margin-right: 5px" @click="() => (elements = elementsA)">flow a</button>
      <button @click="() => (elements = elementsB)">flow b</button>
    </div>
  </VueFlow>
</template>
