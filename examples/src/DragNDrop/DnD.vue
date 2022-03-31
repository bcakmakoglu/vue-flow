<script lang="ts" setup>
import { VueFlow, Node, useVueFlow } from '@braks/vue-flow'
import Sidebar from './Sidebar.vue'

let id = 0
const getId = () => `dndnode_${id++}`

const { instance, onConnect, nodes, edges, addEdges, addNodes } = useVueFlow({
  nodes: [
    {
      id: '1',
      type: 'input',
      label: 'input node',
      position: { x: 250, y: 5 },
    },
  ],
})
const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

onConnect((params) => addEdges([params]))

const onDrop = (event: DragEvent) => {
  if (instance.value) {
    const type = event.dataTransfer?.getData('application/vueflow')
    const position = instance.value.project({ x: event.clientX, y: event.clientY - 40 })
    const newNode = {
      id: getId(),
      type,
      position,
      label: `${type} node`,
    } as Node
    addNodes([newNode])
  }
}
</script>
<template>
  <div class="dndflow" @drop="onDrop">
    <VueFlow @dragover="onDragOver" />
    <Sidebar />
  </div>
</template>
<style>
@import 'dnd.css';
</style>
