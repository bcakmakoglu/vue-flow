<script setup>
import { useVueFlow } from '@braks/vue-flow'

const flowKey = 'example-flow'

const { nodes, addNodes, setNodes, setEdges, instance, dimensions } = useVueFlow()

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
  const id = nodes.value.length + 1
  const newNode = {
    id: `random_node-${id}`,
    label: `Node ${id}`,
    position: { x: Math.random() * dimensions.value.width, y: Math.random() * dimensions.value.height },
  }
  addNodes([newNode])
}
</script>

<template>
  <div class="save__controls">
    <button style="background-color: #33a6b8" @click="onSave">save</button>
    <button style="background-color: #113285" @click="onRestore">restore</button>
    <button style="background-color: #6F3381" @click="onAdd">add node</button>
  </div>
</template>
