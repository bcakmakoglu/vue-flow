<script setup>
import dagre from 'dagre'
import { nextTick, ref } from 'vue'
import { Panel, Position, VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import ProcessNode from './ProcessNode.vue'
import AnimationEdge from './AnimationEdge.vue'

import { initialEdges, initialNodes } from './initial-elements.js'
import { useRunProcess } from './useRunProcess'

const nodes = ref(initialNodes)

const edges = ref(initialEdges)

const dagreGraph = ref(new dagre.graphlib.Graph())

const cancelOnError = ref(true)

const { run, stop, isRunning } = useRunProcess({ dagreGraph, cancelOnError })

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
        <ProcessNode :data="props.data" :source-position="props.sourcePosition" :target-position="props.targetPosition" />
      </template>

      <template #edge-animation="edgeProps">
        <AnimationEdge
          :id="edgeProps.id"
          :source="edgeProps.source"
          :target="edgeProps.target"
          :source-x="edgeProps.sourceX"
          :source-y="edgeProps.sourceY"
          :targetX="edgeProps.targetX"
          :targetY="edgeProps.targetY"
          :source-position="edgeProps.sourcePosition"
          :target-position="edgeProps.targetPosition"
        />
      </template>

      <Background />

      <Panel class="process-panel" position="top-right">
        <div class="layout-panel">
          <button v-if="isRunning" @click="stop">🛑</button>
          <button v-else @click="run(nodes)">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </button>

          <button title="horizontal" @click="handleLayout('LR')">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M2,12 L22,12" stroke="currentColor" stroke-width="2" />
              <path d="M7,7 L2,12 L7,17" stroke="currentColor" stroke-width="2" fill="none" />
              <path d="M17,7 L22,12 L17,17" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
          </button>
          <button title="vertical" @click="handleLayout('TB')">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12,2 L12,22" stroke="currentColor" stroke-width="2" />
              <path d="M7,7 L12,2 L17,7" stroke="currentColor" stroke-width="2" fill="none" />
              <path d="M7,17 L12,22 L17,17" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
          </button>
        </div>

        <div class="checkbox-panel">
          <label>Cancel on error</label>
          <input v-model="cancelOnError" type="checkbox" />
        </div>
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

.process-panel {
  background-color: #2d3748;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}

.process-panel button,
.layout-panel button {
  border: none;
  cursor: pointer;
  background-color: #4a5568;
  border-radius: 8px;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.process-panel button {
  font-size: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-panel {
  display: flex;
  align-items: center;
  gap: 10px;
}

.process-panel button:hover,
.layout-panel button:hover {
  background-color: #2563eb;
  transition: background-color 0.2s;
}

.process-panel label {
  color: white;
  font-size: 12px;
}
</style>
