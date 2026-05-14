<script setup>
import { Background, Panel, VueFlow, useVueFlow } from '@vue-flow/core'
import { nextTick, ref } from 'vue'
import { getElements } from './utils'

const initial = getElements(15, 15)

const nodes = ref(initial.nodes)
const edges = ref(initial.edges)

const { onInit, dimensions, fitView } = useVueFlow()

onInit((i) => {
  i.fitView({
    padding: 0.2,
  })

  console.log(i.getNodes.value, i.getEdges.value)
})

function toggleClass() {
  nodes.value.forEach((el) => (el.class = el.class === 'light' ? 'dark' : 'light'))
  edges.value.forEach((el) => (el.class = el.class === 'light' ? 'dark' : 'light'))
}

function updatePos() {
  nodes.value.forEach((el) => {
    el.position = {
      x: Math.random() * 10 * dimensions.value.width,
      y: Math.random() * 10 * dimensions.value.height,
    }
  })

  nextTick(() => {
    fitView({ duration: 1000, padding: 0.5 })
  })
}
</script>

<template>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges" :min-zoom="0.1">
    <Background />

    <Panel position="top-right">
      <button style="margin-right: 5px" @click="updatePos">update positions</button>
      <button @click="toggleClass">toggle class</button>
    </Panel>
  </VueFlow>
</template>
