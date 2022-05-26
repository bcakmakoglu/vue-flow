<script setup>
import { Background, BackgroundVariant, Controls, MiniMap, VueFlow, useVueFlow } from '@braks/vue-flow'

const { nodes, addNodes, edges, addEdges, onConnect, onPaneReady, onNodeDragStop, dimensions } = useVueFlow()

onConnect((params) => addEdges([params]))
onPaneReady((flowInstance) => console.log('flow loaded:', flowInstance))
onNodeDragStop((node) => console.log('drag stop', node))

const addRandomNode = () => {
  const nodeId = (nodes.value.length + 1).toString()
  const newNode = {
    id: nodeId,
    label: `Node: ${nodeId}`,
    position: { x: Math.random() * dimensions.value.width, y: Math.random() * dimensions.value.height },
  }
  addNodes([newNode])
}
</script>

<template>
  <VueFlow>
    <MiniMap />
    <Controls />
    <Background :variant="BackgroundVariant.Lines" />

    <button type="button" :style="{ position: 'absolute', left: '10px', top: '10px', zIndex: 4 }" @click="addRandomNode">
      add node
    </button>
  </VueFlow>
</template>
