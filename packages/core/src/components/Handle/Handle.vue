<script lang="ts" setup>
import { isFunction, isString } from '@vueuse/core'
import { useHandle, useNode, useVueFlow } from '../../composables'
import type { Position } from '../../types'
import { ConnectionMode } from '../../types'
import type { HandleProps } from '../../types/handle'
import { getDimensions } from '../../utils'

const { type = 'source', position = 'top' as Position, connectable = true, id, isValidConnection } = defineProps<HandleProps>()

const { connectionStartHandle, connectionMode, vueFlowRef, nodesConnectable } = $(useVueFlow())

const { id: nodeId, node, nodeEl, connectedEdges } = useNode()

const handle = ref<HTMLDivElement>()

const handleId = $computed(() => id ?? (connectionMode === ConnectionMode.Strict ? null : `${nodeId}__handle-${position}`))

const isConnectable = computed(() => {
  if (isString(connectable) && connectable === 'single') {
    return !connectedEdges.value.some((edge) => edge[type] === nodeId && edge[`${type}Handle`] === handleId)
  } else if (isFunction(connectable)) {
    return connectable(node, connectedEdges.value)
  }

  return connectable
})

const { onMouseDown, onClick } = useHandle()

const onMouseDownHandler = (event: MouseEvent) => {
  onMouseDown(event, handleId, nodeId, type === 'target', isValidConnection, undefined)
}

const onClickHandler = (event: MouseEvent) => {
  onClick(event, handleId ?? null, nodeId, type, isValidConnection)
}

onMounted(() => {
  const existingBounds = node.handleBounds[type]?.find((b) => b.id === handleId)
  if (!vueFlowRef || existingBounds) return

  const viewportNode = vueFlowRef.querySelector('.vue-flow__transformationpane')

  if (!nodeEl || !handle.value || !viewportNode) return

  const nodeBounds = nodeEl.value.getBoundingClientRect()

  const handleBounds = handle.value.getBoundingClientRect()

  const style = window.getComputedStyle(viewportNode)
  const { m22: zoom } = new window.DOMMatrixReadOnly(style.transform)

  const nextBounds = {
    id: handleId,
    position,
    x: (handleBounds.left - nodeBounds.left) / zoom,
    y: (handleBounds.top - nodeBounds.top) / zoom,
    ...getDimensions(handle.value),
  }

  node.handleBounds[type] = [...(node.handleBounds[type] ?? []), nextBounds]
})
</script>

<script lang="ts">
export default {
  name: 'Handle',
}
</script>

<template>
  <div
    ref="handle"
    :data-handleid="handleId"
    :data-nodeid="nodeId"
    :data-handlepos="position"
    class="vue-flow__handle nodrag"
    :class="[
      `vue-flow__handle-${position}`,
      `vue-flow__handle-${handleId}`,
      {
        source: type !== 'target',
        target: type === 'target',
        connectable: isConnectable,
        connecting:
          connectionStartHandle &&
          connectionStartHandle.nodeId === nodeId &&
          connectionStartHandle.handleId === handleId &&
          connectionStartHandle.type === type,
      },
    ]"
    @mousedown="onMouseDownHandler"
    @click="onClickHandler"
  >
    <slot :id="id" />
  </div>
</template>
