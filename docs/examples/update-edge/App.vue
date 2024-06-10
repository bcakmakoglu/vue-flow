<script setup>
import { ref } from 'vue'
import { Background } from '@vue-flow/background'
import { VueFlow, useVueFlow } from '@vue-flow/core'

const { updateEdge, addEdges } = useVueFlow()

const nodes = ref([
  {
    id: '1',
    type: 'input',
    data: { label: 'Node <strong>A</strong>' },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Node <strong>B</strong>' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Node <strong>C</strong>' },
    position: { x: 400, y: 100 },
    style: { background: '#D6D5E6', color: '#333', border: '1px solid #222138', width: 180 },
  },
])

const edges = ref([{ id: 'e1-2', source: '1', target: '2', label: 'Updateable edge', updatable: true }])

function onEdgeUpdateStart(edge) {
  console.log('start update', edge)
}

function onEdgeUpdateEnd(edge) {
  console.log('end update', edge)
}

function onEdgeUpdate({ edge, connection }) {
  updateEdge(edge, connection)
}

function onConnect(params) {
  addEdges([params])
}
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    fit-view-on-init
    @edge-update="onEdgeUpdate"
    @connect="onConnect"
    @edge-update-start="onEdgeUpdateStart"
    @edge-update-end="onEdgeUpdateEnd"
  >
    <Background />
  </VueFlow>
</template>
