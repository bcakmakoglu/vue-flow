<script lang="ts" setup>
import {
  Flow,
  removeElements,
  addEdge,
  Background,
  MiniMap,
  useZoomPanHelper,
  Elements,
  ElementId,
  Connection,
  Edge,
  Node,
} from '~/index'

const initialElements: Elements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 }, class: 'light' },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 }, class: 'light' },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 }, class: 'light' },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 }, class: 'light' },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
]

let id = 5
const getId = (): ElementId => `${id++}`

const { project } = useZoomPanHelper()

const elements = ref(initialElements)

const onPaneClick = (evt: MouseEvent) => {
  const projectedPosition = project({ x: evt.clientX, y: evt.clientY - 40 })

  elements.value = elements.value.concat({
    id: getId(),
    position: projectedPosition,
    data: {
      label: `${projectedPosition.x}-${projectedPosition.y}`,
    },
  } as Node)
}
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
</script>
<template>
  <Flow :elements="elements" @elements-remove="onElementsRemove" @connect="onConnect" @pane-click="onPaneClick">
    <Background />
    <MiniMap />
  </Flow>
</template>
