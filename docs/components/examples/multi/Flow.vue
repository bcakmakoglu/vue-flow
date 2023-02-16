<script setup>
import { Background } from '@vue-flow/background'
import { Panel, PanelPosition, VueFlow, isNode } from '@vue-flow/core'
import { ref } from 'vue'

const elements = ref([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 }, class: 'light' },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, class: 'light' },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 }, class: 'light' },
  { id: '4', label: 'Node 4', position: { x: 400, y: 200 }, class: 'light' },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
])

const toggleClass = () => elements.value.forEach((el) => (el.class = el.class === 'light' ? 'dark' : 'light'))

const updatePos = () =>
  elements.value.forEach((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      }
    }
  })
</script>

<template>
  <VueFlow v-model="elements" fit-view-on-init>
    <Background />

    <Panel :position="PanelPosition.TopRight">
      <button style="margin-right: 5px" @click="updatePos">update positions</button>
      <button @click="toggleClass">toggle class</button>
    </Panel>
  </VueFlow>
</template>
