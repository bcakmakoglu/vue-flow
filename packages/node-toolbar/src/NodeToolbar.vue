<script lang="ts" setup>
import { computed, inject, toRef } from 'vue'
import type { GraphNode, Rect, ViewportTransform } from '@vue-flow/core'
import { NodeIdInjection, Position, getRectOfNodes, useVueFlow } from '@vue-flow/core'

import type { CSSProperties } from 'vue'
import type { Align, NodeToolbarProps } from './types'

const props = withDefaults(defineProps<NodeToolbarProps>(), {
  position: Position.Top,
  offset: 10,
  align: 'center',
})

const contextNodeId = inject(NodeIdInjection, null)

const { viewportRef, viewport, getSelectedNodes, findNode } = useVueFlow()

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

const isActive = toRef(() =>
  typeof props.isVisible === 'boolean'
    ? props.isVisible
    : nodes.value.length === 1 && nodes.value[0].selected && getSelectedNodes.value.length === 1,
)

// todo: fix typecasting
const nodeRect = computed(() => getRectOfNodes(nodes.value as any[]))

const zIndex = computed(() => Math.max(...nodes.value.map((node) => (node.computedPosition.z || 1) + 1)))

const wrapperStyle = computed<CSSProperties>(() => ({
  position: 'absolute',
  transform: getTransform(nodeRect.value, viewport.value, props.position, props.offset, props.align),
  zIndex: zIndex.value,
}))

function getTransform(nodeRect: Rect, transform: ViewportTransform, position: Position, offset: number, align: Align): string {
  let alignmentOffset = 0.5

  if (align === 'start') {
    alignmentOffset = 0
  } else if (align === 'end') {
    alignmentOffset = 1
  }

  // position === Position.Top
  // we set the x any y position of the toolbar based on the nodes position
  let pos = [
    (nodeRect.x + nodeRect.width * alignmentOffset) * transform.zoom + transform.x,
    nodeRect.y * transform.zoom + transform.y - offset,
  ]
  // and then shift it based on the alignment. The shift values are in %.
  let shift = [-100 * alignmentOffset, -100]

  switch (position) {
    case Position.Right:
      pos = [
        (nodeRect.x + nodeRect.width) * transform.zoom + transform.x + offset,
        (nodeRect.y + nodeRect.height * alignmentOffset) * transform.zoom + transform.y,
      ]
      shift = [0, -100 * alignmentOffset]
      break
    case Position.Bottom:
      pos[1] = (nodeRect.y + nodeRect.height) * transform.zoom + transform.y + offset
      shift[1] = 0
      break
    case Position.Left:
      pos = [
        nodeRect.x * transform.zoom + transform.x - offset,
        (nodeRect.y + nodeRect.height * alignmentOffset) * transform.zoom + transform.y,
      ]
      shift = [-100, -100 * alignmentOffset]
      break
  }

  return `translate(${pos[0]}px, ${pos[1]}px) translate(${shift[0]}%, ${shift[1]}%)`
}
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
