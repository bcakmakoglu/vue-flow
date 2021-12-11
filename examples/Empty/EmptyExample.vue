<script lang="ts" setup>
import { CSSProperties } from 'vue'
import {
  VueFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  Elements,
  FlowElement,
  Node,
  FlowInstance,
  addEdge,
  removeElements,
} from '~/index'

const elements = ref<Elements>([])
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))

const onLoad = (flowInstance: FlowInstance) => console.log('flow loaded:', flowInstance)
const onElementClick = (element: FlowElement) => console.log('click', element)
const onNodeDragStop = (node: Node) => console.log('drag stop', node)

const buttonStyle: CSSProperties = { position: 'absolute', left: '10px', top: '10px', zIndex: 4 }
const addRandomNode = () => {
  const nodeId = (elements.value.length + 1).toString()
  const newNode: Node = {
    id: nodeId,
    label: `Node: ${nodeId}`,
    position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
  } as Node
  elements.value.push(newNode)
}
</script>
<template>
  <VueFlow
    v-model="elements"
    @load="onLoad"
    @element-click="onElementClick"
    @elements-remove="onElementsRemove"
    @connect="onConnect"
    @node-drag-stop="onNodeDragStop"
  >
    <MiniMap />
    <Controls />
    <Background :variant="BackgroundVariant.Lines" />

    <button type="button" :style="buttonStyle" @click="addRandomNode">add node</button>
  </VueFlow>
</template>
