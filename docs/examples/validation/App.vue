<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import CustomInput from './CustomInput.vue'
import CustomNode from './CustomNode.vue'

const { addEdges } = useVueFlow()

const nodes = ref([
  { id: '0', type: 'custominput', position: { x: 0, y: 150 }, isValidTargetPos: (connection) => connection.target === 'B' },
  {
    id: 'A',
    type: 'custom',
    position: { x: 250, y: 0 },
    isValidSourcePos: () => false,
  },
  { id: 'B', type: 'custom', position: { x: 250, y: 150 }, isValidSourcePos: (connection) => connection.target === 'B' },
  { id: 'C', type: 'custom', position: { x: 250, y: 300 }, isValidSourcePos: (connection) => connection.target === 'B' },
])

const edges = ref([])

function onConnectStart({ nodeId, handleType }) {
  return console.log('on connect start', { nodeId, handleType })
}

function onConnectEnd(event) {
  return console.log('on connect end', event)
}

function onConnect(params) {
  console.log('on connect', params)
  addEdges(params)
}
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    fit-view-on-init
    class="validationflow"
    @connect="onConnect"
    @connect-start="onConnectStart"
    @connect-end="onConnectEnd"
  >
    <template #node-custominput="props">
      <CustomInput v-bind="props" />
    </template>

    <template #node-custom="props">
      <CustomNode v-bind="props" />
    </template>
  </VueFlow>
</template>
