<script setup>
import { VueFlow, addEdge } from '@braks/vue-flow'
import { ref } from 'vue'
import CustomInput from './CustomInput.vue'
import CustomNode from './CustomNode.vue'

const elements = ref([
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

const onLoad = (flowInstance) => flowInstance.fitView()
const onConnectStart = ({ nodeId, handleType }) => console.log('on connect start', { nodeId, handleType })
const onConnectStop = (event) => console.log('on connect stop', event)
const onConnectEnd = (event) => console.log('on connect end', event)

const onConnect = (params) => {
  console.log('on connect', params)
  addEdge(params, elements.value)
}
</script>

<template>
  <VueFlow
    v-model="elements"
    @connect="onConnect"
    @pane-ready="onLoad"
    @connect-start="onConnectStart"
    @connect-stop="onConnectStop"
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
