<script setup>
import { VueFlow } from '@vue-flow/core';
import { ref } from 'vue';
import InteractionControls from './InteractionControls.vue';

const nodes = ref([
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 400, y: 100 },
  },
  {
    id: '4',
    data: { label: 'Node 4' },
    position: { x: 400, y: 200 },
  },
]);

const edges = ref([
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
]);

// The interaction settings are reactive props on `<VueFlow>` — drive them from local refs and let the
// controls panel toggle them (no `useStore` needed; the props are the public API for these).
const nodesDraggable = ref(true);
const nodesConnectable = ref(true);
const elementsSelectable = ref(true);
const zoomOnScroll = ref(true);
const zoomOnPinch = ref(true);
const panOnScroll = ref(false);
const panOnScrollMode = ref('free');
const zoomOnDoubleClick = ref(true);
const panOnDrag = ref(true);
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    :nodes-draggable="nodesDraggable"
    :nodes-connectable="nodesConnectable"
    :elements-selectable="elementsSelectable"
    :zoom-on-scroll="zoomOnScroll"
    :zoom-on-pinch="zoomOnPinch"
    :pan-on-scroll="panOnScroll"
    :pan-on-scroll-mode="panOnScrollMode"
    :zoom-on-double-click="zoomOnDoubleClick"
    :pan-on-drag="panOnDrag"
    class="interaction-flow"
    fit-view
  >
    <InteractionControls
      v-model:nodes-draggable="nodesDraggable"
      v-model:nodes-connectable="nodesConnectable"
      v-model:elements-selectable="elementsSelectable"
      v-model:zoom-on-scroll="zoomOnScroll"
      v-model:zoom-on-pinch="zoomOnPinch"
      v-model:pan-on-scroll="panOnScroll"
      v-model:pan-on-scroll-mode="panOnScrollMode"
      v-model:zoom-on-double-click="zoomOnDoubleClick"
      v-model:pan-on-drag="panOnDrag"
    />
  </VueFlow>
</template>
