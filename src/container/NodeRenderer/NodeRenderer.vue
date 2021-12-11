<script lang="ts" setup>
import { GraphNode } from '../../types'
import NodeWrapper from '../../components/Nodes/NodeWrapper.vue'
import { useStore } from '../../composables'

const store = useStore()
const getType = (type?: string) => {
  const t = type ?? 'default'
  let nodeType = store.getNodeTypes[t]
  if (!nodeType) {
    nodeType = store.getNodeTypes.default
    console.warn(`Node type "${type}" not found. Using fallback type "default".`)
  }
  return nodeType
}

const transform = computed(() => `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`)
const snapGrid = (node: GraphNode) => node.snapGrid ?? (store.snapToGrid ? store.snapGrid : undefined)
</script>
<script lang="ts">
export default {
  name: 'Nodes',
}
</script>
<template>
  <div class="vue-flow__nodes" :style="{ transform }">
    <NodeWrapper
      v-for="(node, i) of store.getNodes"
      :key="`${node.id}-${i}`"
      :node="node"
      :component="getType(node.type)"
      :draggable="typeof node.draggable === 'undefined' ? store.nodesDraggable : node.draggable"
      :selectable="typeof node.selectable === 'undefined' ? store.elementsSelectable : node.selectable"
      :connectable="typeof node.connectable === 'undefined' ? store.nodesConnectable : node.connectable"
      :snap-grid="snapGrid(node)"
      :select-nodes-on-drag="store.selectNodesOnDrag"
      :scale="store.transform[2]"
    >
      <template #default="nodeProps">
        <slot :name="`node-${node.type}`" v-bind="nodeProps"></slot>
      </template>
    </NodeWrapper>
  </div>
</template>
