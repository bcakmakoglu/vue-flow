<script setup>
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { nextTick, ref } from 'vue'
import { getElements } from './utils.js'

const { nodes: initialNodes, edges: initialEdges } = getElements(15, 15)

const nodes = ref(initialNodes)

const edges = ref(initialEdges)

const { dimensions, fitView } = useVueFlow()

function updatePos() {
  nodes.value = nodes.value.map((node) => {
    return {
      ...node,
      position: {
        x: Math.random() * dimensions.value.width,
        y: Math.random() * dimensions.value.height,
      },
    }
  })

  nextTick(() => {
    fitView({ padding: 0.5 })
  })
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" :min-zoom="0.1" fit-view-on-init>
    <MiniMap />

    <Background />

    <Panel position="top-right">
      <button style="margin-right: 5px" @click="updatePos">update positions</button>
    </Panel>
  </VueFlow>
</template>
