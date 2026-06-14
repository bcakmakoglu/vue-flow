<script setup>
import { Background, Panel, storeToRefs, useStore, useVueFlow, VueFlow } from '@vue-flow/core';
import { nextTick, shallowRef } from 'vue';
import { getElements } from './utils.js';

const { nodes: initialNodes, edges: initialEdges } = getElements(15, 15);

// shallowRef (not ref): the elements are immutable snapshots, so deep reactivity on hundreds of
// nodes/edges is pure overhead — we always reassign the whole array to update
const nodes = shallowRef(initialNodes);

const edges = shallowRef(initialEdges);

const { fitView } = useVueFlow();

const { dimensions } = storeToRefs(useStore());

function updatePos() {
  nodes.value = nodes.value.map((node) => {
    return {
      ...node,
      position: {
        x: Math.random() * dimensions.value.width,
        y: Math.random() * dimensions.value.height,
      },
    };
  });

  nextTick(() => {
    fitView({ padding: 0.5 });
  });
}
</script>

<template>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges" :min-zoom="0.1" fit-view>
    <Background />

    <Panel position="top-right">
      <button style="margin-right: 5px" @click="updatePos">
        update positions
      </button>
    </Panel>
  </VueFlow>
</template>
