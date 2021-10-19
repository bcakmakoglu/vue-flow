<script lang="ts" setup>
import { ElementId, Position, RevueFlowStore } from '~/types'
import { onMouseDown, ValidConnectionFunc } from '~/components/Handle/utils'
import { RevueFlowHooks } from '~/hooks/RevueFlowHooks'

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

const store = inject<RevueFlowStore>('store')!
const hooks = inject<RevueFlowHooks>('hooks')!
const nodeId = inject<ElementId>('NodeIdContext')!

const onMouseDownHandler = (event: MouseEvent) =>
  onMouseDown(
    event,
    store,
    hooks,
    props.id,
    nodeId,
    props.type === 'target',
    props.isValidConnection ??
      function () {
        return true
      },
  )
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
