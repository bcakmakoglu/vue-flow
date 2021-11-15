<script lang="ts" setup>
import Node from '~/components/Nodes/Node.vue'
import { NodeType, Node as TNode } from '~/types'
import { getNodesInside } from '~/utils'
import { useStore } from '~/composables'

interface NodeRendererProps {
  nodeTypes: Record<string, NodeType>
  selectNodesOnDrag?: boolean
}

const props = withDefaults(defineProps<NodeRendererProps>(), {
  selectNodesOnDrag: true,
})

const store = useStore()

const nodes = computed(() => {
  const n = store.onlyRenderVisibleElements
    ? store.nodes &&
      getNodesInside(
        store.nodes,
        {
          x: 0,
          y: 0,
          width: store.dimensions.width,
          height: store.dimensions.height,
        },
        store.transform,
        true,
      )
    : store.nodes

  return n.filter((node) => !node.isHidden)
})
const transform = computed(() => `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`)
const snapGrid = computed(() => (store.snapToGrid ? store.snapGrid : undefined))

const type = (node: TNode) => {
  const nodeType = node.type || 'default'
  const type = props.nodeTypes[nodeType] || props.nodeTypes.default
  if (!props.nodeTypes[nodeType]) {
    console.warn(`Node type "${nodeType}" not found. Using fallback type "default".`)
  }
  return type
}
const selected = (nodeId: string) => store.selectedElements?.some(({ id }) => id === nodeId)
</script>
<template>
  <div class="vue-flow__nodes" :style="{ transform }">
    <template v-for="node of nodes" :key="node.id">
      <Node
        :node="node"
        :type="type(node)"
        :snap-grid="snapGrid"
        :select-nodes-on-drag="props.selectNodesOnDrag"
        :selected="selected(node.id)"
      >
        <template #default="nodeProps">
          <slot :name="`node-${node.type}`" v-bind="nodeProps"></slot>
        </template>
      </Node>
    </template>
  </div>
</template>
