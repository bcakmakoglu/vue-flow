<script setup>
import { MiniMap } from '@vue-flow/minimap'
import { Position, VueFlow, useVueFlow } from '@vue-flow/core'
import { ref } from 'vue'
import ColorSelectorNode from './ColorSelectorNode.vue'
import { presets } from './presets.js'

const { findNode } = useVueFlow()

const gradient = ref(false)

const bgColor = ref(presets.ayame)

const bgName = ref('AYAME')

const nodes = ref([
  {
    id: '1',
    type: 'color-selector',
    data: { color: bgColor.value },
    position: { x: 0, y: 50 },
  },
  {
    id: '2',
    type: 'output',
    position: { x: 350, y: 25 },
    targetPosition: Position.Left,
  },
  {
    id: '3',
    type: 'output',
    position: { x: 350, y: 200 },
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
      stroke: bgColor.value,
      filter: 'invert(100%)',
    }),
  },
  {
    id: 'e1b-3',
    source: '1',
    sourceHandle: 'b',
    target: '3',
    animated: true,
    style: () => ({
      stroke: bgColor.value,
      filter: 'invert(100%)',
    }),
  },
])

const connectionLineStyle = { stroke: '#fff' }

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
    return bgColor.value
  }

  return '#fff'
}

function onChange(color) {
  gradient.value = false
  bgColor.value = color.value
  bgName.value = color.name

  findNode('3').hidden = false
}

function onGradient() {
  gradient.value = true
  bgColor.value = null
  bgName.value = 'gradient'

  findNode('3').hidden = true
}
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    class="custom-node-flow"
    :class="[gradient ? 'animated-bg-gradient' : '']"
    :style="{ backgroundColor: bgColor }"
    :connection-line-style="connectionLineStyle"
    :default-viewport="{ zoom: 1.5 }"
    fit-view-on-init
  >
    <template #node-color-selector="{ data }">
      <ColorSelectorNode :data="data" @change="onChange" @gradient="onGradient" />
    </template>

    <MiniMap :node-stroke-color="nodeStroke" :node-color="nodeColor" />
  </VueFlow>
</template>
