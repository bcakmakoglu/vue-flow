<script lang="ts" setup>
import NodeWrapper from '../../components/Nodes/NodeWrapper.vue'
import { SnapGrid } from '../../types'
import { useVueFlow } from '../../composables'

const { nodesDraggable, elementsSelectable, nodesConnectable, snapToGrid, snapGrid, getNodes } = $(useVueFlow())

const draggable = (d?: boolean) => (typeof d === 'undefined' ? nodesDraggable : d)
const selectable = (s?: boolean) => (typeof s === 'undefined' ? elementsSelectable : s)
const connectable = (c?: boolean) => (typeof c === 'undefined' ? nodesConnectable : c)
const hasSnapGrid = (sg?: SnapGrid) => (sg ?? snapToGrid ? snapGrid : undefined)
</script>
<script lang="ts">
export default {
  name: 'Nodes',
}
</script>
<template>
  <div class="vue-flow__nodes vue-flow__container">
    <NodeWrapper
      v-for="node of getNodes"
      :id="node.id"
      :key="node.id"
      :node="node"
      :draggable="draggable(node.draggable)"
      :selectable="selectable(node.selectable)"
      :connectable="connectable(node.connectable)"
      :snap-grid="hasSnapGrid(node.snapGrid)"
    />
  </div>
</template>
