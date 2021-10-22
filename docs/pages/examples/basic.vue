<script lang="ts" setup>
import Flow, {
  MiniMap,
  Controls,
  Background,
  Connection,
  Edge,
  Elements,
  FlowElement,
  FlowInstance,
  addEdge,
  isNode,
  removeElements,
  Node,
} from '@braks/vue-flow'

const onNodeDragStop = ({ node }: { node: Node }) => console.log('drag stop', node)
const onElementClick = ({ node }: { node: Node }) => console.log('click', node)
const elements = ref<Elements>([
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
])
const rfInstance = ref<FlowInstance | null>(null)
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Edge | Connection) => (elements.value = addEdge(params, elements.value))
const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView({ padding: 0.1 })
  rfInstance.value = flowInstance
}

const updatePos = () => {
  elements.value = elements.value.map((el: FlowElement) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      }
    }
    return el
  })
}

const logToObject = () => console.log(rfInstance.value?.toObject())
const resetTransform = () => rfInstance.value?.setTransform({ x: 0, y: 0, zoom: 1 })

const toggleClassnames = () => {
  elements.value = elements.value.map((el: FlowElement) => {
    if (isNode(el)) el.class = el.class === 'light' ? 'dark' : 'light'
    return el
  })
}
</script>
<template>
  <Flow
    class="vue-flow-basic-example"
    :elements="elements"
    :default-zoom="1.5"
    :min-zoom="0.2"
    :max-zoom="4"
    @elements-remove="onElementsRemove"
    @connect="onConnect"
    @node-drag-stop="onNodeDragStop"
    @node-click="onElementClick"
    @elementClick="onElementClick"
    @load="onLoad"
  >
    <MiniMap />
    <Controls />
    <Background color="#aaa" :gap="8" />
    <div style="position: absolute; right: 10px; top: 10px; z-index: 4">
      <button style="margin-right: 5px" @click="resetTransform">reset transform</button>
      <button style="margin-right: 5px" @click="updatePos">change pos</button>
      <button style="margin-right: 5px" @click="toggleClassnames">toggle classnames</button>
      <button @click="logToObject">toObject</button>
    </div>
  </Flow>
</template>
