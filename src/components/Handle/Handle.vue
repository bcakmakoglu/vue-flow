<script lang="ts" setup>
import { useHandle, useStore } from '../../composables'
import { Position, ValidConnectionFunc } from '../../types'
import { NodeId } from '../../context'

interface HandleProps {
  id?: string
  type?: string
  position?: Position
  isValidConnection?: ValidConnectionFunc
  connectable?: boolean
}

const store = useStore()
const props = withDefaults(defineProps<HandleProps>(), {
  id: '',
  type: 'source',
  position: Position.Top,
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
      `vue-flow__handle-${store.id}`,
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
