<script setup>
import { VueFlow } from '@vue-flow/core';
import { ref } from 'vue';
import { initialEdges, initialNodes } from './initial-elements.js';

/**
 * Our nodes and edges
 */
const nodes = ref(initialNodes);

const edges = ref(initialEdges);

// `<VueFlow>` exposes its store via `defineExpose`, so a template ref is the pure-provider way to
// reach the store from the component that renders the flow.
const flow = ref();

const dark = ref(false);

function onNodeDragStop(e) {
  console.log('drag stop', e);
}

/**
 * onConnect is called when a new connection is created.
 * You can add additional properties to your new edge (like a type or label) or block the creation altogether
 */
function onConnect(params) {
  flow.value?.addEdges([params]);
}

/**
 * To update node properties reassign the nodes immutably so the v-model change is re-adopted.
 * Changes are reflected on the graph reactively once the bound nodes ref is replaced.
 */
function updatePos() {
  nodes.value = nodes.value.map(node => ({
    ...node,
    position: {
      x: Math.random() * 400,
      y: Math.random() * 400,
    },
  }));
}

/**
 * toObject transforms your current graph data to an easily persist-able object
 */
function logToObject() {
  return console.log(flow.value?.toObject());
}

/**
 * Resets the current viewpane transformation (zoom & pan)
 */
function resetTransform() {
  return flow.value?.setViewport({ x: 0, y: 0, zoom: 1 });
}

function toggleClass() {
  dark.value = !dark.value;
  nodes.value = nodes.value.map(node => ({ ...node, class: dark.value ? 'dark' : 'light' }));
}
</script>

<template>
  <VueFlow
    ref="flow"
    :nodes="nodes"
    :edges="edges"
    class="basicflow"
    :default-viewport="{ zoom: 1.5 }"
    :min-zoom="0.2"
    :max-zoom="4"
    fit-view
    @node-drag-stop="onNodeDragStop"
    @connect="onConnect"
  >
    <div class="controls">
      <button style="background-color: #113285; color: white" @click="resetTransform">
        reset transform
      </button>
      <button style="background-color: #6f3381; color: white" @click="updatePos">
        update positions
      </button>
      <button
        :style="{
          backgroundColor: dark ? '#FFFFFB' : '#1C1C1C',
          color: dark ? '#1C1C1C' : '#FFFFFB',
        }"
        @click="toggleClass"
      >
        toggle {{ dark ? 'light' : 'dark' }}
      </button>
      <button @click="logToObject">
        log toObject
      </button>
    </div>
  </VueFlow>
</template>
