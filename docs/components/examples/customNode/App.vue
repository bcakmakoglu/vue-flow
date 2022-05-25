<script setup>
import { ConnectionMode, Controls, MiniMap, Position, VueFlow } from '@braks/vue-flow'
import { h, onMounted, ref } from 'vue'
import ColorSelectorNode from './CustomNode.vue'
import { presets } from './presets.js'

const elements = ref([])

const bgColor = ref(presets.ayame)
const bgName = ref('AYAME')

const connectionLineStyle = { stroke: '#fff' }

const snapGrid = [16, 16]

const nodeStroke = (n) => {
  if (n.type === 'input') return '#0041d0'
  if (n.type === 'selectorNode') return bgColor.value
  if (n.type === 'output') return '#ff0072'
  return '#eee'
}
const nodeColor = (n) => {
  if (n.type === 'selectorNode') return bgColor.value
  return '#fff'
}

// output labels
const outputColorLabel = () => h('div', {}, bgColor.value)
const outputNameLabel = () => h('div', {}, bgName.value)

const onChange = (color) => {
  bgColor.value = color.value
  bgName.value = color.name
}

onMounted(() => {
  elements.value = [
    {
      id: '1',
      type: 'custom',
      data: { color: bgColor },
      position: { x: 0, y: 50 },
    },
    {
      id: '2',
      type: 'output',
      label: outputNameLabel,
      position: { x: 350, y: 25 },
      targetPosition: Position.Left,
    },
    {
      id: '3',
      type: 'output',
      label: outputColorLabel,
      position: { x: 350, y: 175 },
      targetPosition: Position.Left,
    },

    { id: 'e1a-2', source: '1', sourceHandle: 'a', target: '2', animated: true, style: { stroke: '#fff' } },
    { id: 'e1b-3', source: '1', sourceHandle: 'b', target: '3', animated: true, style: { stroke: '#fff' } },
  ]
})
</script>

<template>
  <VueFlow
    v-model="elements"
    :style="{ backgroundColor: bgColor }"
    :connection-mode="ConnectionMode.Loose"
    :connection-line-style="connectionLineStyle"
    :snap-to-grid="true"
    :snap-grid="snapGrid"
    :default-zoom="1.5"
    :fit-view-on-init="true"
  >
    <template #node-custom="props">
      <ColorSelectorNode v-bind="props" @change="onChange" />
    </template>
    <MiniMap :node-stroke-color="nodeStroke" :node-color="nodeColor" />
    <Controls />
  </VueFlow>
</template>
