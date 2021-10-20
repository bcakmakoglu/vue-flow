<script lang="ts" setup>
import { ElementId, Position, ValidConnectionFunc } from '~/types'
import { Hooks, Store } from '~/context'
import { useHandle } from '~/composables'

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

const store = inject(Store)!
const hooks = inject(Hooks)!
const nodeId = inject<ElementId>('NodeIdContext')!

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
      'revue-flow__handle',
      `revue-flow__handle-${props.position}`,
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
