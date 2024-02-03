<script setup>
import dagre from 'dagre'
import { nextTick, ref } from 'vue'
import { Panel, Position, VueFlow, useVueFlow } from '@vue-flow/core'

import { initialEdges, initialNodes } from './initial-elements.js'

const nodes = ref(initialNodes)

const edges = ref(initialEdges)

const { findNode, fitView } = useVueFlow()

function handleLayout(direction) {
  // we create a new graph instance, in case some nodes/edges were removed, otherwise dagre would act as if they were still there
  const dagreGraph = new dagre.graphlib.Graph()

  dagreGraph.setDefaultEdgeLabel(() => ({}))

  const isHorizontal = direction === 'LR'
  dagreGraph.setGraph({ rankdir: direction })

  for (const node of nodes.value) {
    // if you need width+height of nodes for your layout, you can use the dimensions property of the internal node (`GraphNode` type)
    const graphNode = findNode(node.id)

    dagreGraph.setNode(node.id, { width: graphNode.dimensions.width || 150, height: graphNode.dimensions.height || 50 })
  }

  for (const edge of edges.value) {
    dagreGraph.setEdge(edge.source, edge.target)
  }

  dagre.layout(dagreGraph)

  // set nodes with updated positions
  nodes.value = nodes.value.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)

    return {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
    }
  })

  nextTick(() => {
    fitView()
  })
}
</script>

<template>
  <div class="layoutflow">
    <VueFlow :nodes="nodes" :edges="edges" @nodes-initialized="handleLayout('TB')">
      <Panel style="display: flex; gap: 1rem" position="top-right">
        <button @click="handleLayout('TB')">vertical layout</button>
        <button @click="handleLayout('LR')">horizontal layout</button>
      </Panel>
    </VueFlow>
  </div>
</template>

<style>
.layoutflow {
  height: 100%;
  width: 100%;
}
</style>
