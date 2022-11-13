<script setup>
import { Background } from '@vue-flow/additional-components'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { ref } from 'vue'

const elements = ref([
  {
    id: '1',
    type: 'input',
    label: 'Node <strong>A</strong>',
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    label: 'Node <strong>B</strong>',
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    label: 'Node <strong>C</strong>',
    position: { x: 400, y: 100 },
    style: { background: '#D6D5E6', color: '#333', border: '1px solid #222138', width: 180 },
  },
  { id: 'e1-2', source: '1', target: '2', label: 'Updateable edge', updatable: true },
])

const { updateEdge, addEdges } = useVueFlow()

const onEdgeUpdateStart = (edge) => console.log('start update', edge)

const onEdgeUpdateEnd = (edge) => console.log('end update', edge)

const onEdgeUpdate = ({ edge, connection }) => updateEdge(edge, connection)

const onConnect = (params) => addEdges([params])
</script>

<template>
  <VueFlow
    v-model="elements"
    fit-view-on-init
    @edge-update="onEdgeUpdate"
    @connect="onConnect"
    @edge-update-start="onEdgeUpdateStart"
    @edge-update-end="onEdgeUpdateEnd"
  >
    <Background />
  </VueFlow>
</template>
