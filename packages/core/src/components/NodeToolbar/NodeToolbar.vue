<script lang="ts" setup>
import { computed, inject } from 'vue'
import { getNodeToolbarTransform } from '@xyflow/system'
import type { CSSProperties } from 'vue'
import { useVueFlow } from '../../composables'
import { NodeId } from '../../context'
import type { GraphNode } from '../../types'
import { Position } from '../../types'
import { getNodesBounds } from '../../utils'

import type { NodeToolbarProps } from './types'

const props = withDefaults(defineProps<NodeToolbarProps>(), {
  position: Position.Top,
  offset: 10,
  align: 'center',
  isVisible: undefined,
})

const contextNodeId = inject(NodeId, null)

const { viewportRef, viewport, getSelectedNodes, findNode, nodeLookup } = useVueFlow()

const nodes = computed(() => {
  const nodeIds = Array.isArray(props.nodeId) ? props.nodeId : [props.nodeId || contextNodeId || '']

  return nodeIds.reduce<GraphNode[]>((acc, id) => {
    const node = findNode(id)

    if (node) {
      acc.push(node)
    }

    return acc
  }, [] as GraphNode[])
})

const isActive = computed(() =>
  typeof props.isVisible === 'boolean'
    ? props.isVisible
    : nodes.value.length === 1 && nodes.value[0].selected && getSelectedNodes.value.length === 1,
)

const nodeRect = computed(() => getNodesBounds(nodes.value, { nodeLookup: nodeLookup.value }))

const zIndex = computed(() => Math.max(...nodes.value.map((node) => (node.internals.z || 1) + 1)))

const wrapperStyle = computed<CSSProperties>(() => ({
  position: 'absolute',
  transform: getNodeToolbarTransform(nodeRect.value, viewport.value, props.position, props.offset, props.align),
  zIndex: zIndex.value,
}))
</script>

<script lang="ts">
export default {
  name: 'NodeToolbar',
  compatConfig: { MODE: 3 },
  inheritAttrs: false,
}
</script>

<template>
  <Teleport :to="viewportRef" :disabled="!viewportRef">
    <div v-if="isActive && nodes.length" v-bind="$attrs" :style="wrapperStyle" class="vue-flow__node-toolbar">
      <slot />
    </div>
  </Teleport>
</template>
