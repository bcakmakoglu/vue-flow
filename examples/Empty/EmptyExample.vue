<script lang="ts" setup>
import { CSSProperties } from 'vue'
import Flow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  ElementId,
  Elements,
  FlowElement,
  Node,
  OnLoadParams,
  addEdge,
  removeElements,
} from '~/index'

const elements = ref<Elements>([])
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))

const onLoad = (flowInstance: OnLoadParams) => console.log('flow loaded:', flowInstance)
const onElementClick = (element: FlowElement) => console.log('click', element)
const onNodeDragStop = (node: Node) => console.log('drag stop', node)

const buttonStyle: CSSProperties = { position: 'absolute', left: '10px', top: '10px', zIndex: 4 }
const addRandomNode = () => {
  const nodeId: ElementId = (elements.value.length + 1).toString()
  const newNode: Node = {
    id: nodeId,
    data: { label: `Node: ${nodeId}` },
    position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
  } as Node
  elements.value = [...elements.value, newNode]
}
</script>
<template>
  <Flow
    :elements="elements"
    :only-render-visible-elements="false"
    @load="onLoad"
    @element-click="onElementClick"
    @elements-remove="onElementsRemove"
    @connect="(p) => onConnect(p)"
    @node-drag-stop="onNodeDragStop"
  >
    <MiniMap />
    <Controls />
    <Background :variant="BackgroundVariant.Lines" />

    <button type="button" :style="buttonStyle" @click="addRandomNode">add node</button>
  </Flow>
</template>
