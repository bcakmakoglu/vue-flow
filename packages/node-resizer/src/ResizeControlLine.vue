<script lang="ts" setup>
import ResizeControl from './ResizeControl.vue'
import type { OnResize, OnResizeStart, ResizeControlLineProps } from './types'
import { ResizeControlVariant } from './types'

const props = defineProps<ResizeControlLineProps>()

const emits = defineEmits<{
  (event: 'resizeStart', resizeEvent: OnResizeStart): void
  (event: 'resize', resizeEvent: OnResize): void
  (event: 'resizeEnd', resizeEvent: OnResizeStart): void
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
