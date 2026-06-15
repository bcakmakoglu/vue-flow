<script setup>
import { Background, useVueFlow, VueFlow } from '@vue-flow/core';
import { ref } from 'vue';

const { reconnectEdge, addEdges } = useVueFlow();

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
]);

const edges = ref([{ id: 'e1-2', source: '1', target: '2', label: 'Updateable edge', reconnectable: true }]);

function onReconnectStart(edge) {
  console.log('start update', edge);
}

function onReconnectEnd(edge) {
  console.log('end update', edge);
}

function onReconnect({ edge, connection }) {
  reconnectEdge(edge, connection);
}

function onConnect(params) {
  addEdges([params]);
}
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    fit-view
    @reconnect="onReconnect"
    @connect="onConnect"
    @reconnect-start="onReconnectStart"
    @reconnect-end="onReconnectEnd"
  >
    <Background />
  </VueFlow>
</template>
