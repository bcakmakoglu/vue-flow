<script lang="ts" setup>
import type { FlowExportObject } from '@vue-flow/core'
import { useVueFlow } from '@vue-flow/core'

const flowKey = 'example-flow'

const state = useStorage<FlowExportObject | null>(flowKey, {
  nodes: [],
  edges: [],
  position: [NaN, NaN],
  zoom: 1,
})

function getNodeId() {
  return `randomnode_${+new Date()}`
}

const { addNodes, setNodes, setEdges, toObject, dimensions, setTransform } = useVueFlow()

function onSave() {
  state.value = toObject()
}

function onRestore() {
  const flow = state.value

  if (flow) {
    const [x = 0, y = 0] = flow.position

    setNodes(flow.nodes)

    setEdges(flow.edges)

    setTransform({ x, y, zoom: flow.zoom || 0 })
  }
}

function onAdd() {
  addNodes({
    id: `random_node-${getNodeId()}`,
    label: 'Added node',
    position: { x: Math.random() * dimensions.value.width, y: Math.random() * dimensions.value.height },
  })
}
</script>

<template>
  <div class="save__controls">
    <button @click="onSave">save</button>
    <button @click="onRestore">restore</button>
    <button @click="onAdd">add node</button>
  </div>
</template>
