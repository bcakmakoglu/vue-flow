<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'
import Sidebar from './Sidebar.vue'

let id = 0
const getId = () => `dndnode_${id++}`

const { onConnect, nodes, edges, addEdges, addNodes, viewport, project } = useVueFlow({
  nodes: [
    {
      id: '1',
      type: 'input',
      label: 'input node',
      position: { x: 250, y: 25 },
    },
  ],
})

const onDragOver = (event) => {
  event.preventDefault()

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

onConnect((params) => addEdges([params]))

const onDrop = (event) => {
  const type = event.dataTransfer?.getData('application/vueflow')

  const position = project({ x: event.clientX - 40, y: event.clientY - 18 })

  const newNode = {
    id: getId(),
    type,
    position,
    label: `${type} node`,
  }

  addNodes([newNode])
}
</script>

<template>
  <div class="dndflow" @drop="onDrop">
    <VueFlow @dragover="onDragOver" />

    <Sidebar />
  </div>
</template>
