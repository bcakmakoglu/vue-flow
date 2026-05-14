<script lang="ts" setup>
import { XYResizer } from '@xyflow/system'
import type { XYResizerChange, XYResizerChildChange } from '@xyflow/system'
import { computed, ref, toRef, watchEffect } from 'vue'
import { useVueFlow } from '../../composables'
import type { NodeChange, NodeDimensionChange, NodePositionChange } from '../../types'
import type { NodeResizerEmits, ResizeControlProps } from './types'
import { ResizeControlVariant } from './types'
import { DefaultPositions, StylingProperty } from './utils'

const props = withDefaults(defineProps<ResizeControlProps>(), {
  variant: 'handle' as ResizeControlVariant,
  minWidth: 10,
  minHeight: 10,
  maxWidth: Number.MAX_VALUE,
  maxHeight: Number.MAX_VALUE,
  keepAspectRatio: false,
  autoScale: true,
})

const emits = defineEmits<NodeResizerEmits>()

const { emits: triggerEmits, viewport, nodeLookup, snapGrid, snapToGrid, vueFlowRef, noDragClassName } = useVueFlow()

const resizeControlRef = ref<HTMLDivElement>()

const controlPosition = toRef(() => props.position ?? DefaultPositions[props.variant])

const positionClassNames = computed(() => controlPosition.value.split('-'))

const controlStyle = toRef(() => (props.color ? { [StylingProperty[props.variant]]: props.color } : {}))

watchEffect((onCleanup) => {
  if (!resizeControlRef.value || !props.nodeId) {
    return
  }

  const resizerInstance = XYResizer({
    domNode: resizeControlRef.value,
    nodeId: props.nodeId,
    getStoreItems: () => ({
      nodeLookup: nodeLookup.value,
      transform: [viewport.value.x, viewport.value.y, viewport.value.zoom] as [number, number, number],
      snapGrid: snapGrid.value,
      snapToGrid: snapToGrid.value,
      nodeOrigin: [0, 0],
      paneDomNode: vueFlowRef.value,
    }),
    onChange: (changes: XYResizerChange, childChanges: XYResizerChildChange[]) => {
      const nodeChanges: NodeChange[] = []

      if (typeof changes.x !== 'undefined' || typeof changes.y !== 'undefined') {
        const node = nodeLookup.value.get(props.nodeId!)
        nodeChanges.push({
          id: props.nodeId!,
          type: 'position',
          from: node?.position ?? { x: 0, y: 0 },
          position: {
            x: changes.x ?? node?.position.x ?? 0,
            y: changes.y ?? node?.position.y ?? 0,
          },
        } as NodePositionChange)
      }

      if (typeof changes.width !== 'undefined' || typeof changes.height !== 'undefined') {
        nodeChanges.push({
          id: props.nodeId!,
          type: 'dimensions',
          updateStyle: true,
          resizing: true,
          dimensions: {
            width: changes.width ?? 0,
            height: changes.height ?? 0,
          },
        } as NodeDimensionChange)
      }

      for (const child of childChanges) {
        const childNode = nodeLookup.value.get(child.id)
        nodeChanges.push({
          id: child.id,
          type: 'position',
          from: childNode?.position ?? { x: 0, y: 0 },
          position: child.position,
        } as NodePositionChange)
      }

      if (nodeChanges.length) {
        triggerEmits.nodesChange(nodeChanges)
      }
    },
    onEnd: () => {
      triggerEmits.nodesChange([
        {
          id: props.nodeId!,
          type: 'dimensions',
          resizing: false,
        } as NodeDimensionChange,
      ])
    },
  })

  resizerInstance.update({
    controlPosition: controlPosition.value,
    boundaries: {
      minWidth: props.minWidth,
      minHeight: props.minHeight,
      maxWidth: props.maxWidth,
      maxHeight: props.maxHeight,
    },
    keepAspectRatio: Boolean(props.keepAspectRatio ?? false),
    onResizeStart: (event, params) => emits('resizeStart', { event, params }),
    onResize: (event, params) => emits('resize', { event, params }),
    onResizeEnd: (event, params) => emits('resizeEnd', { event, params }),
    shouldResize: props.shouldResize,
  })

  onCleanup(() => {
    resizerInstance.destroy()
  })
})
</script>

<script lang="ts">
export default {
  name: 'ResizeControl',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <div
    ref="resizeControlRef"
    class="vue-flow__resize-control"
    :class="[...positionClassNames, variant, noDragClassName]"
    :style="{
      ...controlStyle,
      scale: variant === ResizeControlVariant.Handle ? `${Math.max(1 / viewport.zoom, 1)}` : undefined,
    }"
  >
    <slot />
  </div>
</template>
