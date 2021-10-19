<script lang="ts" setup>
import ConnectionLine from './ConnectionLine.vue'
import Flow, { removeElements, addEdge, Background, BackgroundVariant, Elements, Connection, Edge } from '~/index'

const elements = ref<Elements>([
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
] as Elements)
const onElementsRemove = (elementsToRemove: Elements) =>
  (elements.value = removeElements(elementsToRemove, elements.value as Elements))
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value as Elements))
</script>
<template>
  <Flow :elements="elements" :custom-connection-line="ConnectionLine" @elementsRemove="onElementsRemove" @connect="onConnect">
    <Background :variant="BackgroundVariant.Lines" />
  </Flow>
</template>
