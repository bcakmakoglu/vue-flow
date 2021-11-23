<script lang="ts" setup>
import { GraphNode, NodeComponent, SnapGrid, Transform } from '../../types'
import NodeWrapper from '../../components/Nodes/NodeWrapper.vue'

interface NodeRendererProps {
  nodes?: GraphNode[]
  nodeTypes: Record<string, NodeComponent>
  selectNodesOnDrag?: boolean
  snapToGrid?: boolean
  snapGrid?: SnapGrid
  transform: Transform
  elementsSelectable?: boolean
  nodesDraggable?: boolean
  nodesConnectable?: boolean
}

const props = withDefaults(defineProps<NodeRendererProps>(), {
  selectNodesOnDrag: true,
  nodesConnectable: true,
  nodesDraggable: true,
  elementsSelectable: true,
  snapToGrid: false,
  snapGrid: () => [15, 15],
})

const getType = (type?: string) => {
  const t = type ?? 'default'
  let nodeType = props.nodeTypes[t]
  if (!nodeType) {
    nodeType = props.nodeTypes.default
    console.warn(`Node type "${type}" not found. Using fallback type "default".`)
  }
  return nodeType
}

const transform = computed(() => `translate(${props.transform[0]}px,${props.transform[1]}px) scale(${props.transform[2]})`)
const snapGrid = (node: GraphNode) => node.snapGrid ?? (props.snapToGrid ? props.snapGrid : undefined)
</script>
<script lang="ts">
export default {
  name: 'Nodes',
}
</script>
<template>
  <div class="vue-flow__nodes" :style="{ transform }">
    <NodeWrapper
      v-for="(node, i) of props.nodes"
      :key="`${node.id}-${i}`"
      :node="node"
      :vf="node.__vf"
      :component="getType(node.type)"
      :draggable="typeof node.draggable === 'undefined' ? props.nodesDraggable : node.draggable"
      :selectable="typeof node.selectable === 'undefined' ? props.elementsSelectable : node.selectable"
      :connectable="typeof node.connectable === 'undefined' ? props.nodesConnectable : node.connectable"
      :snap-grid="snapGrid(node)"
      :select-nodes-on-drag="props.selectNodesOnDrag"
      :scale="props.transform[2]"
    >
      <template #default="nodeProps">
        <slot :name="`node-${node.type}`" v-bind="nodeProps"></slot>
      </template>
    </NodeWrapper>
  </div>
</template>
