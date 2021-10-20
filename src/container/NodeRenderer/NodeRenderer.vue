<script lang="ts" setup>
import Node from '~/components/Nodes/Node.vue'
import { NodeType, Node as TNode } from '~/types'
import { getNodesInside } from '~/utils/graph'
import { Store } from '~/context'

interface NodeRendererProps {
  nodeTypes: Record<string, NodeType>
}

const props = defineProps<NodeRendererProps>()

const store = inject(Store)!

const getNodes = computed(() =>
  store.onlyRenderVisibleElements
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
</script>
<template>
  <div
    class="revue-flow__nodes"
    :style="{ transform: `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})` }"
  >
    <template v-for="node of getNodes" :key="node.id">
      <Node
        v-if="!node.isHidden"
        :node="node"
        :type="type(node)"
        :scale="store.transform[2]"
        :snap-grid="store.snapToGrid ? store.snapGrid : undefined"
        :selected="selected(node.id)"
        :selectable="node.selectable || store.elementsSelectable"
        :connectable="node.connectable || store.nodesConnectable"
        :draggable="node.draggable || store.nodesDraggable"
      >
        <template #default="nodeProps">
          <slot :name="`node-${node.type}`" v-bind="nodeProps"></slot>
        </template>
      </Node>
    </template>
  </div>
</template>
