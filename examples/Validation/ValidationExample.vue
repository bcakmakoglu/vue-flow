<script lang="ts" setup>
import CustomInput from './CustomInput.vue'
import CustomNode from './CustomNode.vue'
import { VueFlow, addEdge, Connection, Elements, OnConnectStartParams, FlowInstance } from '~/index'

import './validation.css'

const initialElements: Elements = [
  { id: '0', type: 'custominput', position: { x: 0, y: 150 }, isValidTargetPos: (connection) => connection.target === 'B' },
  {
    id: 'A',
    type: 'customnode',
    position: { x: 250, y: 0 },
    isValidSourcePos: (connection) => {
      console.log(connection)
      return false
    },
  },
  { id: 'B', type: 'customnode', position: { x: 250, y: 150 }, isValidSourcePos: (connection) => connection.target === 'B' },
  { id: 'C', type: 'customnode', position: { x: 250, y: 300 }, isValidSourcePos: (connection) => connection.target === 'B' },
]

const onLoad = (flowInstance: FlowInstance) => flowInstance.fitView()
const onConnectStart = ({ nodeId, handleType }: OnConnectStartParams) => console.log('on connect start', { nodeId, handleType })
const onConnectStop = (event: MouseEvent) => console.log('on connect stop', event)
const onConnectEnd = (event: MouseEvent) => console.log('on connect end', event)

const elements = ref<Elements>(initialElements)
const onConnect = (params: Connection) => {
  console.log('on connect', params)
  elements.value = addEdge(params, elements.value)
}
</script>
<template>
  <VueFlow
    v-model="elements"
    :select-nodes-on-drag="false"
    :node-types="['custominput', 'customnode']"
    class="validationflow"
    @connect="onConnect"
    @oad="onLoad"
    @connect-start="onConnectStart"
    @connect-stop="onConnectStop"
    @connect-end="onConnectEnd"
  >
    <template #node-custominput="props">
      <CustomInput v-bind="props" />
    </template>
    <template #node-customnode="props">
      <CustomNode v-bind="props" />
    </template>
  </VueFlow>
</template>
