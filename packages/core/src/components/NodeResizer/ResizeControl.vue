<script lang="ts" setup>
import { XYResizer, evaluateAbsolutePosition, handleExpandParent } from '@xyflow/system'
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

const { emits: triggerEmits, viewport, nodeLookup, parentLookup, snapGrid, snapToGrid, vueFlowRef, noDragClassName } =
  useVueFlow()

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
      nodeLookup,
      transform: [viewport.value.x, viewport.value.y, viewport.value.zoom] as [number, number, number],
      snapGrid: snapGrid.value,
      snapToGrid: snapToGrid.value,
      nodeOrigin: [0, 0],
      paneDomNode: vueFlowRef.value,
    }),
    onChange: (changes: XYResizerChange, childChanges: XYResizerChildChange[]) => {
      const nodeChanges: NodeChange[] = []
      const node = nodeLookup.get(props.nodeId!)

      // resolved x/y for the resized node; clamped below when the node expands its parent
      let nextX = changes.x
      let nextY = changes.y

      if (node?.expandParent && node.parentId) {
        const origin = node.origin ?? [0, 0]
        const width = changes.width ?? node.measured.width ?? 0
        const height = changes.height ?? node.measured.height ?? 0

        // grow the parent to fit the resized child (mirrors xyflow/react's NodeResizeControl)
        const child = {
          id: node.id,
          parentId: node.parentId,
          rect: {
            width,
            height,
            ...evaluateAbsolutePosition(
              { x: changes.x ?? node.position.x, y: changes.y ?? node.position.y },
              { width, height },
              node.parentId,
              nodeLookup,
              origin,
            ),
          },
        }

        nodeChanges.push(...(handleExpandParent([child], nodeLookup, parentLookup, [0, 0]) as NodeChange[]))

        // once the parent was expanded, the child clamps to the parent's edge (0,0 for origin [0,0],
        // width/height for [1,1]).
        nextX = typeof changes.x !== 'undefined' ? Math.max(origin[0] * width, changes.x) : undefined
        nextY = typeof changes.y !== 'undefined' ? Math.max(origin[1] * height, changes.y) : undefined
      }

      if (typeof nextX !== 'undefined' || typeof nextY !== 'undefined') {
        const position = {
          x: nextX ?? node?.position.x ?? 0,
          y: nextY ?? node?.position.y ?? 0,
        }
        nodeChanges.push({
          id: props.nodeId!,
          type: 'position',
          position,
          positionAbsolute: position,
        } as NodePositionChange)
      }

      if (typeof changes.width !== 'undefined' || typeof changes.height !== 'undefined') {
        nodeChanges.push({
          id: props.nodeId!,
          type: 'dimensions',
          setAttributes: true,
          resizing: true,
          dimensions: {
            width: changes.width ?? 0,
            height: changes.height ?? 0,
          },
        } as NodeDimensionChange)
      }

      for (const child of childChanges) {
        nodeChanges.push({
          id: child.id,
          type: 'position',
          position: child.position,
          positionAbsolute: child.position,
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
