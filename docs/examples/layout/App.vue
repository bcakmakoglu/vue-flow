<script setup>
import { nextTick, ref } from 'vue'
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import Icon from './Icon.vue'
import ProcessNode from './ProcessNode.vue'
import AnimationEdge from './AnimationEdge.vue'

import { initialEdges, initialNodes } from './initial-elements.js'
import { useRunProcess } from './useRunProcess'
import { useLayout } from './useLayout'

const nodes = ref(initialNodes)

const edges = ref(initialEdges)

const cancelOnError = ref(true)

const { graph, layout } = useLayout()

const { run, stop, reset, isRunning } = useRunProcess({ graph, cancelOnError })

const { fitView } = useVueFlow()

async function layoutGraph(direction) {
  await stop()

  reset(nodes.value)

  nodes.value = layout(nodes.value, edges.value, direction)

  nextTick(() => {
    fitView()
  })
}
</script>

<template>
  <div class="layout-flow">
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      :default-edge-options="{ type: 'animation', animated: true }"
      @nodes-initialized="layoutGraph('LR')"
    >
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
          :data="edgeProps.data"
        />
      </template>

      <Background />

      <Panel class="process-panel" position="top-right">
        <div class="layout-panel">
          <button v-if="isRunning" class="stop-btn" title="stop" @click="stop">
            <Icon name="stop" />
            <span class="spinner" />
          </button>
          <button v-else title="start" @click="run(nodes)">
            <Icon name="play" />
          </button>

          <button title="set horizontal layout" @click="layoutGraph('LR')">
            <Icon name="horizontal" />
          </button>

          <button title="set vertical layout" @click="layoutGraph('TB')">
            <Icon name="vertical" />
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
.layout-flow {
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

.process-panel button {
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

.stop-btn svg {
  display: none;
}

.stop-btn:hover svg {
  display: block;
}

.stop-btn:hover .spinner {
  display: none;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2563eb;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
