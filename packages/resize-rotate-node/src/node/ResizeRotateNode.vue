<script lang="ts" setup>
import Moveable from 'vue3-moveable'
import type { Dimensions } from '@vue-flow/core'
import { Handle, useVueFlow } from '@vue-flow/core'
import { useMoveable } from './utils'
import type { ResizeRotateNodeProps } from './types'

interface Emits {
  (event: 'updateNodeInternals'): void
  (event: 'resize', dimensions: Dimensions): void
  (event: 'rotate', rotation: number): void
}

const props = withDefaults(defineProps<ResizeRotateNodeProps>(), {
  resizable: true,
  rotatable: true,
  moveableProps: () => ({}),
})

const emits = defineEmits<Emits>()

const { findNode, onPaneClick, onNodeClick, onNodeDragStart, snapGrid, snapToGrid } = useVueFlow()

const el = ref()

const visible = ref(false)

const { onRotateStart, onRotate, onResizeStart, onResize } = useMoveable(props.id, emits)

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

onBeforeMount(() => {
  const node = findNode(props.id)!

  node.dragHandle = `[data-moveable-id='${props.id}']`

  const previousStyle = node.style
  node.style = () => {
    return {
      ...previousStyle,
      pointerEvents: 'none',
      cursor: 'default',
    }
  }
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div
    ref="el"
    style="cursor: grab; pointer-events: all"
    :data-moveable-id="props.id"
    :style="{
      ...data.style,
      cursor: visible ? 'grab' : 'auto',
      zIndex: visible ? 1000 : 0,
      width: data.dimensions?.width ? `${data.dimensions.width}px` : undefined,
      height: data.dimensions?.height ? `${data.dimensions.height}px` : undefined,
      transform: `translate(${data.translate[0]}px, ${data.translate[1]}px)` + ` rotate(${data.rotate}deg)`,
    }"
  >
    <Handle type="target" :position="props.targetPosition" />

    <slot>
      {{ props.label }}
    </slot>

    <Handle type="source" :position="props.sourcePosition" />
  </div>

  <Moveable
    v-bind="props.moveableProps"
    class-name="nodrag"
    style="pointer-events: all"
    :target="visible ? el : undefined"
    :resizable="resizable"
    :rotatable="rotatable"
    :snappable="snapToGrid"
    :snap-element="snapToGrid"
    :snap-gap="snapToGrid"
    :snap-directions="snapToGrid"
    :snap-digit="snapGrid[0]"
    :snap-treshold="snapGrid[0]"
    :snap-grid-width="snapGrid[0]"
    :snap-grid-height="snapGrid[1]"
    :padding="{ left: 0, top: 0, right: 0, bottom: 0 }"
    :origin="false"
    :start-drag-rotate="0"
    :throttle-drag-rotate="0"
    :throttle-resize="1"
    :render-directions="['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']"
    :zoom="1"
    @resize-start="onResizeStart"
    @resize="onResize"
    @rotate-start="onRotateStart"
    @rotate="onRotate"
  />
</template>
