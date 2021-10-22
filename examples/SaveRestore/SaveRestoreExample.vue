<script lang="ts" setup>
import Controls from './Controls.vue'
import Flow, { addEdge, Connection, Node, Edge, Elements, FlowInstance, removeElements } from '~/index'

import './save.css'

const initialElements: Elements = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
]

const elements = ref(initialElements)
const flowInstance = ref()

const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onLoad = (instance: FlowInstance) => (flowInstance.value = instance)
const onRestore = (els: Elements) => (elements.value = els)
const onAdd = (el: Node) => (elements.value = elements.value.concat(el))
</script>
<template>
  <Flow :elements="elements" @elements-remove="onElementsRemove" @connect="onConnect" @load="onLoad">
    <Controls :flow-instance="flowInstance" @restore="onRestore" @add="onAdd" />
  </Flow>
</template>
