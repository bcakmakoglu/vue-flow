<script setup>
import { ref } from 'vue'
import { MiniMap } from '@vue-flow/minimap'
import { Position, VueFlow, useNodesData, useVueFlow } from '@vue-flow/core'
import ColorSelectorNode from './ColorSelectorNode.vue'
import OutputNode from './OutputNode.vue'
import { presets } from './presets.js'

useVueFlow()

const nodeData = useNodesData('1')

const nodes = ref([
  {
    id: '1',
    type: 'color-selector',
    data: { color: presets.ayame },
    position: { x: 0, y: 50 },
  },
  {
    id: '2',
    type: 'output',
    position: { x: 350, y: 114 },
    targetPosition: Position.Left,
  },
])

const edges = ref([
  {
    id: 'e1a-2',
    source: '1',
    sourceHandle: 'a',
    target: '2',
    animated: true,
    style: () => ({
      stroke: nodeData.value?.color,
      filter: 'invert(100%)',
    }),
  },
])

// minimap stroke color functions
function nodeStroke(n) {
  switch (n.type) {
    case 'input':
      return '#0041d0'
    case 'color-selector':
      return presets.sumi
    case 'output':
      return '#ff0072'
    default:
      return '#eee'
  }
}

function nodeColor(n) {
  if (n.type === 'color-selector') {
    return nodeData.value?.color
  }

  return '#fff'
}
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    class="custom-node-flow"
    :class="[nodeData?.isGradient ? 'animated-bg-gradient' : '']"
    :style="{ backgroundColor: nodeData?.color }"
    :default-viewport="{ zoom: 1.5 }"
    fit-view-on-init
  >
    <template #node-color-selector="{ data }">
      <ColorSelectorNode :data="data" />
    </template>

    <template #node-output="{ data }">
      <OutputNode :data="data" />
    </template>

    <MiniMap :node-stroke-color="nodeStroke" :node-color="nodeColor" />
  </VueFlow>
</template>
