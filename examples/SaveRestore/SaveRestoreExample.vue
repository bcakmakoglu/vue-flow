<script lang="ts" setup>
import Controls from './Controls.vue'
import { VueFlow, addEdge, Connection, Edge, Elements, removeElements } from '~/index'

import './save.css'

const initialElements: Elements = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
]

const elements = ref(initialElements)

const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onRestore = (els: Elements) => (elements.value = els)
</script>
<template>
  <VueFlow v-model="elements" storage-key="vue-flow-123" @elements-remove="onElementsRemove" @connect="onConnect">
    <Controls @restore="onRestore" />
  </VueFlow>
</template>
