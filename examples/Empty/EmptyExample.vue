<script lang="ts" setup>
import { VueFlow, MiniMap, Controls, Background, BackgroundVariant, Node, useVueFlow } from '~/index'

const { useNodesState, useEdgesState, OnConnect, OnPaneReady, OnNodeDragStop } = useVueFlow()
const { nodes, addNodes } = useNodesState()
const { edges, addEdges } = useEdgesState()

OnConnect((params) => addEdges[params])
OnPaneReady((flowInstance) => console.log('flow loaded:', flowInstance))
OnNodeDragStop((node) => console.log('drag stop', node))

const addRandomNode = () => {
  const nodeId = (nodes.length + 1).toString()
  const newNode: Node = {
    id: nodeId,
    label: `Node: ${nodeId}`,
    position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
  } as Node
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
