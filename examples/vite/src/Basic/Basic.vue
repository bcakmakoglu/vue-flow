<script lang="ts" setup>
import type { Edge, Node } from '@vue-flow/core'
import { Background, MiniMap, Panel, VueFlow, isNode, useVueFlow } from '@vue-flow/core'

const nodes = ref<Node[]>([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 }, class: 'light' },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, class: 'light' },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 }, class: 'light' },
  { id: '4', label: 'Node 4', position: { x: 400, y: 200 }, class: 'light' },
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
])

const { onConnect, addEdges, setViewport, toObject } = useVueFlow()

onConnect(addEdges)

function updatePos() {
  return nodes.value.forEach((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      }
    }
  })
}

function logToObject() {
  return console.log(toObject())
}
function resetViewport() {
  return setViewport({ x: 0, y: 0, zoom: 1 })
}
function toggleclass() {
  return nodes.value.forEach((el) => (el.class = el.class === 'light' ? 'dark' : 'light'))
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" class="vue-flow-basic-example" fit-view-on-init>
    <Background />
    <MiniMap />
    <Controls />
    <Panel position="top-right" style="display: flex; gap: 5px">
      <button @click="resetViewport">reset viewport</button>
      <button @click="updatePos">change pos</button>
      <button @click="toggleclass">toggle class</button>
      <button @click="logToObject">toObject</button>
    </Panel>
  </VueFlow>
</template>
