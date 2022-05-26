<script setup>
import { Background, ConnectionMode, Controls, MiniMap, VueFlow, useVueFlow } from '@braks/vue-flow'
import { onMounted } from 'vue'

const { onConnect, nodes, edges, addEdges, addNodes } = useVueFlow({
  fitViewOnInit: true,
  connectionMode: ConnectionMode.Loose,
  nodes: [
    { id: '1', type: 'input', label: 'node', position: { x: 250, y: 0 }, class: 'light' },
    {
      id: '2',
      label: 'parent node',
      position: { x: 100, y: 100 },
      class: 'light',
      style: { backgroundColor: 'rgba(16, 185, 129, 0.5)', width: '200px', height: '200px' },
    },
    {
      id: '2a',
      label: 'child node',
      position: { x: 10, y: 50 },
      parentNode: '2',
    },
    { id: '3', label: 'node', position: { x: 350, y: 100 }, class: 'light' },
    {
      id: '4',
      label: 'parent node',
      position: { x: 320, y: 300 },
      class: 'light',
      style: { backgroundColor: 'rgba(16, 185, 129, 0.5)', width: '300px', height: '300px' },
    },
    {
      id: '4a',
      label: 'child node',
      position: { x: 15, y: 65 },
      class: 'light',
      extent: 'parent',
      parentNode: '4',
    },
    {
      id: '4b',
      label: 'nested parent node',
      position: { x: 15, y: 120 },
      class: 'light',
      style: { backgroundColor: 'rgba(139, 92, 246, 0.5)', height: '150px', width: '270px' },
      parentNode: '4',
    },
    {
      id: '4b1',
      label: 'nested child node',
      position: { x: 20, y: 40 },
      class: 'light',
      parentNode: '4b',
    },
    {
      id: '4b2',
      label: 'nested child node',
      position: { x: 100, y: 100 },
      class: 'light',
      parentNode: '4b',
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e2a-4a', source: '2a', target: '4a' },
    { id: 'e3-4', source: '3', target: '4' },
    { id: 'e3-4b', source: '3', target: '4b' },
    { id: 'e4a-4b1', source: '4a', target: '4b1' },
    { id: 'e4a-4b2', source: '4a', target: '4b2' },
    { id: 'e4b1-4b2', source: '4b1', target: '4b2' },
  ],
})

onConnect((params) => addEdges([params]))

onMounted(() => {
  // add nodes to parent
  addNodes([
    {
      id: '999',
      type: 'input',
      label: 'Drag me to extend area!',
      position: { x: 20, y: 100 },
      class: 'light',
      expandParent: true,
      parentNode: '2',
    },
  ])
})
</script>

<template>
  <VueFlow>
    <MiniMap />
    <Controls />
    <Background />
  </VueFlow>
</template>
