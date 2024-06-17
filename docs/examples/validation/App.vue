<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import CustomInput from './CustomInput.vue'
import CustomNode from './CustomNode.vue'

const { addEdges } = useVueFlow()

const nodes = ref([
  {
    id: '0',
    type: 'input',
    position: { x: 0, y: 150 },
    // only target `B` is valid for this node
    data: { validTarget: 'B', validSource: '0' },
  },
  {
    id: 'A',
    type: 'custom',
    position: { x: 250, y: 0 },
    // no valid connections can be made for this node
    data: {},
  },
  {
    id: 'B',
    type: 'custom',
    position: { x: 250, y: 150 },
    // only source `0` is valid for this node
    data: { validTarget: 'B', validSource: '0' },
  },
  {
    id: 'C',
    type: 'custom',
    position: { x: 250, y: 300 },
    // no valid connections can be made for this node
    data: {},
  },
])

const edges = ref([])

function onConnectStart({ nodeId, handleType }) {
  console.log('on connect start', { nodeId, handleType })
}

function onConnectEnd(event) {
  console.log('on connect end', event)
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
    <template #node-input="props">
      <CustomInput :data="props.data" />
    </template>

    <template #node-custom="props">
      <CustomNode :id="props.id" :data="props.data" />
    </template>
  </VueFlow>
</template>
