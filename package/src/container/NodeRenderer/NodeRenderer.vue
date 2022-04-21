<script lang="ts" setup>
import NodeWrapper from '../../components/Nodes/NodeWrapper.vue'
import { SnapGrid } from '../../types'
import { useVueFlow } from '../../composables'

const { store } = useVueFlow()

const draggable = (d?: boolean) => (typeof d === 'undefined' ? store.nodesDraggable : d)
const selectable = (s?: boolean) => (typeof s === 'undefined' ? store.elementsSelectable : s)
const connectable = (c?: boolean) => (typeof c === 'undefined' ? store.nodesConnectable : c)
const snapGrid = (sg?: SnapGrid) => (sg ?? store.snapToGrid ? store.snapGrid : undefined)
</script>
<script lang="ts">
export default {
  name: 'Nodes',
}
</script>
<template>
  <div class="vue-flow__nodes vue-flow__container">
    <NodeWrapper
      v-for="node of store.getNodes"
      :id="node.id"
      :key="node.id"
      :node="node"
      :draggable="draggable(node.draggable)"
      :selectable="selectable(node.selectable)"
      :connectable="connectable(node.connectable)"
      :snap-grid="snapGrid(node.snapGrid)"
    />
  </div>
</template>
