<script lang="ts" setup>
import ConnectionLine from './ConnectionLine.vue'
import { VueFlow, addEdge, Background, BackgroundVariant, Elements, useVueFlow } from '~/index'

const elements = ref<Elements>([
  {
    id: '1',
    type: 'input',
    label: 'Node 1',
    position: { x: 250, y: 5 },
  },
])
const { applyNodeChanges, OnNodesChange, OnConnect } = useVueFlow()
OnNodesChange(applyNodeChanges)
OnConnect((params) => (elements.value = addEdge(params, elements.value)))
</script>
<template>
  <VueFlow v-model="elements">
    <template #connection-line="props">
      <ConnectionLine v-bind="props" />
    </template>
    <Background :variant="BackgroundVariant.Lines" />
  </VueFlow>
</template>
