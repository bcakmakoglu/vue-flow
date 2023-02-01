<script lang="ts" setup>
// todo: add plugin to emit resize events via vue flow store; requires plugin API to be added to core
import ResizeControl from './ResizeControl.vue'
import type { ControlLinePosition, ControlPosition, NodeResizerProps, ResizeDragEvent, ResizeEventParams } from './types'
import { ResizeControlVariant } from './types'

const props = withDefaults(defineProps<NodeResizerProps>(), {
  isVisible: true,
})

const emits = defineEmits<{
  (event: 'resizeStart', data: { event: ResizeDragEvent; params: ResizeEventParams }): void
  (event: 'resize', data: { event: ResizeDragEvent; params: ResizeEventParams }): void
  (event: 'resizeEnd', data: { event: ResizeDragEvent; params: ResizeEventParams }): void
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
    :aspect-ratio="aspectRatio"
    :color="color"
    :min-width="minWidth"
    :min-height="minHeight"
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
    :aspect-ratio="aspectRatio"
    @resize-start="emits('resizeStart', $event)"
    @resize="emits('resize', $event)"
    @resize-end="emits('resizeEnd', $event)"
  />
</template>
