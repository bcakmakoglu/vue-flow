<script lang="ts" setup>
// todo: add plugin to emit resize events via vue flow store; requires plugin API to be added to core
import ResizeControl from './ResizeControl.vue'
import type { ControlLinePosition, ControlPosition, NodeResizerProps, OnResize, OnResizeStart } from './types'
import { ResizeControlVariant } from './types'

withDefaults(defineProps<NodeResizerProps>(), {
  isVisible: true,
})

const emits = defineEmits<{
  (event: 'resizeStart', resizeEvent: OnResizeStart): void
  (event: 'resize', resizeEvent: OnResize): void
  (event: 'resizeEnd', resizeEvent: OnResizeStart): void
}>()

const handleControls: ControlPosition[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right']

const lineControls: ControlLinePosition[] = ['top', 'right', 'bottom', 'left']
</script>

<script lang="ts">
export default {
  name: 'NodeResizer',
  inheritAttrs: false,
}
</script>

<template>
  <ResizeControl
    v-for="c of lineControls"
    :key="c"
    :class="lineClassName"
    :style="lineStyle"
    :node-id="nodeId"
    :position="c"
    :variant="ResizeControlVariant.Line"
    :color="color"
    :min-width="minWidth"
    :min-height="minHeight"
    :should-resize="shouldResize"
    @resize-start="emits('resizeStart', $event)"
    @resize="emits('resize', $event)"
    @resize-end="emits('resizeEnd', $event)"
  />

  <ResizeControl
    v-for="c of handleControls"
    :key="c"
    :class="lineClassName"
    :style="lineStyle"
    :node-id="nodeId"
    :position="c"
    :color="color"
    :min-width="minWidth"
    :min-height="minHeight"
    :should-resize="shouldResize"
    @resize-start="emits('resizeStart', $event)"
    @resize="emits('resize', $event)"
    @resize-end="emits('resizeEnd', $event)"
  />
</template>
