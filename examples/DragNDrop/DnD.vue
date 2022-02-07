<script lang="ts" setup>
import Sidebar from './Sidebar.vue'
import { VueFlow, FlowInstance, Node, useVueFlow } from '~/index'

let id = 0
const getId = () => `dndnode_${id++}`

const flowInstance = ref<FlowInstance>()

const { onPaneReady, onConnect, nodes, edges, addEdges, addNodes } = useVueFlow({
  nodes: [
    {
      id: '1',
      type: 'input',
      label: 'input node',
      position: { x: 250, y: 5 },
    },
  ],
})
onPaneReady((instance) => (flowInstance.value = instance))
const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

onConnect((params) => addEdges([params]))

const onDrop = (event: DragEvent) => {
  if (flowInstance.value) {
    const type = event.dataTransfer?.getData('application/vueflow')
    const position = flowInstance.value.project({ x: event.clientX, y: event.clientY - 40 })
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
@import './dnd.css';
</style>
