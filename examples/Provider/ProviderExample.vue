<script lang="ts" setup>
import Sidebar from './Sidebar.vue'
import {
  VueFlow,
  addEdge,
  Controls,
  FlowInstance,
  FlowElement,
  Connection,
  Edge,
  Elements,
  ConnectionMode,
  useVueFlow,
} from '~/index'

import './provider.css'

const onElementClick = (element: FlowElement) => console.log('click', element)
const onLoad = (flowInstance: FlowInstance) => console.log('flow loaded:', flowInstance)

const initialElements: Elements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
]

useVueFlow()
const elements = ref<Elements>(initialElements)
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
</script>
<template>
  <div class="providerflow">
    <Sidebar />
    <div class="vue-flow-wrapper">
      <VueFlow
        v-model="elements"
        :connection-mode="ConnectionMode.Loose"
        @element-click="onElementClick"
        @connect="onConnect"
        @elements-remove="onElementsRemove"
        @load="onLoad"
      >
        <Controls />
      </VueFlow>
    </div>
  </div>
</template>
