<script lang="ts" setup>
import { toRef, until } from '@vueuse/core'
import { computed, onUnmounted, ref } from 'vue'
import { getDimensions, isMouseEvent } from '@xyflow/system'
import type { HandleProps } from '../../types/handle'
import { Position } from '../../types'
import { useHandle, useNode, useVueFlow } from '../../composables'
import { isDef, isFunction, isNumber, isString } from '../../utils'

const {
  position = Position.Top,
  connectable = undefined,
  connectableStart = true,
  connectableEnd = true,
  id,
  ...props
} = defineProps<HandleProps>()

const type = toRef(() => props.type ?? 'source')

const isValidConnection = toRef(() => props.isValidConnection ?? null)

const {
  connectionStartHandle,
  connectionClickStartHandle,
  connectionEndHandle,
  vueFlowRef,
  nodesConnectable,
  noDragClassName,
  noPanClassName,
} = useVueFlow()

const { id: nodeId, node, nodeEl, connectedEdges } = useNode()

const handle = ref<HTMLDivElement>()

const handleId = toRef(() => id ?? `${nodeId}__handle-${position}`)

const isConnectableStart = toRef(() => (typeof connectableStart !== 'undefined' ? connectableStart : true))

const isConnectableEnd = toRef(() => (typeof connectableEnd !== 'undefined' ? connectableEnd : true))

const isConnecting = toRef(
  () =>
    (connectionStartHandle.value?.nodeId === nodeId &&
      connectionStartHandle.value?.handleId === handleId.value &&
      connectionStartHandle.value?.type === type.value) ||
    (connectionEndHandle.value?.nodeId === nodeId &&
      connectionEndHandle.value?.handleId === handleId.value &&
      connectionEndHandle.value?.type === type.value),
)

const isClickConnecting = toRef(
  () =>
    connectionClickStartHandle.value?.nodeId === nodeId &&
    connectionClickStartHandle.value?.handleId === handleId.value &&
    connectionClickStartHandle.value?.type === type.value,
)

const { handlePointerDown, handleClick } = useHandle({
  nodeId,
  handleId,
  isValidConnection,
  type,
})

const isConnectable = computed(() => {
  if (typeof connectable === 'string' && connectable === 'single') {
    return !connectedEdges.value.some((edge) => {
      const id = edge[`${type.value}Handle`]

      if (edge[type.value] !== nodeId) {
        return false
      }

      return id ? id === handleId.value : true
    })
  }

  if (typeof connectable === 'number') {
    return (
      connectedEdges.value.filter((edge) => {
        const id = edge[`${type.value}Handle`]

        if (edge[type.value] !== nodeId) {
          return false
        }

        return id ? id === handleId.value : true
      }).length < connectable
    )
  }

  if (typeof connectable === 'function') {
    return connectable(node, connectedEdges.value)
  }

  return isDef(connectable) ? connectable : nodesConnectable.value
})

// set up handle bounds if they don't exist yet and the node has been initialized (i.e. the handle was added after the node has already been mounted)
until(() => node.initialized)
  .toBe(true, { flush: 'post' })
  .then(() => {
    const existingBounds = node.handleBounds[type.value]?.find((b) => b.id === handleId.value)

    if (!vueFlowRef.value || existingBounds) {
      return
    }

    const viewportNode = vueFlowRef.value.querySelector('.vue-flow__transformationpane')

    if (!nodeEl.value || !handle.value || !viewportNode || !handleId.value) {
      return
    }

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

onUnmounted(() => {
  // clean up node internals
  const handleBounds = node.handleBounds[type.value]
  if (handleBounds) {
    node.handleBounds[type.value] = handleBounds.filter((b) => b.id !== handleId.value)
  }
})

function onPointerDown(event: MouseEvent | TouchEvent) {
  const isMouseTriggered = isMouseEvent(event)

  if (isConnectable.value && isConnectableStart.value && ((isMouseTriggered && event.button === 0) || !isMouseTriggered)) {
    handlePointerDown(event)
  }
}

function onClick(event: MouseEvent) {
  if (!nodeId || (!connectionClickStartHandle.value && !isConnectableStart.value)) {
    return
  }

  if (isConnectable.value) {
    handleClick(event)
  }
}
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
      noPanClassName,
      type,
      {
        connectable: isConnectable,
        connecting: isClickConnecting,
        connectablestart: isConnectableStart,
        connectableend: isConnectableEnd,
        connectionindicator: isConnectable && ((isConnectableStart && !isConnecting) || (isConnectableEnd && isConnecting)),
      },
    ]"
    @mousedown="onPointerDown"
    @touchstart.passive="onPointerDown"
    @click="onClick"
  >
    <slot :id="id" />
  </div>
</template>
