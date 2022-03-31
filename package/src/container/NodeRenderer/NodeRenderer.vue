<script lang="ts" setup>
import NodeWrapper from '../../components/Nodes/NodeWrapper.vue'
import { useVueFlow } from '../../composables'

const { store } = useVueFlow()
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
      :key="`vue-flow__node-${node.id}`"
      :node="node"
      :draggable="typeof node.draggable === 'undefined' ? store.nodesDraggable : !!node.draggable"
      :selectable="typeof node.selectable === 'undefined' ? store.elementsSelectable : !!node.selectable"
      :connectable="typeof node.connectable === 'undefined' ? store.nodesConnectable : !!node.connectable"
      :snap-grid="node.snapGrid ?? (store.snapToGrid ? store.snapGrid : undefined)"
    />
  </div>
</template>
