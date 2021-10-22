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
])
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
</script>
<template>
  <Flow :elements="elements" @elements-remove="onElementsRemove" @connect="onConnect">
    <template #custom-connection-line="props">
      <ConnectionLine v-bind="props" />
    </template>
    <Background :variant="BackgroundVariant.Lines" />
  </Flow>
</template>
