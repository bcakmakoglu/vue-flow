<script lang="ts" setup>
import type { Elements } from '@vue-flow/core'
import { Panel, VueFlow, isNode, useVueFlow } from '@vue-flow/core'

import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

const nodes = ref<Elements>([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 }, class: 'light' },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, class: 'light' },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 }, class: 'light' },
  { id: '4', label: 'Node 4', position: { x: 400, y: 200 }, class: 'light' },
])

const edges = ref<Elements>([
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
])

const { onConnect, addEdges, setViewport, toObject } = useVueFlow({
  minZoom: 0.2,
  maxZoom: 4,
})

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
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    :delete-key-code="['Backspace', 'Delete']"
    fit-view-on-init
    class="vue-flow-basic-example"
  >
    <Background />
    <MiniMap node-color="red" :nodes="nodes" :edges="edges" />
    <Controls />
    <Panel position="top-right" style="display: flex; gap: 5px">
      <input />
      <button @click="resetViewport">reset viewport</button>
      <button @click="updatePos">change pos</button>
      <button @click="toggleclass">toggle class</button>
      <button @click="logToObject">toObject</button>
    </Panel>
  </VueFlow>
</template>

<style>
.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}
</style>
