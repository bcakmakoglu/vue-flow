<script lang="ts" setup>
import { isFunction, isString } from '@vueuse/core'
import type { Position } from '../../types'
import type { HandleProps } from '../../types/handle'

const {
  position = 'top' as Position,
  connectable = true,
  connectableStart = true,
  connectableEnd = true,
  id,
  isValidConnection,
  ...props
} = defineProps<HandleProps>()

const emits = defineEmits<{
  (event: 'mousedown', e: MouseEvent): void
  (event: 'touchstart', e: TouchEvent): void
  (event: 'click', e: MouseEvent): void
}>()

const type = toRef(props, 'type', 'source')

const { connectionStartHandle, vueFlowRef, nodesConnectable } = useVueFlow()

const { id: nodeId, node, nodeEl, connectedEdges } = useNode()

const handle = ref<HTMLDivElement>()

const handleId = computed(() => id ?? `${nodeId}__handle-${position}`)

const { handlePointerDown, handleClick } = useHandle({
  nodeId,
  handleId: handleId.value,
  isValidConnection,
  type,
})

const isConnectable = computed(() => {
  if (isString(connectable) && connectable === 'single') {
    return !connectedEdges.value.some((edge) => {
      const handle = edge[`${type.value}Handle`]

      if (edge[type.value] !== nodeId) return false

      return handle ? handle === handleId.value : true
    })
  } else if (isFunction(connectable)) {
    return connectable(node, connectedEdges.value)
  }

  return isDef(connectable) ? connectable : nodesConnectable.value
})

const isConnecting = computed(
  () =>
    connectionStartHandle.value &&
    connectionStartHandle.value.nodeId === nodeId &&
    connectionStartHandle.value.handleId === handleId.value &&
    connectionStartHandle.value.type === type.value,
)

onMounted(() => {
  // set up handle bounds if they don't exist yet and the node has been initialized (i.e. the handle was added after the node has already been mounted)
  until(() => node.initialized)
    .toBe(true)
    .then(() => {
      const existingBounds = node.handleBounds[type.value]?.find((b) => b.id === handleId)

      if (!vueFlowRef.value || existingBounds) return

      const viewportNode = vueFlowRef.value.querySelector('.vue-flow__transformationpane')

      if (!nodeEl || !handle.value || !viewportNode || !handleId) return

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
})

function onPointerDown(event: MouseEvent | TouchEvent) {
  const isMouseTriggered = isMouseEvent(event)

  if (isConnectable.value && connectableStart && ((isMouseTriggered && event.button === 0) || !isMouseTriggered)) {
    handlePointerDown(event)
  }

  if (isMouseTriggered) {
    emits('mousedown', event)
  } else {
    emits('touchstart', event)
  }
}

function onClick(event: MouseEvent) {
  if (!connectionStartHandle && !connectableStart) {
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
    class="vue-flow__handle nodrag"
    :class="[
      `vue-flow__handle-${position}`,
      `vue-flow__handle-${handleId}`,
      {
        source: type !== 'target',
        target: type === 'target',
        connectable: isConnectable,
        connecting: isConnecting,
        connectablestart: connectableStart,
        connectableend: connectableEnd,
        connectionindicator: (isConnectable && connectableStart && !isConnecting) || (connectableEnd && isConnecting),
      },
    ]"
    @mousedown="onPointerDown"
    @touchstart.passive="onPointerDown"
    @click="onClick"
  >
    <slot :id="id" />
  </div>
</template>
