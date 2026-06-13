<script setup>
import { Background, MiniMap, Panel, VueFlow, storeToRefs, useStore, useVueFlow } from '@vue-flow/core'
import { nextTick, ref, watch } from 'vue'
import { getElements } from './utils.js'

const { nodes: initialNodes, edges: initialEdges } = getElements(15, 15)

const nodes = ref(initialNodes)

const edges = ref(initialEdges)

const { fitView, getSelectedNodes, setEdges } = useVueFlow()

const { dimensions } = storeToRefs(useStore())

// highlight edges that are connected to a selected node
watch(getSelectedNodes, (selectedNodes) => {
  const selectedNodeIds = new Set(selectedNodes.map((node) => node.id))

  setEdges((eds) =>
    eds.map((edge) => ({
      ...edge,
      style:
        selectedNodeIds.has(edge.source) || selectedNodeIds.has(edge.target) ? { stroke: '#10b981', strokeWidth: 3 } : undefined,
    })),
  )
})

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
  <VueFlow :nodes="nodes" :edges="edges" :min-zoom="0.1" fit-view>
    <MiniMap />

    <Background />

    <Panel position="top-right">
      <button style="margin-right: 5px" @click="updatePos">update positions</button>
    </Panel>
  </VueFlow>
</template>
