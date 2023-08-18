<script lang="ts" setup>
// todo: add plugin to emit resize events via vue flow store; requires plugin API to be added to core
import { computed, inject, watch } from 'vue'
import type { NodeDimensionChange } from '@vue-flow/core'
import { NodeIdInjection, useVueFlow } from '@vue-flow/core'
import ResizeControl from './ResizeControl.vue'
import type { ControlLinePosition, ControlPosition, NodeResizerProps, OnResize, OnResizeStart } from './types'
import { ResizeControlVariant } from './types'

const props = withDefaults(defineProps<NodeResizerProps>(), {
  isVisible: true,
})

const emits = defineEmits<{
  (event: 'resizeStart', resizeEvent: OnResizeStart): void
  (event: 'resize', resizeEvent: OnResize): void
  (event: 'resizeEnd', resizeEvent: OnResizeStart): void
}>()

const { findNode, emits: triggerEmits } = useVueFlow()

const handleControls: ControlPosition[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right']

const lineControls: ControlLinePosition[] = ['top', 'right', 'bottom', 'left']

const contextNodeId = inject(NodeIdInjection, null)

const id = computed(() => (typeof props.nodeId === 'string' ? props.nodeId : contextNodeId))

watch(
  [() => props.minWidth, () => props.minHeight, () => props.maxWidth, () => props.maxHeight],
  ([minWidth, minHeight, maxWidth, maxHeight]) => {
    const node = findNode(id.value)

    if (node) {
      const dimensionChange: NodeDimensionChange = {
        id: node.id,
        type: 'dimensions',
        updateStyle: true,
        dimensions: {
          width: node.dimensions.width,
          height: node.dimensions.height,
        },
      }

      if (minWidth && node.dimensions.width < minWidth) {
        dimensionChange.dimensions!.width = minWidth
      }

      if (minHeight && node.dimensions.height < minHeight) {
        dimensionChange.dimensions!.height = minHeight
      }

      if (maxWidth && node.dimensions.width > maxWidth) {
        dimensionChange.dimensions!.width = maxWidth
      }

      if (maxHeight && node.dimensions.height > maxHeight) {
        dimensionChange.dimensions!.height = maxHeight
      }

      if (
        dimensionChange.dimensions!.width !== node.dimensions.width ||
        dimensionChange.dimensions!.height !== node.dimensions.height
      ) {
        triggerEmits.nodesChange([dimensionChange])
      }
    }
  },
  { flush: 'post', immediate: true },
)
</script>

<script lang="ts">
export default {
  name: 'NodeResizer',
  compatConfig: { MODE: 3 },
  inheritAttrs: false,
}
</script>

<template>
  <template v-if="isVisible">
    <ResizeControl
      v-for="c of lineControls"
      :key="c"
      :class="lineClassName"
      :style="lineStyle"
      :node-id="nodeId"
      :position="c"
      :variant="ResizeControlVariant.Line"
      :keep-aspect-ratio="keepAspectRatio"
      :color="color"
      :min-width="minWidth"
      :min-height="minHeight"
      :max-width="maxWidth"
      :max-height="maxHeight"
      :should-resize="shouldResize"
      @resize-start="emits('resizeStart', $event)"
      @resize="emits('resize', $event)"
      @resize-end="emits('resizeEnd', $event)"
    />

    <ResizeControl
      v-for="c of handleControls"
      :key="c"
      :class="handleClassName"
      :style="handleStyle"
      :node-id="id"
      :position="c"
      :color="color"
      :min-width="minWidth"
      :min-height="minHeight"
      :max-width="maxWidth"
      :max-height="maxHeight"
      :should-resize="shouldResize"
      :keep-aspect-ratio="keepAspectRatio"
      @resize-start="emits('resizeStart', $event)"
      @resize="emits('resize', $event)"
      @resize-end="emits('resizeEnd', $event)"
    />
  </template>
</template>
