<script lang="ts" setup>
import type { Connection, Node, OnConnectStartParams, VueFlowStore } from '@vue-flow/core'
import { VueFlow } from '@vue-flow/core'
import CustomInput from './CustomInput.vue'
import CustomNode from './CustomNode.vue'

const flow = ref<VueFlowStore>()

const nodes = ref<Node[]>([
  {
    id: '0',
    type: 'custominput',
    position: { x: 0, y: 150 },
    data: { isValidTargetPos: (connection: Connection) => connection.target === 'B' },
  },
  {
    id: 'A',
    type: 'customnode',
    position: { x: 250, y: 0 },
    data: { isValidSourcePos: () => false },
  },
  {
    id: 'B',
    type: 'customnode',
    position: { x: 250, y: 150 },
    data: { isValidSourcePos: (connection: Connection) => connection.target === 'B' },
  },
  {
    id: 'C',
    type: 'customnode',
    position: { x: 250, y: 300 },
    data: { isValidSourcePos: (connection: Connection) => connection.target === 'B' },
  },
])

function onConnectStart({ nodeId, handleType }: OnConnectStartParams) {
  return console.log('on connect start', { nodeId, handleType })
}

function onConnectEnd(event: MouseEvent) {
  return console.log('on connect end', event)
}

function onConnect(params: Connection) {
  console.log('on connect', params)
  flow.value?.addEdges(params)
}
</script>

<template>
  <VueFlow
    ref="flow"
    :nodes="nodes"
    :select-nodes-on-drag="false"
    class="validationflow"
    @connect="onConnect"
    @connect-start="onConnectStart"
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

<style>
@import 'validation.css';
</style>
