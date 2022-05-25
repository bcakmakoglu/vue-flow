<script setup>
import { Background, Controls, MiniMap, VueFlow, isNode, useVueFlow } from '@braks/vue-flow'
import { initialElements } from './initial-elements.js'

const { onPaneReady, onNodeDragStop, onConnect, instance, addEdges, getNodes, nodes } = useVueFlow()

/**
 * Called when viewpane & nodes have visible dimensions
 */
onPaneReady(({ fitView }) => {
  fitView()
})

onNodeDragStop((e) => console.log('drag stop', e))

onConnect((params) => addEdges([params]))

const updatePos = () =>
  initialElements.value.forEach((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      }
    }
  })

const logToObject = () => console.log(instance.value?.toObject())

const resetTransform = () => instance.value?.setTransform({ x: 0, y: 0, zoom: 1 })

const toggleClass = () => initialElements.value.forEach((el) => (el.class = el.class === 'light' ? 'dark' : 'light'))
</script>

<template>
  <VueFlow v-model="initialElements" class="vue-flow-basic-example" :default-zoom="1.5" :min-zoom="0.2" :max-zoom="4">
    <Background pattern-color="#aaa" gap="8" />
    <MiniMap />
    <Controls />
    <div style="position: absolute; right: 10px; top: 10px; z-index: 4">
      <button style="margin-right: 5px" @click="resetTransform">reset transform</button>
      <button style="margin-right: 5px" @click="updatePos">update positions</button>
      <button style="margin-right: 5px" @click="toggleClass">toggle class</button>
      <button @click="logToObject">log toObject</button>
    </div>
  </VueFlow>
</template>
