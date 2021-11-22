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

const getType = (type: string) => {
  const t = type ?? 'default'
  let nodeType = props.nodeTypes[t]
  if (!nodeType) {
    nodeType = props.nodeTypes.default
    console.warn(`Node type "${type}" not found. Using fallback type "default".`)
  }
  return nodeType
}

const transform = computed(() => `translate(${props.transform[0]}px,${props.transform[1]}px) scale(${props.transform[2]})`)
const snapGrid = computed(() => (props.snapToGrid ? props.snapGrid : undefined))
</script>
<script lang="ts">
export default {
  name: 'Node',
}
</script>
<template>
  <div class="vue-flow__nodes" :style="{ transform }">
    <NodeWrapper
      v-for="(node, i) of props.nodes"
      :id="node.id"
      :key="`${node.id}-${i}`"
      :node="node"
      :vf="node.__vf"
      :position="node.position"
      :type="node.type"
      :component="getType(node.type)"
      :class="node.class"
      :style="node.style"
      :data="node.data"
      :target-position="node.targetPosition"
      :source-position="node.sourcePosition"
      :is-hidden="node.isHidden"
      :draggable="typeof node.draggable === 'undefined' ? props.elementsSelectable : node.draggable"
      :selectable="typeof node.selectable === 'undefined' ? props.elementsSelectable : node.selectable"
      :connectable="typeof node.connectable === 'undefined' ? props.elementsSelectable : node.connectable"
      :drag-handle="node.dragHandle"
      :snap-grid="snapGrid"
      :select-nodes-on-drag="props.selectNodesOnDrag"
      :scale="props.transform[2]"
    >
      <template #default="nodeProps">
        <slot :name="`node-${node.type}`" v-bind="nodeProps"></slot>
      </template>
    </NodeWrapper>
  </div>
</template>
