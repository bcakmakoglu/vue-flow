<script lang="ts" setup>
import { computed, inject, toRef, watch } from 'vue'
import type { NodeDimensionChange } from '@vue-flow/core'
import { NodeIdInjection, useVueFlow } from '@vue-flow/core'
import ResizeControl from './ResizeControl.vue'
import type { ControlLinePosition, ControlPosition, NodeResizerEmits, NodeResizerProps } from './types'
import { ResizeControlVariant } from './types'

const props = withDefaults(defineProps<NodeResizerProps>(), {
  isVisible: true,
})

const emits = defineEmits<NodeResizerEmits>()

const { findNode, emits: triggerEmits } = useVueFlow()

const handleControls: ControlPosition[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right']

const lineControls: ControlLinePosition[] = ['top', 'right', 'bottom', 'left']

const contextNodeId = inject(NodeIdInjection, null)

const nodeId = toRef(() => (typeof props.nodeId === 'string' ? props.nodeId : contextNodeId))

const node = computed(() => findNode(nodeId.value))

watch(
  [
    () => props.minWidth,
    () => props.minHeight,
    () => props.maxWidth,
    () => props.maxHeight,
    () => !!node.value?.dimensions.width && !!node.value.dimensions.height,
  ],
  ([minWidth, minHeight, maxWidth, maxHeight, isInitialized]) => {
    const n = node.value

    if (n && isInitialized) {
      const dimensionChange: NodeDimensionChange = {
        id: n.id,
        type: 'dimensions',
        updateStyle: true,
        dimensions: {
          width: n.dimensions.width,
          height: n.dimensions.height,
        },
      }

      if (minWidth && n.dimensions.width < minWidth) {
        dimensionChange.dimensions!.width = minWidth
      }

      if (minHeight && n.dimensions.height < minHeight) {
        dimensionChange.dimensions!.height = minHeight
      }

      if (maxWidth && n.dimensions.width > maxWidth) {
        dimensionChange.dimensions!.width = maxWidth
      }

      if (maxHeight && n.dimensions.height > maxHeight) {
        dimensionChange.dimensions!.height = maxHeight
      }

      if (
        dimensionChange.dimensions!.width !== n.dimensions.width ||
        dimensionChange.dimensions!.height !== n.dimensions.height
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
      :node-id="nodeId"
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
