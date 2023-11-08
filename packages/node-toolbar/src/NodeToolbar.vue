<script lang="ts" setup>
import { computed, inject, toRef } from 'vue'
import type { GraphNode } from '@vue-flow/core'
import { NodeIdInjection, Position, getRectOfNodes, useVueFlow } from '@vue-flow/core'

import type { CSSProperties } from 'vue'
import type { NodeToolbarProps } from './types'
import { getTransform } from './utils'

const { nodeId, position = Position.Top, offset = 10, align = 'center', isVisible = undefined } = defineProps<NodeToolbarProps>()

const contextNodeId = inject(NodeIdInjection, null)

const { viewportRef, viewport, getSelectedNodes, findNode } = useVueFlow()

const nodes = computed(() => {
  const nodeIds = Array.isArray(nodeId) ? nodeId : [nodeId || contextNodeId || '']

  return nodeIds.reduce<GraphNode[]>((acc, id) => {
    const node = findNode(id)

    if (node) {
      acc.push(node)
    }

    return acc
  }, [] as GraphNode[])
})

const isActive = toRef(() =>
  typeof isVisible === 'boolean'
    ? isVisible
    : nodes.value.length === 1 && nodes.value[0].selected && getSelectedNodes.value.length === 1,
)

// todo: fix typecasting
const nodeRect = computed(() => getRectOfNodes(nodes.value as any[]))

const zIndex = computed(() => Math.max(...nodes.value.map((node) => (node.computedPosition.z || 1) + 1)))

const wrapperStyle = computed<CSSProperties>(() => ({
  position: 'absolute',
  transform: getTransform(nodeRect.value, viewport.value, position, offset, align),
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
