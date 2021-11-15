<script lang="ts" setup>
import Sidebar from './Sidebar.vue'
import { VueFlow, addEdge, removeElements, Controls, FlowInstance, Elements, Connection, Edge, ElementId, Node } from '~/index'
import './dnd.css'

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
    const position = flowInstance.value.project({ x: event.clientX, y: event.clientY - 40 })
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    } as Node

    elements.value.push(newNode)
  }
}
</script>
<template>
  <div class="dndflow">
    <div class="vueflow-wrapper" @drop="onDrop">
      <VueFlow
        :elements="elements"
        @elements-remove="onElementsRemove"
        @load="onLoad"
        @connect="onConnect"
        @dragover="onDragOver"
      >
        <Controls />
      </VueFlow>
    </div>
    <Sidebar />
  </div>
</template>
