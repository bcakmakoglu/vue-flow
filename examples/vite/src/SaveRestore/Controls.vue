<script lang="ts" setup>
import type { FlowExportObject, Node } from '@vue-flow/core'
import { useVueFlow, useZoomPanHelper } from '@vue-flow/core'

const flowKey = 'example-flow'
const state = useStorage<FlowExportObject>(flowKey, {
  nodes: [],
  edges: [],
  position: [NaN, NaN],
  zoom: 1,
})

const getNodeId = () => `randomnode_${+new Date()}`

const { setTransform } = useZoomPanHelper()
const { nodes, edges, addNodes, setNodes, setEdges, toObject, dimensions } = useVueFlow()

const onSave = () => {
  state.value = toObject()
}

const onRestore = () => {
  const flow: FlowExportObject | null = state.value

  if (flow) {
    const [x = 0, y = 0] = flow.position
    setNodes(state.value.nodes)
    setEdges(state.value.edges)
    setTransform({ x, y, zoom: flow.zoom || 0 })
  }
}

const onAdd = () => {
  const newNode = {
    id: `random_node-${getNodeId()}`,
    label: 'Added node',
    position: { x: Math.random() * dimensions.value.width, y: Math.random() * dimensions.value.height },
  } as Node
  addNodes([newNode])
}
</script>

<template>
  <div class="save__controls">
    <button @click="onSave">save</button>
    <button @click="onRestore">restore</button>
    <button @click="onAdd">add node</button>
  </div>
</template>
