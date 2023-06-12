<script setup>
import { Panel, VueFlow, isNode, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { nextTick, ref } from 'vue'
import { getElements } from './utils.js'

const { nodes, edges } = getElements(15, 15)

const elements = ref([...nodes, ...edges])

const { onPaneReady, dimensions, fitView } = useVueFlow()

onPaneReady(({ fitView, getElements }) => {
  fitView({ padding: 0.2 })

  console.log(getElements.value)
})

function toggleClass() {
  return elements.value.forEach((el) => (el.class = el.class === 'light' ? 'dark' : 'light'))
}

function updatePos() {
  elements.value.forEach((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 10 * dimensions.value.width,
        y: Math.random() * 10 * dimensions.value.height,
      }
    }
  })

  nextTick(() => {
    fitView({ duration: 1000, padding: 0.5 })
  })
}
</script>

<template>
  <VueFlow v-model="elements" :min-zoom="0.1">
    <MiniMap />

    <Background />

    <Panel position="top-right">
      <button style="margin-right: 5px" @click="updatePos">update positions</button>
      <button @click="toggleClass">toggle class</button>
    </Panel>
  </VueFlow>
</template>
