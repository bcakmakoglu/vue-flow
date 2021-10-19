<script lang="ts" setup>
import ButtonEdge from './ButtonEdge.vue'
import Flow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeType,
  Elements,
  MiniMap,
  OnLoadParams,
  removeElements,
} from '~/index'
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
] as Elements)

const onLoad = (reactFlowInstance: OnLoadParams) => reactFlowInstance.fitView()
const onElementsRemove = (elementsToRemove: Elements) =>
  (elements.value = removeElements(elementsToRemove, elements.value as Elements))
const onConnect = (params: Connection | Edge) =>
  (elements.value = addEdge({ ...params, type: 'buttonedge' } as Edge, elements.value as Elements))
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
