<script lang="ts" setup>
import { ref } from 'vue'
import type { Elements, FlowEvents, VueFlowStore } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ConnectionMode, VueFlow, useVueFlow } from '@vue-flow/core'
import CustomEdge from './CustomEdge.vue'
import CustomNode from './CustomNode.vue'
import { Controls } from '@vue-flow/controls'

import '@vue-flow/controls/dist/style.css'

const initialElements: Elements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node <strong>A</strong>' },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    type: 'custom',
    data: { label: 'Node <strong>B</strong>' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Node <strong>C</strong>' },
    position: { x: 400, y: 100 },
    style: { background: '#D6D5E6', color: '#333', border: '1px solid #222138', width: 180 },
  },
  { id: 'e1-2', source: '1', target: '2', label: 'Updatable target', updatable: 'target',type: 'custom' },
]

const { updateEdge, addEdges } = useVueFlow()

const elements = ref(initialElements)

function onLoad(flowInstance: VueFlowStore) {
  return flowInstance.fitView()
}

function onEdgeUpdateStart({ edge }: FlowEvents['edgeUpdateStart']) {
  return console.log('start update', edge)
}

function onEdgeUpdateEnd({ edge }: FlowEvents['edgeUpdateEnd']) {
  return console.log('end update', edge)
}

function onEdgeUpdate({ edge, connection }: FlowEvents['edgeUpdate']) {
  return updateEdge(edge, connection)
}
</script>

<template>
  <VueFlow
    v-model="elements"
    :snap-to-grid="true"
    fit-view-on-init
    :nodes-connectable="true"
    :keepEdgeTypeDuringUpdate="true"
    @pane-ready="onLoad"
    @edge-update="onEdgeUpdate"
    @edge-update-start="onEdgeUpdateStart"
    @edge-update-end="onEdgeUpdateEnd"
    @connect="addEdges"
  >
    <Controls />

    <template #edge-custom="customEdgeProps">
      <CustomEdge v-bind="customEdgeProps" />
    </template>
    <template #node-custom="customNodeProps">
      <CustomNode v-bind="customNodeProps" />
    </template>
  </VueFlow>
</template>
