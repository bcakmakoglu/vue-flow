<script lang="ts" setup>
import { useHandle, useVueFlow } from '../../composables'
import { ConnectionMode, Position } from '../../types'
import { NodeId } from '../../context'
import type { HandleProps } from '../../types/handle'

const {
  type = 'source',
  position = 'top' as Position,
  connectable = true,
  id,
  isValidConnection = function () {
    return true
  },
} = defineProps<HandleProps>()

const { hooks, connectionStartHandle, connectionMode } = $(useVueFlow())

const nodeId = inject(NodeId, '')

const handleId = $computed(() => id ?? (connectionMode === ConnectionMode.Strict ? null : `${nodeId}__handle-${position}`))

const { onMouseDown, onClick } = useHandle()

const onMouseDownHandler = (event: MouseEvent) => {
  onMouseDown(event, handleId, nodeId, type === 'target', isValidConnection, undefined)
}

const onClickHandler = (event: MouseEvent) => {
  onClick(event, handleId ?? null, nodeId, type, isValidConnection)
}

const getClasses = computed(() => {
  return [
    'vue-flow__handle',
    `vue-flow__handle-${position}`,
    `vue-flow__handle-${handleId}`,
    'nodrag',
    {
      source: type !== 'target',
      target: type === 'target',
      connectable,
      connecting:
        connectionStartHandle &&
        connectionStartHandle.nodeId === nodeId &&
        connectionStartHandle.handleId === handleId &&
        connectionStartHandle.type === type,
    },
  ]
})
</script>
<script lang="ts">
export default {
  name: 'Handle',
}
</script>
<template>
  <div
    :data-handleid="handleId"
    :data-nodeid="nodeId"
    :data-handlepos="position"
    :class="getClasses"
    @mousedown="onMouseDownHandler"
    @click="onClickHandler"
  >
    <slot
      :id="id"
      :node-id="nodeId"
      :type="type"
      :position="position"
      :connectable="connectable"
      :is-valid-connection="isValidConnection"
    />
  </div>
</template>
