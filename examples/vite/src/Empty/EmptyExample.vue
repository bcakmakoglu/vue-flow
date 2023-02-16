<script lang="ts" setup>
import type { Node } from '@vue-flow/core'
import { VueFlow, useVueFlow } from '@vue-flow/core'

import { Background, BackgroundVariant } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

const { nodes, addNodes, addEdges, onConnect, onPaneReady, onNodeDragStop, dimensions } = useVueFlow()

onConnect((params) => addEdges([params]))
onPaneReady((flowInstance) => console.log('flow loaded:', flowInstance))
onNodeDragStop((node) => console.log('drag stop', node))

const addRandomNode = () => {
  const nodeId = (nodes.value.length + 1).toString()
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
