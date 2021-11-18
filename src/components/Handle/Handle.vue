<script lang="ts" setup>
import { useHandle, useHooks, useStore } from '../../composables'
import { Position, ValidConnectionFunc } from '../../types'
import { NodeId } from '~/context'

interface HandleProps {
  id?: string
  type?: string
  position?: Position
  isValidConnection?: ValidConnectionFunc
  connectable?: boolean
}

const props = withDefaults(defineProps<HandleProps>(), {
  id: '',
  type: 'source',
  position: Position.Top,
  connectable: true,
})

const store = useStore()
const hooks = useHooks()
const nodeId = inject(NodeId)!

const handler = useHandle()
const onMouseDownHandler = (event: MouseEvent) =>
  handler(event, props.id, nodeId, props.type === 'target', props.isValidConnection ?? (() => true))
</script>
<template>
  <div
    :data-handleid="props.id"
    :data-nodeid="nodeId"
    :data-handlepos="props.position"
    :class="[
      'vue-flow__handle',
      `vue-flow__handle-${props.position}`,
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
