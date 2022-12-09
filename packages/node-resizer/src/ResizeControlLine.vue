<script lang="ts" setup>
import ResizeControl from './ResizeControl.vue'
import type { ResizeControlLineProps, ResizeDragEvent, ResizeEventParams } from './types'
import { ResizeControlVariant } from './types'

const props = defineProps<ResizeControlLineProps>()

const emits = defineEmits<{
  (event: 'resizeStart', data: { event: ResizeDragEvent; params: ResizeEventParams }): void
  (event: 'resize', data: { event: ResizeDragEvent; params: ResizeEventParams }): void
  (event: 'resizeEnd', data: { event: ResizeDragEvent; params: ResizeEventParams }): void
}>()
</script>

<template>
  <ResizeControl
    v-bind="props"
    :variant="ResizeControlVariant.Line"
    @resize-start="emits('resizeStart', $event)"
    @resize="emits('resize', $event)"
    @resize-end="emits('resizeEnd', $event)"
  />
</template>
