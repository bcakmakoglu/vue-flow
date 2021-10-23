<script lang="ts" setup>
import {
  Flow,
  addEdge,
  removeElements,
  Controls,
  MiniMap,
  Background,
  FlowInstance,
  Elements,
  Connection,
  Edge,
  ElementId,
} from '@braks/vue-flow'
import Sidebar from '../../components/DnDSidebar.vue'

const flowInstance = ref<FlowInstance>()
const elements = ref<Elements>([
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
])

let id = 0
const getId = (): ElementId => `dndnode_${id++}`

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onLoad = (instance: FlowInstance) => (flowInstance.value = instance)

const onDrop = (event: DragEvent) => {
  event.preventDefault()

  if (flowInstance.value) {
    console.log(event.dataTransfer?.getData('application/vueflow'))
    const type = event.dataTransfer?.getData('application/vueflow')
    const position = flowInstance.value.project({ x: event.clientX - 400, y: event.clientY - 40 })
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    }

    elements.value.push(newNode)
  }
}
</script>
<template>
  <div class="flex flex-col md:flex-row h-full">
    <div class="flex-1 h-full" @drop="onDrop">
      <Flow :elements="elements" @elements-remove="onElementsRemove" @load="onLoad" @connect="onConnect" @dragover="onDragOver">
        <Controls />
        <MiniMap />
        <Background color="#aaa" :gap="8" />
      </Flow>
    </div>
    <Sidebar />
  </div>
</template>
