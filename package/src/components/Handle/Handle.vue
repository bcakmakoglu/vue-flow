<script lang="ts" setup>
import { useHandle, useVueFlow } from '../../composables'
import { ConnectionMode, Position } from '../../types'
import { NodeId } from '../../context'
import type { HandleProps } from '../../types/handle'

const props = withDefaults(defineProps<HandleProps>(), {
  type: 'source',
  position: 'top' as Position,
  connectable: true,
})

const { id, hooks, connectionStartHandle, connectionMode } = $(useVueFlow())

const nodeId = inject(NodeId, '')

const handleId = $computed(
  () => props.id ?? (connectionMode === ConnectionMode.Strict ? null : `${nodeId}__handle-${props.position}`),
)

const { onMouseDown, onClick } = useHandle()

const onMouseDownHandler = (event: MouseEvent) => {
  onMouseDown(event, handleId, nodeId, props.type === 'target', props.isValidConnection, undefined)
}

const onClickHandler = (event: MouseEvent) => {
  onClick(event, handleId ?? null, nodeId, props.type, props.isValidConnection)
}

const getClasses = computed(() => {
  return [
    'vue-flow__handle',
    `vue-flow__handle-${props.position}`,
    `vue-flow__handle-${handleId}`,
    'nodrag',
    {
      source: props.type !== 'target',
      target: props.type === 'target',
      connectable: props.connectable,
      connecting:
        connectionStartHandle &&
        connectionStartHandle.nodeId === nodeId &&
        connectionStartHandle.handleId === handleId &&
        connectionStartHandle.type === props.type,
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
    :data-handlepos="props.position"
    :class="getClasses"
    @mousedown="onMouseDownHandler"
    @click="onClickHandler"
  >
    <slot :node-id="nodeId" v-bind="props"></slot>
  </div>
</template>
