<script setup>
import { ref } from 'vue'
import { Background } from '@vue-flow/background'
import { Panel, VueFlow } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
    class: 'light',
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
    class: 'light',
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 400, y: 100 },
    class: 'light',
  },
  {
    id: '4',
    data: { label: 'Node 4' },
    position: { x: 400, y: 200 },
    class: 'light',
  },
])

const edges = ref([
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
])

function toggleClass() {
  nodes.value = nodes.value.map((node) => {
    return {
      ...node,
      class: node.class === 'light' ? 'dark' : 'light',
    }
  })
}

function updatePos() {
  nodes.value = nodes.value.map((node) => {
    return {
      ...node,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    }
  })
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view-on-init>
    <Background />

    <Panel position="top-right">
      <button style="margin-right: 5px" @click="updatePos">update positions</button>
      <button @click="toggleClass">toggle class</button>
    </Panel>
  </VueFlow>
</template>
