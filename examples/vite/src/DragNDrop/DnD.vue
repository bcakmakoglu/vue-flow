<script lang="ts" setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { useDragNDrop } from '@vue-flow/plugin-drag-n-drop'
import Sidebar from './Sidebar.vue'

let id = 0
const getId = () => `dndnode_${id++}`

const { onConnect, addEdges, addNodes, project } = useVueFlow({
  nodes: [
    {
      id: '1',
      type: 'input',
      label: 'input node',
      position: { x: 250, y: 5 },
    },
  ],
})

const { handleDragOver, handleDrop, onDrop } = useDragNDrop()

onConnect((params) => addEdges([params]))

onDrop(({ type, position }) => {
  addNodes([
    {
      id: getId(),
      type,
      position: project(position),
      label: `${type} node`,
    },
  ])
})
</script>

<template>
  <div class="dndflow" @drop="handleDrop">
    <VueFlow @dragover="handleDragOver" />

    <Sidebar />
  </div>
</template>

<style>
@import 'dnd.css';
</style>
