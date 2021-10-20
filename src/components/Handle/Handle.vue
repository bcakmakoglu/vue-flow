<script lang="ts" setup>
import { Position, ValidConnectionFunc } from '~/types'
import { NodeIdContextKey } from '~/context'
import { useHandle, useHooks, useStore } from '~/composables'

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
const nodeId = inject(NodeIdContextKey)!

const handler = useHandle()
const onMouseDownHandler = (event: MouseEvent) =>
  handler(event, props.id, nodeId, props.type === 'target', props.isValidConnection)
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
    <slot></slot>
  </div>
</template>
