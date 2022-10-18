<script lang="ts" setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { useDragNDrop } from '@vue-flow/plugin-drag-n-drop'
import Sidebar from './Sidebar.vue'

let id = 0
const getId = () => `dndnode_${id++}`

const { onConnect, addEdges, addNodes, findNode } = useVueFlow({
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
  const id = getId()
  addNodes([
    {
      id,
      type,
      position,
      label: `${type} node`,
    },
  ])

  nextTick(() => {
    const node = findNode(id)!

    const stop = watch(
      () => node.dimensions,
      (dimensions) => {
        if (dimensions.width > 0 && dimensions.height > 0) {
          node.position = { x: node.position.x - node.dimensions.width / 2, y: node.position.y - node.dimensions.height / 2 }
          stop()
        }
      },
      { deep: true, flush: 'post' },
    )
  })
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
