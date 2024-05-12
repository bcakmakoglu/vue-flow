<script lang="ts" setup>
import dagre from '@dagrejs/dagre'
import { ConnectionMode, Panel, Position, VueFlow, useVueFlow } from '@vue-flow/core'

import { initialEdges, initialNodes } from './initial-elements'
import { useRunProcess } from './useRunProcess'
import AnimationEdge from './AnimationEdge.vue'
import ProcessNode from './ProcessNode.vue'

const nodes = ref(initialNodes)

const edges = ref(initialEdges)

// we create a new graph instance, in case some nodes/edges were removed, otherwise dagre would act as if they were still there
const dagreGraph = ref(new dagre.graphlib.Graph())

dagreGraph.value.setDefaultEdgeLabel(() => ({}))

const { run, stop, isRunning } = useRunProcess(dagreGraph)

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
    <VueFlow :nodes="nodes" :edges="edges" :connection-mode="ConnectionMode.Loose" @nodes-initialized="handleLayout('LR')">
      <template #node-process="props">
        <ProcessNode v-bind="props" />
      </template>

      <template #edge-animation="props">
        <AnimationEdge v-bind="props" />
      </template>

      <Panel class="layout-panel" position="top-left">
        <button @click="handleLayout('TB')">vertical</button>
        <button @click="handleLayout('LR')">horizontal</button>
      </Panel>

      <Panel class="process-panel" position="top-right">
        <button v-if="isRunning" @click="stop">🛑</button>
        <button v-else @click="run(nodes)">▶️</button>
      </Panel>
    </VueFlow>
  </div>
</template>

<style>
.layoutflow {
  background-color: #1a192b;
  height: 100%;
  width: 100%;
}

.process-panel,
.layout-panel {
  display: flex;
  gap: 10px;
}

.process-panel button,
.layout-panel button {
  border: none;
  padding: 10px;
  cursor: pointer;
  background-color: #2d3748;
  border-radius: 8px;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.process-panel button {
  font-size: 24px;
  width: 50px;
  height: 50px;
}

.process-panel button:hover,
.layout-panel button:hover {
  background-color: #4b5563;
  transition: background-color 0.2s;
}

.process-panel button:disabled {
  background-color: #4b5563;
  cursor: not-allowed;
}
</style>
