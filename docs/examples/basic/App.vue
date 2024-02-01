<script setup>
import { VueFlow, isNode, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { ref } from 'vue'
import Icon from './Icon.vue'
import { initialElements } from './initial-elements.js'

// useVueFlow returns all the event-hooks and methods you need to interact with the graph
const { onPaneReady, onNodeDragStop, onConnect, addEdges, setViewport, toObject } = useVueFlow()

// Elements v-model
const elements = ref(initialElements)

// Dark mode toggle
const dark = ref(false)

/**
 * Event Hooks
 *
 * These are Vue Flow event-hooks which can be used to listen to events happening on the graph.
 */

// onPaneReady is called when viewpane is ready (dimensions exist and are not 0)
onPaneReady(({ fitView }) => {
  fitView()
})

// onNodeDragStop is called when a node is dragged and then released
onNodeDragStop((e) => console.log('drag stop', e))

/**
 * onConnect is called when a new connection is created.
 * You can add additional properties to your new edge (like a type or label) or block the creation altogether
 */
onConnect((params) => addEdges(params))

/**
 * To update node properties you can simply use your elements v-model and mutate the elements directly
 * Changes should always be reflected on the graph reactively, without the need to overwrite the original elements
 * Be aware that VueFlow will change your initial `Node[]` and `Edge[]` elements to `GraphNode[]` and `GraphEdge[]`
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

function logToObject() {
  // `toObject` transforms your current graph data to an easily persist-able object
  return console.log(toObject())
}

function resetTransform() {
  return setViewport({ x: 0, y: 0, zoom: 1 })
}

function toggleClass() {
  return (dark.value = !dark.value)
}
</script>

<template>
  <VueFlow v-model="elements" :class="{ dark }" class="basicflow" :default-viewport="{ zoom: 1.5 }" :min-zoom="0.2" :max-zoom="4">
    <Background pattern-color="#aaa" :gap="16" />

    <MiniMap />

    <Controls position="top-right">
      <ControlButton title="Reset Transform" @click="resetTransform">
        <Icon name="reset" />
      </ControlButton>

      <ControlButton title="Shuffle Node Positions" @click="updatePos">
        <Icon name="update" />
      </ControlButton>

      <ControlButton title="Toggle Mode" @click="toggleClass">
        <Icon v-if="dark" name="sun" />
        <Icon v-else name="moon" />
      </ControlButton>

      <ControlButton title="Log `toObject`" @click="logToObject">
        <Icon name="log" />
      </ControlButton>
    </Controls>
  </VueFlow>
</template>
