<script setup>
import { Panel, VueFlow, isNode, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { ref } from 'vue'
import Icon from './Icon.vue'
import { initialElements } from './initial-elements.js'

/**
 * useVueFlow provides all event handlers and store properties
 * You can pass the composable an object that has the same properties as the VueFlow component props
 */
const { onPaneReady, onNodeDragStop, onConnect, addEdges, setTransform, toObject } = useVueFlow()

/**
 * Our elements
 */
const elements = ref(initialElements)

/**
 * This is a Vue Flow event-hook which can be listened to from anywhere you call the composable, instead of only on the main component
 *
 * onPaneReady is called when viewpane & nodes have visible dimensions
 */
onPaneReady(({ fitView }) => {
  fitView()
})

onNodeDragStop((e) => console.log('drag stop', e))

/**
 * onConnect is called when a new connection is created.
 * You can add additional properties to your new edge (like a type or label) or block the creation altogether
 */
onConnect((params) => addEdges(params))

const dark = ref(false)

/**
 * To update node properties you can simply use your elements v-model and mutate the elements directly
 * Changes should always be reflected on the graph reactively, without the need to overwrite the elements
 */
function updatePos() {
  return elements.value.forEach((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      }
    }
  })
}

/**
 * toObject transforms your current graph data to an easily persist-able object
 */
function logToObject() {
  return console.log(toObject())
}

/**
 * Resets the current viewpane transformation (zoom & pan)
 */
function resetTransform() {
  return setTransform({ x: 0, y: 0, zoom: 1 })
}

function toggleClass() {
  return (dark.value = !dark.value)
}
</script>

<template>
  <VueFlow v-model="elements" :class="{ dark }" class="basicflow" :default-viewport="{ zoom: 1.5 }" :min-zoom="0.2" :max-zoom="4">
    <Background :pattern-color="dark ? '#FFFFFB' : '#aaa'" gap="8" />

    <MiniMap />

    <Controls />

    <Panel position="top-right" class="controls">
      <button style="background-color: #113285; color: white" title="Reset Transform" @click="resetTransform">
        <Icon name="reset" />
      </button>

      <button style="background-color: #6f3381" title="Shuffle Node Positions" @click="updatePos">
        <Icon name="update" />
      </button>

      <button
        :style="{ backgroundColor: dark ? '#FFFFFB' : '#292524', color: dark ? '#292524' : '#FFFFFB' }"
        @click="toggleClass"
      >
        <Icon v-if="dark" name="sun" />
        <Icon v-else name="moon" />
      </button>

      <button title="Log `toObject`" @click="logToObject">
        <Icon name="log" />
      </button>
    </Panel>
  </VueFlow>
</template>
