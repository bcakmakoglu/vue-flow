<script lang="ts" setup>
import type { MoveableEvents, MoveableProps } from 'vue3-moveable'
import Moveable from 'vue3-moveable'
import type { Position } from '@braks/vue-flow'
import { Handle, useVueFlow } from '@braks/vue-flow'

const props = defineProps<{
  id: string
  label: string
  targetPosition: Position
  sourcePosition: Position
  data: any
  moveableProps?: MoveableProps
}>()

const emits = defineEmits(['updateNodeInternals'])

const {
  viewport,
  updateNodeDimensions,
  onPaneClick,
  onPaneScroll,
  onPaneContextMenu,
  getNode,
  onNodeClick,
  onNodeDragStart,
  snapGrid,
  snapToGrid,
} = useVueFlow()

const el = ref()

const visible = ref(false)

const frame = {
  rotate: 0,
}

const onResize = (e: MoveableEvents['resize']) => {
  e.target.style.width = `${e.width}px`
  e.target.style.height = `${e.height}px`
  e.target.style.left = `${e.drag.left}px`
  e.target.style.top = `${e.drag.top}px`
}

const onRotateStart = (e: MoveableEvents['rotateStart']) => {
  e.set(frame.rotate)
}

const onRotate = (e: MoveableEvents['rotate']) => {
  frame.rotate = e.beforeRotate
  e.target.style.transform = `rotate(${e.beforeRotate}deg)`
  emits('updateNodeInternals')
}

const toggleVisibility = (val?: boolean) => {
  visible.value = val ?? !visible.value
}

onNodeClick(({ node }) => {
  toggleVisibility(node.id === props.id)
})

onNodeDragStart(({ node }) => {
  toggleVisibility(node.id === props.id)
})

onPaneClick(() => toggleVisibility(false))
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div
    ref="el"
    :data-moveable-id="props.id"
    :style="{
      cursor: 'grab',
      ...data.style,
    }"
    style="position: relative"
  >
    <Handle type="target" :position="props.targetPosition" />

    <slot>
      {{ props.label }}
    </slot>

    <Handle type="source" :position="props.sourcePosition" />
  </div>

  <Moveable
    v-if="visible"
    v-bind="props.moveableProps"
    class-name="nodrag"
    :target="[`[data-moveable-id='${props.id}']`]"
    :resizable="true"
    :rotatable="true"
    :draggable="true"
    :snappable="snapToGrid"
    :snap-element="snapToGrid"
    :snap-gap="snapToGrid"
    :snap-directions="snapToGrid"
    :snap-digit="snapGrid[0]"
    :snap-treshold="snapGrid[0]"
    :snap-grid-width="snapGrid[0]"
    :snap-grid-height="snapGrid[0]"
    rotation-position="top"
    :padding="{ left: 0, top: 0, right: 0, bottom: 0 }"
    :origin="false"
    :edge="true"
    :start-drag-rotate="0"
    :throttle-drag-rotate="0"
    :throttle-resize="1"
    :render-directions="['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']"
    :zoom="1"
    @resize="onResize"
    @rotate="onRotate"
  />
</template>
