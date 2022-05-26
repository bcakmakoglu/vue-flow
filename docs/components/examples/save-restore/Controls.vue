<script setup>
import { useVueFlow } from '@braks/vue-flow'

const flowKey = 'example-flow'

const getNodeId = () => `randomnode_${+new Date()}`

const { nodes, edges, addNodes, setNodes, setEdges, instance, dimensions, viewport } = useVueFlow()

const onSave = () => {
  localStorage.setItem(flowKey, JSON.stringify(instance.value?.toObject()))
}

const onRestore = () => {
  const flow = JSON.parse(localStorage.getItem(flowKey))

  if (flow) {
    const [x = 0, y = 0] = flow.position
    setNodes(flow.nodes)
    setEdges(flow.edges)
    instance.value.setTransform({ x, y, zoom: flow.zoom || 0 })
  }
}

const onAdd = () => {
  const newNode = {
    id: `random_node-${getNodeId()}`,
    label: 'Added node',
    position: { x: Math.random() * dimensions.value.width, y: Math.random() * dimensions.value.height },
  }
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
