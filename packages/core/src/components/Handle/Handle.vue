<script lang="ts" setup>
import { isFunction, isString } from '@vueuse/core'
import type { Position } from '../../types'
import type { HandleProps } from '../../types/handle'

const { position = 'top' as Position, connectable, id, isValidConnection, ...props } = defineProps<HandleProps>()

const type = toRef(props, 'type', 'source')

const { connectionStartHandle, vueFlowRef, nodesConnectable, noDragClassName } = useVueFlow()

const { id: nodeId, node, nodeEl, connectedEdges } = useNode()

const handle = ref<HTMLDivElement>()

const handleId = computed(() => id ?? `${nodeId}__handle-${position}`)

const { handlePointerDown, handleClick } = useHandle({
  nodeId,
  handleId,
  isValidConnection,
  type,
})

const isConnectable = computed(() => {
  if (isString(connectable) && connectable === 'single') {
    return !connectedEdges.value.some((edge) => {
      const id = edge[`${type.value}Handle`]

      if (edge[type.value] !== nodeId) {
        return false
      }

      return id ? id === handleId.value : true
    })
  }

  if (isFunction(connectable)) {
    return connectable(node, connectedEdges.value)
  }

  return isDef(connectable) ? connectable : nodesConnectable.value
})

// set up handle bounds if they don't exist yet and the node has been initialized (i.e. the handle was added after the node has already been mounted)
until(() => node.initialized)
  .toBe(true, { flush: 'post' })
  .then(() => {
    const existingBounds = node.handleBounds[type.value]?.find((b) => b.id === handleId.value)

    if (!vueFlowRef.value || existingBounds) return

    const viewportNode = vueFlowRef.value.querySelector('.vue-flow__transformationpane')

    if (!nodeEl || !handle.value || !viewportNode || !handleId.value) return

    const nodeBounds = nodeEl.value.getBoundingClientRect()

    const handleBounds = handle.value.getBoundingClientRect()

    const style = window.getComputedStyle(viewportNode)
    const { m22: zoom } = new window.DOMMatrixReadOnly(style.transform)

    const nextBounds = {
      id: handleId.value,
      position,
      x: (handleBounds.left - nodeBounds.left) / zoom,
      y: (handleBounds.top - nodeBounds.top) / zoom,
      ...getDimensions(handle.value),
    }

    node.handleBounds[type.value] = [...(node.handleBounds[type.value] ?? []), nextBounds]
  })
</script>

<script lang="ts">
export default {
  name: 'Handle',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <div
    ref="handle"
    :data-id="`${nodeId}-${handleId}-${type}`"
    :data-handleid="handleId"
    :data-nodeid="nodeId"
    :data-handlepos="position"
    class="vue-flow__handle"
    :class="[
      `vue-flow__handle-${position}`,
      `vue-flow__handle-${handleId}`,
      noDragClassName,
      type,
      {
        connectable: isConnectable,
        connecting:
          connectionStartHandle &&
          connectionStartHandle.nodeId === nodeId &&
          connectionStartHandle.handleId === handleId &&
          connectionStartHandle.type === type,
      },
    ]"
    @mousedown="handlePointerDown"
    @touchstart.passive="handlePointerDown"
    @click="handleClick"
  >
    <slot :id="id" />
  </div>
</template>
