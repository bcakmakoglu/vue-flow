<script lang="ts" setup>
import {
  VueFlow,
  MiniMap,
  Controls,
  Background,
  Connection,
  Edge,
  Elements,
  FlowInstance,
  addEdge,
  isNode,
  removeElements,
} from '~/index'

const onNodeDragStop = (e) => console.log('drag stop', e)
const onElementClick = (e) => console.log('click', e)
const elements = ref<Elements>([
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
])
const vfInstance = ref<FlowInstance>()
const onElementsRemove = (elementsToRemove: Elements) => removeElements(elementsToRemove, elements.value)
const onConnect = (params: Edge | Connection) => addEdge(params, elements.value)
const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView({ padding: 0.1 })
  vfInstance.value = flowInstance
}

const updatePos = () => {
  elements.value = elements.value.map((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      }
    }
    return el
  })
}

const logToObject = () => console.log(vfInstance.value?.toObject())
const resetTransform = () => vfInstance.value?.setTransform({ x: 0, y: 0, zoom: 1 })

const toggleclasss = () => {
  elements.value = elements.value.map((el) => {
    if (isNode(el)) el.class = el.class === 'light' ? 'dark' : 'light'
    return el
  })
}
</script>
<template>
  <VueFlow
    v-model="elements"
    class="vue-flow-basic-example"
    :default-zoom="1.5"
    :min-zoom="0.2"
    :max-zoom="4"
    :zoom-on-scroll="false"
    @elements-remove="onElementsRemove"
    @connect="onConnect"
    @node-drag-stop="onNodeDragStop"
    @node-click="onElementClick"
    @load="onLoad"
  >
    <Background />
    <MiniMap />
    <Controls />
    <div style="position: absolute; right: 10px; top: 10px; z-index: 4">
      <button style="margin-right: 5px" @click="resetTransform">reset transform</button>
      <button style="margin-right: 5px" @click="updatePos">change pos</button>
      <button style="margin-right: 5px" @click="toggleclasss">toggle classs</button>
      <button @click="logToObject">toObject</button>
    </div>
  </VueFlow>
</template>
