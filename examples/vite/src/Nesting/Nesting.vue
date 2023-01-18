<script setup lang="ts">
import { Controls } from '@vue-flow/controls'
import { Background } from '@vue-flow/background'
import { PanelPosition, VueFlow, useVueFlow } from '@vue-flow/core'
import DiagramCustomNode from './DiagramCustomNode.vue'
import DiagramCustomParentNode from './DiagramCustomParentNode.vue'
import data from './data.json'

const elements = ref<any[]>([])

setTimeout(() => {
  elements.value = data
}, 1000)

const {
  fitView,
  setInteractive,
  nodesConnectable,
  nodesDraggable,
  onNodesChange,
  onEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  getNodesInitialized,
  onNodesInitialized,
} = useVueFlow()

function onPaneReady() {
  fitView({
    minZoom: 1,
    maxZoom: 1,
  })
  setInteractive(false)

  nodesConnectable.value = false
  nodesDraggable.value = true
}

onNodesChange((changes) => {
  const validChanges = changes.filter((change) => change.type !== 'remove')
  applyNodeChanges(validChanges)
})

onEdgesChange((changes) => {
  const validChanges = changes.filter((change) => change.type !== 'remove')
  applyEdgeChanges(validChanges)
})

onNodesInitialized((nodesInitialized) => {
  console.log(nodesInitialized)
  nodesInitialized.forEach((node) => {
    if (node.expandParent) {
      node.expandParent = false
      node.extent = {
        range: 'parent',
        padding: [48, 24, 24, 24],
      }
    }
  })
})
</script>

<template>
  <VueFlow
    v-model="elements"
    class="panel"
    :nodes-connectable="false"
    :apply-default="false"
    elevate-edges-on-select
    @pane-ready="onPaneReady"
  >
    <template #node-custom="props">
      <DiagramCustomNode :data="props.data" />
    </template>

    <template #node-custom-parent="props">
      <DiagramCustomParentNode :data="props.data" />
    </template>

    <Controls :show-interactive="false" :position="PanelPosition.BottomRight" />

    <Background />
  </VueFlow>
</template>

<style src="./CustomDiagram.css"></style>
