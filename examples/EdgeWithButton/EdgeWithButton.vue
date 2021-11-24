<script lang="ts" setup>
import ButtonEdge from './ButtonEdge.vue'
import {
  VueFlow,
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  Elements,
  MiniMap,
  FlowInstance,
  removeElements,
} from '~/index'

const elements = ref<Elements>([
  {
    id: 'ewb-1',
    type: 'input',
    data: { label: 'Input 1' },
    position: { x: 250, y: 0 },
  },
  { id: 'ewb-2', data: { label: 'Node 2' }, position: { x: 250, y: 300 } },
  {
    id: 'edge-1-2',
    source: 'ewb-1',
    target: 'ewb-2',
    type: 'button',
  },
])

const onLoad = (flowInstance: FlowInstance) => flowInstance.fitView()
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Connection | Edge) => (elements.value = addEdge({ ...params, type: 'button' } as Edge, elements.value))
</script>
<template>
  <VueFlow
    key="edge-with-button"
    v-model="elements"
    :snap-to-grid="true"
    :edge-types="['button']"
    @load="onLoad"
    @elementsRemove="onElementsRemove"
    @connect="onConnect"
  >
    <template #edge-button="props">
      <ButtonEdge v-bind="props" />
    </template>
    <MiniMap />
    <Controls />
    <Background />
  </VueFlow>
</template>
