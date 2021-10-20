<script lang="ts" setup>
import Node from '~/components/Nodes/Node.vue'
import { NodeType, Node as TNode, Transform, Dimensions } from '~/types'
import { getNodesInside } from '~/utils/graph'
import { Store } from '~/context'

interface NodeRendererProps {
  nodeTypes: Record<string, NodeType>
  dimensions: Dimensions
  transform: Transform
}

const props = withDefaults(defineProps<NodeRendererProps>(), {
  transform: () => [0, 0, 1],
  dimensions: () => ({ width: 0, height: 0 }),
})

const store = inject(Store)!

const getNodes = computed(() =>
  store.onlyRenderVisibleElements
    ? store.nodes &&
      getNodesInside(
        store.nodes,
        {
          x: 0,
          y: 0,
          width: props.dimensions.width,
          height: props.dimensions.height,
        },
        props.transform,
        true,
      )
    : store.nodes,
)

const type = (node: TNode) => {
  const nodeType = node.type || 'default'
  const type = props.nodeTypes[nodeType] || props.nodeTypes.default
  if (!props.nodeTypes[nodeType]) {
    console.warn(`Node type "${nodeType}" not found. Using fallback type "default".`)
  }
  return type
}

const selected = (nodeId: string) => store.selectedElements?.some(({ id }) => id === nodeId)
onRenderTracked((e) => {
  console.log('node-renderer', e)
})
</script>
<template>
  <div
    class="revue-flow__nodes"
    :style="{ transform: `translate(${props.transform[0]}px,${props.transform[1]}px) scale(${props.transform[2]})` }"
  >
    <template v-for="node of getNodes" :key="node.id">
      <Node
        v-if="!node.isHidden"
        :node="node"
        :type="type(node)"
        :scale="props.transform[2]"
        :snap-grid="store.snapToGrid ? store.snapGrid : undefined"
        :selected="selected(node.id)"
        :selectable="node.selectable || store.elementsSelectable"
        :connectable="node.connectable || store.nodesConnectable"
        :draggable="node.draggable || store.nodesDraggable"
      />
    </template>
  </div>
</template>
