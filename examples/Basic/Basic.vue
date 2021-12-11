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
const nodes = ref<Elements>([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },
  { id: '4', label: 'Node 4', position: { x: 400, y: 200 } },
])
const edges = ref<Elements>([])
const vfInstance = ref<FlowInstance>()
const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView({ padding: 0.1 })
  vfInstance.value = flowInstance
}

const logToObject = () => console.log(vfInstance.value?.toObject())
const resetTransform = () => vfInstance.value?.setTransform({ x: 0, y: 0, zoom: 1 })
</script>
<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    class="vue-flow-basic-example"
    :default-zoom="1.5"
    :min-zoom="0.2"
    :max-zoom="4"
    :zoom-on-scroll="false"
    @node-drag-stop="onNodeDragStop"
    @node-click="onElementClick"
    @load="onLoad"
  >
    <Background />
    <MiniMap />
    <Controls />
  </VueFlow>
</template>
