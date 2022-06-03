<script lang="ts" setup>
import type { Connection, Edge, Elements, FlowInstance } from '@braks/vue-flow'
import { Position, VueFlow, addEdge, isEdge } from '@braks/vue-flow'

const initialElements: Elements = [
  {
    id: '1',
    sourcePosition: Position.Right,
    type: 'input',
    label: 'Input',
    position: { x: 0, y: 80 },
  },
  {
    id: '2',
    type: 'output',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    label: 'A Node',
    position: { x: 250, y: 0 },
  },
  { id: 'e1-2', source: '1', type: 'smoothstep', target: '2', animated: true },
]

const elements = ref<Elements>(initialElements)

const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))

const onLoad = (flowInstance: FlowInstance) => flowInstance.fitView()

const changeType = () => {
  elements.value.forEach((el) => {
    if (isEdge(el) || el.type === 'input') return
    el.type = el.type === 'default' ? 'output' : 'default'
  })
}
</script>

<template>
  <VueFlow v-model="elements" @connect="onConnect" @pane-ready="onLoad">
    <button :style="{ position: 'absolute', right: 10, top: 30, zIndex: 4 }" @click="changeType">change type</button>
  </VueFlow>
</template>
