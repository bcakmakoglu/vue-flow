<script setup>
import dagre from 'dagre'
import { nextTick, ref } from 'vue'
import { Panel, Position, VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import ProcessNode from './ProcessNode.vue'

import { initialEdges, initialNodes } from './initial-elements.js'
import { useRunProcess } from './useRunProcess'

const nodes = ref(initialNodes)

const edges = ref(initialEdges)

const dagreGraph = ref(new dagre.graphlib.Graph())

dagreGraph.value.setDefaultEdgeLabel(() => ({}))

const { run } = useRunProcess()

const { findNode, fitView } = useVueFlow()

function handleLayout(direction) {
  // we create a new graph instance, in case some nodes/edges were removed, otherwise dagre would act as if they were still there
  dagreGraph.value = new dagre.graphlib.Graph()

  dagreGraph.value.setDefaultEdgeLabel(() => ({}))

  const isHorizontal = direction === 'LR'
  dagreGraph.value.setGraph({ rankdir: direction })

  for (const node of nodes.value) {
    // if you need width+height of nodes for your layout, you can use the dimensions property of the internal node (`GraphNode` type)
    const graphNode = findNode(node.id)

    dagreGraph.value.setNode(node.id, { width: graphNode.dimensions.width || 150, height: graphNode.dimensions.height || 50 })
  }

  for (const edge of edges.value) {
    dagreGraph.value.setEdge(edge.source, edge.target)
  }

  dagre.layout(dagreGraph.value)

  // set nodes with updated positions
  nodes.value = nodes.value.map((node) => {
    const nodeWithPosition = dagreGraph.value.node(node.id)

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
    <VueFlow :nodes="nodes" :edges="edges" @nodes-initialized="handleLayout('LR')">
      <template #node-process="props">
        <ProcessNode v-bind="props" />
      </template>

      <Background />

      <Panel style="display: flex; gap: 1rem" position="top-right">
        <button @click="handleLayout('TB')">vertical</button>
        <button @click="handleLayout('LR')">horizontal</button>

        <button @click="run(nodes, dagreGraph)">Run</button>
      </Panel>
    </VueFlow>
  </div>
</template>

<style>
.layoutflow {
  height: 100%;
  width: 100%;
}

.layoutflow .vue-flow .vue-flow__edge-path {
  stroke: #10b981;
  stroke-width: 2px;
}
</style>
