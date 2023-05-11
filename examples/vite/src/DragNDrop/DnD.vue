<script lang="ts" setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'
import Sidebar from './Sidebar.vue'

let id = 0
function getId() {
  return `dndnode_${id++}`
}

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
function onDragOver(event: DragEvent) {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const wrapper = ref()

onConnect(addEdges)

function onDrop(event: DragEvent) {
  const type = event.dataTransfer?.getData('application/vueflow')

  const flowbounds = wrapper.value.$el.getBoundingClientRect()

  const position = project({
    x: event.clientX - flowbounds.left,
    y: event.clientY - flowbounds.top,
  })

  addNodes({
    id: getId(),
    type,
    position,
    label: `${type} node`,
  })
}
</script>

<template>
  <div class="dndflow" @drop="onDrop">
    <VueFlow ref="wrapper" @dragover="onDragOver" />
    <Sidebar />
  </div>
</template>

<style>
@import 'dnd.css';
</style>
