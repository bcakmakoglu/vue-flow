<script lang="ts" setup>
import { computed, inject } from 'vue'
import type { GraphNode, Rect, ViewportTransform } from '@vue-flow/core'
import { NodeIdInjection, Position, getRectOfNodes, useVueFlow } from '@vue-flow/core'

import type { CSSProperties } from 'vue'
import type { NodeToolbarProps } from './types'

const props = withDefaults(defineProps<NodeToolbarProps>(), {
  position: Position.Top,
  offset: 10,
})

const contextNodeId = inject(NodeIdInjection, null)

const { viewportRef, viewport, getSelectedNodes, findNode } = useVueFlow()

function getTransform(nodeRect: Rect, transform: ViewportTransform, position: Position, offset: number): string {
  // position === Position.Top
  let xPos = (nodeRect.x + nodeRect.width / 2) * transform.zoom + transform.x
  let yPos = nodeRect.y * transform.zoom + transform.y - offset
  let xShift = -50
  let yShift = -100

  switch (position) {
    case Position.Right:
      xPos = (nodeRect.x + nodeRect.width) * transform.zoom + transform.x + offset
      yPos = (nodeRect.y + nodeRect.height / 2) * transform.zoom + transform.y
      xShift = 0
      yShift = -50
      break
    case Position.Bottom:
      yPos = (nodeRect.y + nodeRect.height) * transform.zoom + transform.y + offset
      yShift = 0
      break
    case Position.Left:
      xPos = nodeRect.x * transform.zoom + transform.x - offset
      yPos = (nodeRect.y + nodeRect.height / 2) * transform.zoom + transform.y
      xShift = -100
      yShift = -50
      break
  }

  return `translate(${xPos}px, ${yPos}px) translate(${xShift}%, ${yShift}%)`
}

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

const nodeRect = computed<Rect>(() => getRectOfNodes(nodes.value))

const zIndex = computed<number>(() => Math.max(...nodes.value.map((node) => (node.computedPosition.z || 1) + 1)))

const wrapperStyle = computed<CSSProperties>(() => ({
  position: 'absolute',
  transform: getTransform(nodeRect.value, viewport.value, props.position, props.offset),
  zIndex: zIndex.value,
}))
</script>

<script lang="ts">
export default {
  name: 'NodeToolbar',
  inheritAttrs: false,
}
</script>

<template>
  <Teleport :to="viewportRef">
    <div v-if="isActive && nodes.length" v-bind="$attrs" :style="wrapperStyle" class="vue-flow__node-toolbar">
      <slot />
    </div>
  </Teleport>
</template>
