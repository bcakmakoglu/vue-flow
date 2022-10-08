<script lang="ts" setup>
import type { Elements, Node, SnapGrid } from '@vue-flow/core'
import { ConnectionMode, Controls, MiniMap, Position, VueFlow, isEdge, useVueFlow } from '@vue-flow/core'
import ColorSelectorNode from './ColorSelectorNode.vue'

const elements = ref<Elements>([])
const bgColor = ref('#1A192B')
const connectionLineStyle = { stroke: '#fff' }
const snapGrid: SnapGrid = [16, 16]

const nodeStroke = (n: Node): string => {
  if (n.type === 'input') return '#0041d0'
  if (n.type === 'selectorNode') return bgColor.value
  if (n.type === 'output') return '#ff0072'
  return '#eee'
}
const nodeColor = (n: Node): string => {
  if (n.type === 'selectorNode') return bgColor.value
  return '#fff'
}

const onChange = (event: Event) => {
  elements.value.forEach((e) => {
    if (isEdge(e) || e.id !== '2') return e
    bgColor.value = (event.target as HTMLInputElement).value
  })
}

onMounted(() => {
  elements.value = [
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
  ]
})

const { onPaneReady } = useVueFlow({
  connectionMode: ConnectionMode.Loose,
  connectionLineStyle,
  snapToGrid: true,
  snapGrid,
  defaultZoom: 1.5,
})
onPaneReady((i) => {
  i.fitView()
  console.log('flow loaded:', i)
})
</script>

<template>
  <VueFlow v-model="elements" :style="{ backgroundColor: bgColor }">
    <template #node-selectorNode="props">
      <ColorSelectorNode v-bind="props" />
    </template>
    <MiniMap :node-stroke-color="nodeStroke" :node-color="nodeColor" />
    <Controls />
  </VueFlow>
</template>
