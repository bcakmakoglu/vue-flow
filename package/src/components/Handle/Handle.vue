<script lang="ts" setup>
import { useHandle, useVueFlow } from '../../composables'
import { Position } from '../../types'
import { NodeId } from '../../context'
import type { HandleProps } from '../../types/handle'

const { id, hooks, connectionStartHandle } = useVueFlow()
const props = withDefaults(defineProps<HandleProps>(), {
  type: 'source',
  position: 'top' as Position,
  connectable: true,
})

const nodeId = inject(NodeId, '')

const handleId = props.id ?? `${nodeId}__handle-${props.position}`

const { onMouseDown, onClick } = useHandle()
const onMouseDownHandler = (event: MouseEvent) =>
  onMouseDown(event, handleId, nodeId, props.type === 'target', props.isValidConnection, undefined)
const onClickHandler = (event: MouseEvent) => onClick(event, props.id ?? null, nodeId, props.type, props.isValidConnection)
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
    :class="[
      'vue-flow__handle',
      `vue-flow__handle-${props.position}`,
      `vue-flow__handle-${id}`,
      'nodrag',
      {
        source: props.type !== 'target',
        target: props.type === 'target',
        connectable: props.connectable,
        connecting:
          connectionStartHandle?.nodeId === nodeId &&
          connectionStartHandle?.handleId === props.id &&
          connectionStartHandle?.type === props.type,
      },
    ]"
    @mousedown="onMouseDownHandler"
    @click="onClickHandler"
  >
    <slot :node-id="nodeId" v-bind="props"></slot>
  </div>
</template>
