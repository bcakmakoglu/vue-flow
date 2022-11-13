<script setup>
import { Background, BackgroundVariant, MiniMap, Panel, PanelPosition } from '@vue-flow/additional-components'
import { VueFlow, useVueFlow } from '@vue-flow/core'

const { nodes, addNodes, edges, addEdges, onConnect, onPaneReady, onNodeDragStop, dimensions } = useVueFlow()

onConnect((params) => addEdges([params]))

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

    <Background :variant="BackgroundVariant.Lines" />

    <Panel :position="PanelPosition.TopRight">
      <button type="button" @click="addRandomNode">add node</button>
    </Panel>
  </VueFlow>
</template>
