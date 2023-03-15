<script lang="ts" setup>
import type { Elements, Node, SnapGrid } from '@vue-flow/core'
import { ConnectionMode, Position, VueFlow, isEdge, useVueFlow } from '@vue-flow/core'

import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

import ColorSelectorNode from './ColorSelectorNode.vue'

const bgColor = ref('#1A192B')
const connectionLineStyle = { stroke: '#fff' }
const snapGrid: SnapGrid = [16, 16]

const elements = ref<Elements>([
  {
    id: '1',
    type: 'input',
    label: 'An input node',
    position: { x: 0, y: 50 },
    sourcePosition: Position.Right,
  },
  {
    id: '2',
    type: 'selectorNode',
    data: { onChange, color: bgColor },
    style: { border: '1px solid #777', padding: '10px' },
    parentNode: '1',
    position: { x: 250, y: 50 },
  },
  {
    id: '3',
    type: 'output',
    label: 'Output A',
    position: { x: 650, y: 25 },
    targetPosition: Position.Left,
  },
  {
    id: '4',
    type: 'output',
    label: 'Output B',
    position: { x: 650, y: 100 },
    targetPosition: Position.Left,
  },

  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#fff' } },
  { id: 'e2a-3', source: '2', sourceHandle: 'a', target: '3', animated: true, style: { stroke: '#fff' } },
  { id: 'e2b-4', source: '2', sourceHandle: 'b', target: '4', animated: true, style: { stroke: '#fff' } },
])

useVueFlow({
  connectionMode: ConnectionMode.Loose,
  connectionLineOptions: {
    style: connectionLineStyle,
  },
  snapToGrid: true,
  snapGrid,
})

function nodeStroke(n: Node) {
  if (n.type === 'input') return '#0041d0'
  if (n.type === 'selectorNode') return bgColor.value
  if (n.type === 'output') return '#ff0072'
  return '#eee'
}
function nodeColor(n: Node) {
  if (n.type === 'selectorNode') return bgColor.value
  return '#fff'
}

function onChange(event: InputEvent) {
  elements.value.forEach((e) => {
    if (isEdge(e) || e.id !== '2') return e
    bgColor.value = (event.target as HTMLInputElement).value
  })
}
</script>

<template>
  <VueFlow v-model="elements" fit-view-on-init :style="{ backgroundColor: bgColor }">
    <template #node-selectorNode="props">
      <ColorSelectorNode :data="props.data" :parent-node="props.parentNode" :position="props.position" />
    </template>
    <MiniMap :node-stroke-color="nodeStroke" :node-color="nodeColor" />
    <Controls />
  </VueFlow>
</template>
