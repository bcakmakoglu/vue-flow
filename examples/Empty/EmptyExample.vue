<script lang="ts" setup>
import { VueFlow, MiniMap, Controls, Background, BackgroundVariant, Node, useVueFlow, useElementsState } from '~/index'

const { onConnect, onPaneReady, onNodeDragStop, dimensions } = useVueFlow()
const { nodes, addNodes, edges, addEdges } = useElementsState()

onConnect((params) => addEdges[params])
onPaneReady((flowInstance) => console.log('flow loaded:', flowInstance))
onNodeDragStop((node) => console.log('drag stop', node))

const addRandomNode = () => {
  const nodeId = (nodes.length + 1).toString()
  const newNode: Node = {
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
