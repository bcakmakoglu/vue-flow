<script lang="ts" setup>
import dagre from 'dagre'
import { ConnectionMode, Panel, Position, VueFlow, useVueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'

import '@vue-flow/controls/dist/style.css'

import { initialEdges, initialNodes } from './initial-elements'
import { useRunProcess } from './useRunProcess'
import ProcessNode from './ProcessNode.vue'

const nodes = ref(initialNodes)

const edges = ref(initialEdges)

// we create a new graph instance, in case some nodes/edges were removed, otherwise dagre would act as if they were still there
const dagreGraph = ref(new dagre.graphlib.Graph())

dagreGraph.value.setDefaultEdgeLabel(() => ({}))

const { run } = useRunProcess()

const { findNode, fitView } = useVueFlow()

function handleLayout(direction: 'TB' | 'LR') {
  dagreGraph.value = new dagre.graphlib.Graph()
  dagreGraph.value.setDefaultEdgeLabel(() => ({}))

  const isHorizontal = direction === 'LR'
  dagreGraph.value.setGraph({ rankdir: direction })

  for (const node of nodes.value) {
    // if you need width+height of nodes for your layout, you can use the dimensions property of the internal node (`GraphNode` type)
    const graphNode = findNode(node.id)!

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
    <VueFlow :nodes="nodes" :edges="edges" :connection-mode="ConnectionMode.Loose" @nodes-initialized="handleLayout('TB')">
      <template #node-process="props">
        <ProcessNode v-bind="props" />
      </template>

      <Controls />

      <Panel style="display: flex; gap: 10px" position="top-right">
        <button @click="handleLayout('TB')">vertical layout</button>
        <button @click="handleLayout('LR')">horizontal layout</button>

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
</style>
