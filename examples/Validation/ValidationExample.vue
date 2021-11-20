<script lang="ts" setup>
import CustomInput from './CustomInput.vue'
import CustomNode from './CustomNode.vue'
import { VueFlow, addEdge, Connection, Elements, Edge, OnConnectStartParams, FlowInstance } from '~/index'

import './validation.css'

const initialElements: Elements = [
  { id: '0', type: 'custominput', position: { x: 0, y: 150 } },
  { id: 'A', type: 'customnode', position: { x: 250, y: 0 } },
  { id: 'B', type: 'customnode', position: { x: 250, y: 150 } },
  { id: 'C', type: 'customnode', position: { x: 250, y: 300 } },
]

const onLoad = (reactFlowInstance: FlowInstance) => reactFlowInstance.fitView()
const onConnectStart = ({ nodeId, handleType }: OnConnectStartParams) => console.log('on connect start', { nodeId, handleType })
const onConnectStop = (event: MouseEvent) => console.log('on connect stop', event)
const onConnectEnd = (event: MouseEvent) => console.log('on connect end', event)

const elements = ref<Elements>(initialElements)
const onConnect = (params: Connection | Edge) => {
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
