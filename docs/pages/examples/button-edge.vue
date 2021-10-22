<script lang="ts" setup>
import Flow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeType,
  Elements,
  MiniMap,
  FlowInstance,
  removeElements,
} from '@braks/vue-flow'
import ButtonEdge from '../../components/ButtonEdge.vue'
const edgeTypes = {
  buttonedge: ButtonEdge as EdgeType,
}

const elements = ref<Elements>([
  {
    id: 'ewb-1',
    type: 'input',
    data: { label: 'Input 1' },
    position: { x: 250, y: 0 },
  },
  { id: 'ewb-2', data: { label: 'Node 2' }, position: { x: 250, y: 300 } },
  {
    id: 'edge-1-2',
    source: 'ewb-1',
    target: 'ewb-2',
    type: 'buttonedge',
  },
])

const onLoad = (flowInstance: FlowInstance) => flowInstance.fitView()
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Connection | Edge) =>
  (elements.value = addEdge({ ...params, type: 'buttonedge' } as Edge, elements.value))
</script>
<template>
  <Flow
    key="edge-with-button"
    :elements="elements"
    :snap-to-grid="true"
    :edge-types="edgeTypes"
    @load="onLoad"
    @elementsRemove="onElementsRemove"
    @connect="onConnect"
  >
    <MiniMap />
    <Controls />
    <Background />
  </Flow>
</template>
