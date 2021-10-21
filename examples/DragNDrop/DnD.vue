<script lang="ts" setup>
import Sidebar from './Sidebar.vue'
import Flow, { addEdge, removeElements, Controls, OnLoadParams, Elements, Connection, Edge, ElementId, Node } from '~/index'
import './dnd.css'

const flowInstance = ref<OnLoadParams>()
const elements = ref<Elements>([
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
] as Elements)

let id = 0
const getId = (): ElementId => `dndnode_${id++}`

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value as Elements))
const onElementsRemove = (elementsToRemove: Elements) =>
  (elements.value = removeElements(elementsToRemove, elements.value as Elements))
const onLoad = (instance: OnLoadParams) => (flowInstance.value = instance)

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
      <Flow :elements="elements" @elements-remove="onElementsRemove" @load="onLoad" @connect="onConnect" @dragover="onDragOver">
        <Controls />
      </Flow>
    </div>
    <Sidebar />
  </div>
</template>
