<script lang="ts" setup>
import NodeWrapper from '../../components/Nodes/NodeWrapper.vue'
import { GraphNode, SnapGrid } from '../../types'

interface Props {
  draggable?: boolean
  selectable?: boolean
  connectable?: boolean
  snapToGrid?: boolean
  snapGrid?: SnapGrid
  nodes: GraphNode[]
}

const props = defineProps<Props>()

const draggable = (d?: boolean) => (typeof d === 'undefined' ? props.draggable : d)
const selectable = (s?: boolean) => (typeof s === 'undefined' ? props.selectable : s)
const connectable = (c?: boolean) => (typeof c === 'undefined' ? props.connectable : c)
const snapGrid = (sg?: SnapGrid) => (sg ?? props.snapToGrid ? props.snapGrid : undefined)
</script>
<script lang="ts">
export default {
  name: 'Nodes',
}
</script>
<template>
  <div class="vue-flow__nodes vue-flow__container">
    <NodeWrapper
      v-for="node of props.nodes"
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
