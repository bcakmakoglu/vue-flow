<script lang="ts" setup>
import { useHandle, useVueFlow } from '../../composables'
import { Position } from '../../types'
import { NodeId } from '../../context'
import type { HandleProps } from '../../types/components'

const { id } = useVueFlow()
const props = withDefaults(defineProps<HandleProps>(), {
  id: '',
  type: 'source',
  position: 'top' as Position,
  connectable: true,
})

const nodeId = inject(NodeId, '')

const handler = useHandle()
const onMouseDownHandler = (event: MouseEvent) =>
  handler(event, props.id, nodeId, props.type === 'target', props.isValidConnection)
</script>
<script lang="ts">
export default {
  name: 'Handle',
}
</script>
<template>
  <div
    :data-handleid="props.id"
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
      },
    ]"
    @mousedown="onMouseDownHandler"
  >
    <slot :node-id="nodeId" v-bind="props"></slot>
  </div>
</template>
