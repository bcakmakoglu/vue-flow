<script lang="ts" setup>
import Flow, {
  Controls,
  updateEdge,
  addEdge,
  Elements,
  FlowInstance,
  Connection,
  Edge,
  removeElements,
  FlowEvents,
  ConnectionMode,
} from '~/index'

const initialElements: Elements = [
  {
    id: '1',
    type: 'input',
    data: {
      label: 'Node <strong>A</strong>',
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: 'Node <strong>B</strong>',
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: {
      label: 'Node <strong>C</strong>',
    },
    position: { x: 400, y: 100 },
    style: { background: '#D6D5E6', color: '#333', border: '1px solid #222138', width: 180 },
  },
  { id: 'e1-2', source: '1', target: '2', label: 'Updateable edge' },
]

const elements = ref(initialElements)
const onLoad = (flowInstance: FlowInstance) => flowInstance.fitView()
const onEdgeUpdateStart = (edge: Edge) => console.log('start update', edge)
const onEdgeUpdateEnd = (edge: Edge) => console.log('end update', edge)
const onEdgeUpdate = ({ edge, connection }: FlowEvents['edgeUpdate']) =>
  (elements.value = updateEdge(edge, connection, elements.value))
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
</script>
<template>
  <Flow
    :elements="elements"
    :snap-to-grid="true"
    :connection-mode="ConnectionMode.Loose"
    @load="onLoad"
    @edge-update="onEdgeUpdate"
    @connect="onConnect"
    @edge-update-start="onEdgeUpdateStart"
    @elements-remove="onElementsRemove"
    @edge-update-end="onEdgeUpdateEnd"
  >
    <Controls />
  </Flow>
</template>
