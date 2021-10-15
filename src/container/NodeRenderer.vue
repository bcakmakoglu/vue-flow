<script lang="ts" setup>
import Node from '~/components/Node.vue'
import { NodeType, Node as TNode, Transform, Dimensions, NodeDimensionUpdate } from '~/types'
import { getNodesInside } from '~/utils/graph'
import { getDimensions } from '~/utils'
import { getHandleBounds } from '~/components/Nodes/utils'

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

const nodes = ref(props.nodes)
const getNodes = () =>
  props.onlyRenderVisibleElements
    ? nodes.value &&
      getNodesInside(
        nodes.value,
        {
          x: 0,
          y: 0,
          width: props.dimensions.width,
          height: props.dimensions.height,
        },
        props.transform,
        true,
      )
    : nodes.value

const cNodes = computed(() => getNodes())

const type = (node: TNode) => {
  const nodeType = node.type || 'default'
  const type = props.nodeTypes[nodeType] || props.nodeTypes.default
  if (!props.nodeTypes[nodeType]) {
    console.warn(`Node type "${nodeType}" not found. Using fallback type "default".`)
  }
  return type
}

const updateNodeDimensions = (updates: NodeDimensionUpdate[]) => {
  nodes.value = nodes.value.map((node) => {
    const update = updates.find((u) => u.id === node.id)
    if (update) {
      const dimensions = getDimensions(update.nodeElement)
      const doUpdate =
        dimensions.width &&
        dimensions.height &&
        (node.__rf.width !== dimensions.width || node.__rf.height !== dimensions.height || update.forceUpdate)

      if (doUpdate) {
        const handleBounds = getHandleBounds(update.nodeElement, props.transform[2])

        return {
          ...node,
          __rf: {
            ...node.__rf,
            ...dimensions,
            handleBounds,
          },
        }
      }
    }

    return node
  })
}
</script>
<template>
  <div
    class="revue-flow__nodes"
    :style="{ transform: `translate(${props.transform[0]}px,${props.transform[1]}px) scale(${props.transform[2]})` }"
  >
    <template v-for="(node, i) of cNodes" :key="`node-${i}`">
      <Node
        :node="node"
        :snap-grid="props.snapGrid"
        :snap-to-grid="props.snapToGrid"
        :select-nodes-on-drag="props.selectNodesOnDrag"
        :scale="props.transform[2]"
        @updateNodeDimensions="updateNodeDimensions"
      >
        <template #default="{ selected, isConnectable }">
          <component
            :is="type(node)"
            v-bind="{
              data: node.data,
              type: node.type,
              xPos: node.__rf.position.x,
              yPos: node.__rf.position.y,
              selected: selected,
              isConnectable: isConnectable,
              sourcePosition: node.sourcePosition,
              targetPosition: node.targetPosition,
              isDragging: node.__rf.isDragging,
            }"
          />
        </template>
      </Node>
    </template>
  </div>
</template>
