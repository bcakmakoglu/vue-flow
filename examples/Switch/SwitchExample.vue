<script lang="ts" setup>
import { Flow, removeElements, addEdge, Node, FlowElement, Elements, Connection, Edge } from '~/index'

const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node)
const onElementClick = (_: MouseEvent, element: FlowElement) => console.log('click', element)

const elementsA: Elements = [
  { id: '1a', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 }, className: 'light' },
  { id: '2a', data: { label: 'Node 2' }, position: { x: 100, y: 100 }, className: 'light' },
  { id: '3a', data: { label: 'Node 3' }, position: { x: 400, y: 100 }, className: 'light' },
  { id: '4a', data: { label: 'Node 4' }, position: { x: 400, y: 200 }, className: 'light' },
  { id: 'e1-2', source: '1a', target: '2a' },
  { id: 'e1-3', source: '1a', target: '3a' },
]

const elementsB: Elements = [
  { id: 'inputb', type: 'input', data: { label: 'Input' }, position: { x: 300, y: 5 }, className: 'light' },
  { id: '1b', data: { label: 'Node 1' }, position: { x: 0, y: 100 }, className: 'light' },
  { id: '2b', data: { label: 'Node 2' }, position: { x: 200, y: 100 }, className: 'light' },
  { id: '3b', data: { label: 'Node 3' }, position: { x: 400, y: 100 }, className: 'light' },
  { id: '4b', data: { label: 'Node 4' }, position: { x: 600, y: 100 }, className: 'light' },

  { id: 'e1b', source: 'inputb', target: '1b' },
  { id: 'e2b', source: 'inputb', target: '2b' },
  { id: 'e3b', source: 'inputb', target: '3b' },
  { id: 'e4b', source: 'inputb', target: '4b' },
]

const elements = ref(elementsA)

const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
</script>
<template>
  <Flow
    :elements="elements"
    @element-click="onElementClick"
    @elements-remove="onElementsRemove"
    @connect="onConnect"
    @node-drag-stop="onNodeDragStop"
  >
    <div :style="{ position: 'absolute', right: 10, top: 10, zIndex: 4 }">
      <button style="margin-right: 5px" @click="() => (elements = elementsA)">flow a</button>
      <button @click="() => (elements = elementsB)">flow b</button>
    </div>
  </Flow>
</template>
