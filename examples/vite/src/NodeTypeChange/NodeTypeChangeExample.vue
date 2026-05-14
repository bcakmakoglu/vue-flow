<script lang="ts" setup>
import type { Edge, Elements, Node } from '@vue-flow/core'
import { Position, VueFlow, isEdge, isNode } from '@vue-flow/core'

const initialElements: Elements = [
  {
    id: '1',
    sourcePosition: Position.Right,
    type: 'input',
    data: { label: 'Input' },
    position: { x: 0, y: 80 },
  },
  {
    id: '2',
    type: 'output',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: 'A Node' },
    position: { x: 250, y: 0 },
  },
  { id: 'e1-2', source: '1', type: 'smoothstep', target: '2', animated: true },
]

const nodes = ref<Node[]>(initialElements.filter(isNode))
const edges = ref<Edge[]>(initialElements.filter(isEdge))

function changeType() {
  nodes.value.forEach((el) => {
    if (el.type === 'input') {
      return
    }
    el.type = el.type === 'default' ? 'output' : 'default'
  })
}
</script>

<template>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges" fit-view-on-init>
    <button :style="{ position: 'absolute', right: 10, top: 30, zIndex: 4 }" @click="changeType">change type</button>
  </VueFlow>
</template>
