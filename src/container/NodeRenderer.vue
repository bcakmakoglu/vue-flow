<script lang="ts" setup>
import Node from '~/components/Nodes/Node'
import { NodeType, Node as TNode, Transform, Dimensions } from '~/types'
import { getNodesInside } from '~/utils/graph'

interface NodeRendererProps {
  nodes: TNode[]
  transform: Transform
  nodeTypes: Record<string, NodeType>
  selectNodesOnDrag: boolean
  snapToGrid: boolean
  snapGrid: [number, number]
  onlyRenderVisibleElements: boolean
  dimensions: Dimensions
}

const props = withDefaults(defineProps<NodeRendererProps>(), {
  selectNodesOnDrag: true,
  snapGrid: () => [15, 15],
  snapToGrid: false,
  onlyRenderVisibleElements: false,
  transform: () => [0, 0, 1],
  nodes: () => [],
  dimensions: () => ({ width: 0, height: 0 }),
})

const getNodes = () =>
  props.onlyRenderVisibleElements
    ? props.nodes &&
      getNodesInside(
        props.nodes,
        {
          x: 0,
          y: 0,
          width: props.dimensions.width,
          height: props.dimensions.height,
        },
        props.transform,
        true,
      )
    : props.nodes

const cNodes = computed(() => getNodes())

const type = (node: TNode) => {
  const nodeType = node.type || 'default'
  if (props.nodeTypes) {
    const type = props.nodeTypes[nodeType] || props.nodeTypes.default
    if (!props.nodeTypes[nodeType]) {
      console.warn(`Node type "${nodeType}" not found. Using fallback type "default".`)
    }
    return type
  }
  return false
}
</script>
<template>
  <div
    class="revue-flow__nodes"
    :style="{ transform: `translate(${props.transform[0]}px,${props.transform[1]}px) scale(${props.transform[2]})` }"
  >
    <template v-for="(node, i) of cNodes" :key="`node-${i}`">
      <div>Node</div>
      <Node
        v-if="type(node)"
        :node="node"
        :snap-grid="props.snapGrid"
        :snap-to-grid="props.snapToGrid"
        :select-nodes-on-drag="props.selectNodesOnDrag"
        :type="type(node)"
      />
    </template>
  </div>
</template>
