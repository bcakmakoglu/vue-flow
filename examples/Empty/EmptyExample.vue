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
} from '~/index'
import { addEdge, removeElements } from '~/utils/graph'

const elements = ref<Elements>([])
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))

const onLoad = (reactFlowInstance: OnLoadParams) => console.log('flow loaded:', reactFlowInstance)
const onElementClick = (_: MouseEvent, element: FlowElement) => console.log('click', element)
const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node)

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
    :on-load="onLoad"
    :on-element-click="onElementClick"
    :on-elements-remove="onElementsRemove"
    :on-connect="(p) => onConnect(p)"
    :on-node-drag-stop="onNodeDragStop"
    :only-render-visible-elements="false"
  >
    <MiniMap />
    <Controls />
    <Background :variant="BackgroundVariant.Lines" />

    <button type="button" :style="buttonStyle" @click="addRandomNode">add node</button>
  </Flow>
</template>
