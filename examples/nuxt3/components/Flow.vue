<script setup>
import { Background, ControlButton, Controls, MiniMap, VueFlow } from '@vue-flow/core';
import { ref } from 'vue';
import Icon from './Icon.vue';
import { initialEdges, initialNodes } from './initial-elements.js';

const nodes = ref(initialNodes);

const edges = ref(initialEdges);

// our dark mode toggle flag
const dark = ref(false);

// `<VueFlow>` exposes its store via `defineExpose`, so a template ref is the pure-provider way to
// reach the store from the component that renders the flow.
const flow = ref();

/**
 * onNodeDragStop is called when a node is done being dragged
 *
 * Node drag events provide you with:
 * 1. the event object
 * 2. the nodes array (if multiple nodes are dragged)
 * 3. the node that initiated the drag
 * 4. any intersections with other nodes
 */
function onNodeDragStop({ event, nodes, node, intersections }) {
  console.log('Node Drag Stop', { event, nodes, node, intersections });
}

/**
 * onConnect is called when a new connection is created.
 *
 * You can add additional properties to your new edge (like a type or label) or block the creation altogether by not calling `addEdges`
 */
function onConnect(connection) {
  flow.value?.addEdges(connection);
}

/**
 * To update a node or multiple nodes, you can
 * 1. Mutate the node objects *if* you're using `v-model`
 * 2. Use the `updateNode` method (from the store) to update the node(s)
 * 3. Create a new array of nodes and pass it to the `nodes` ref
 */
function updatePos() {
  nodes.value = nodes.value.map((node) => {
    return {
      ...node,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    };
  });
}

/**
 * toObject transforms your current graph data to an easily persist-able object
 */
function logToObject() {
  console.log(flow.value?.toObject());
}

/**
 * Resets the current viewport transformation (zoom & pan)
 */
function resetTransform() {
  flow.value?.setViewport({ x: 0, y: 0, zoom: 1 });
}

function toggleDarkMode() {
  dark.value = !dark.value;
}
</script>

<template>
  <VueFlow
    ref="flow"
    :nodes="nodes"
    :edges="edges"
    :class="{ dark }"
    class="basicflow"
    :default-viewport="{ zoom: 1.5 }"
    :min-zoom="0.2"
    :max-zoom="4"
    fit-view
    @node-drag-stop="onNodeDragStop"
    @connect="onConnect"
  >
    <Background :gap="16" />

    <MiniMap />

    <Controls position="top-right">
      <ControlButton title="Reset Transform" @click="resetTransform">
        <Icon name="reset" />
      </ControlButton>

      <ControlButton title="Shuffle Node Positions" @click="updatePos">
        <Icon name="update" />
      </ControlButton>

      <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
        <Icon v-if="dark" name="sun" />
        <Icon v-else name="moon" />
      </ControlButton>

      <ControlButton title="Log `toObject`" @click="logToObject">
        <Icon name="log" />
      </ControlButton>
    </Controls>
  </VueFlow>
</template>
