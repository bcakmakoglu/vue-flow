<script lang="ts" setup>
import type { NodeChange, NodeDimensionChange, NodePositionChange } from '@vue-flow/core'
import { clamp, useGetPointerPosition, useVueFlow } from '@vue-flow/core'
import { select } from 'd3-selection'
import { drag } from 'd3-drag'
import { computed, ref, watchEffect } from 'vue'
import type { OnResize, OnResizeStart, ResizeControlProps, ResizeDragEvent } from './types'
import { ResizeControlVariant } from './types'
import { getDirection } from './utils'

const props = withDefaults(defineProps<ResizeControlProps>(), {
  variant: 'handle' as ResizeControlVariant,
  minWidth: 10,
  minHeight: 10,
  maxWidth: Number.MAX_VALUE,
  maxHeight: Number.MAX_VALUE,
  keepAspectRatio: false,
})

const emits = defineEmits<{
  (event: 'resizeStart', resizeEvent: OnResizeStart): void
  (event: 'resize', resizeEvent: OnResize): void
  (event: 'resizeEnd', resizeEvent: OnResizeStart): void
}>()

const initPrevValues = { width: 0, height: 0, x: 0, y: 0 }

const initStartValues = {
  ...initPrevValues,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1,
}

const { findNode, emits: triggerEmits } = useVueFlow()

const getPointerPosition = useGetPointerPosition()

const resizeControlRef = ref<HTMLDivElement>()

let startValues: typeof initStartValues = initStartValues

let prevValues: typeof initPrevValues = initPrevValues

const defaultPosition = computed(() => (props.variant === ResizeControlVariant.Line ? 'right' : 'bottom-right'))

const controlPosition = computed(() => props.position ?? defaultPosition.value)

watchEffect((onCleanup) => {
  if (!resizeControlRef.value || !props.nodeId) {
    return
  }

  const selection = select(resizeControlRef.value)

  const enableX = controlPosition.value.includes('right') || controlPosition.value.includes('left')
  const enableY = controlPosition.value.includes('bottom') || controlPosition.value.includes('top')
  const invertX = controlPosition.value.includes('left')
  const invertY = controlPosition.value.includes('top')

  const dragHandler = drag<HTMLDivElement, unknown>()
    .on('start', (event: ResizeDragEvent) => {
      const node = findNode(props.nodeId)
      const { xSnapped, ySnapped } = getPointerPosition(event)

      prevValues = {
        width: node?.dimensions.width ?? 0,
        height: node?.dimensions.height ?? 0,
        x: node?.position.x ?? 0,
        y: node?.position.y ?? 0,
      }

      startValues = {
        ...prevValues,
        pointerX: xSnapped,
        pointerY: ySnapped,
        aspectRatio: prevValues.width / prevValues.height,
      }

      emits('resizeStart', { event, params: prevValues })
    })
    .on('drag', (event: ResizeDragEvent) => {
      const { xSnapped, ySnapped } = getPointerPosition(event)
      const node = findNode(props.nodeId)

      if (node) {
        const changes: NodeChange[] = []
        const {
          pointerX: startX,
          pointerY: startY,
          width: startWidth,
          height: startHeight,
          x: startNodeX,
          y: startNodeY,
          aspectRatio: startAspectRatio,
        } = startValues

        const { x: prevX, y: prevY, width: prevWidth, height: prevHeight } = prevValues

        const distX = Math.floor(enableX ? xSnapped - startX : 0)
        const distY = Math.floor(enableY ? ySnapped - startY : 0)

        let width = clamp(startWidth + (invertX ? -distX : distX), props.minWidth, props.maxWidth)
        let height = clamp(startHeight + (invertY ? -distY : distY), props.minHeight, props.maxHeight)

        if (props.keepAspectRatio) {
          const nextAspectRatio = width / height
          let aspectRatio = startAspectRatio

          if (typeof props.keepAspectRatio === 'number' && nextAspectRatio !== props.keepAspectRatio) {
            aspectRatio = props.keepAspectRatio
          }

          const isDiagonal = enableX && enableY
          const isHorizontal = enableX && !enableY
          const isVertical = enableY && !enableX

          width = (nextAspectRatio <= aspectRatio && isDiagonal) || isVertical ? height * aspectRatio : width
          height = (nextAspectRatio > aspectRatio && isDiagonal) || isHorizontal ? width / aspectRatio : height

          if (width >= props.maxWidth) {
            width = props.maxWidth
            height = props.maxWidth / aspectRatio
          } else if (width <= props.minWidth) {
            width = props.minWidth
            height = props.minWidth / aspectRatio
          }

          if (height >= props.maxHeight) {
            height = props.maxHeight
            width = props.maxHeight * aspectRatio
          } else if (height <= props.minHeight) {
            height = props.minHeight
            width = props.minHeight * aspectRatio
          }
        }

        const isWidthChange = width !== prevWidth
        const isHeightChange = height !== prevHeight

        if (invertX || invertY) {
          const x = invertX ? startNodeX - (width - startWidth) : startNodeX
          const y = invertY ? startNodeY - (height - startHeight) : startNodeY

          // only transform the node if the width or height changes
          const isXPosChange = x !== prevX && isWidthChange
          const isYPosChange = y !== prevY && isHeightChange

          if (isXPosChange || isYPosChange) {
            const positionChange: NodePositionChange = {
              id: node.id,
              type: 'position',
              from: node.position,
              position: {
                x: isXPosChange ? x : prevX,
                y: isYPosChange ? y : prevY,
              },
            }

            changes.push(positionChange)

            prevValues.x = positionChange.position!.x
            prevValues.y = positionChange.position!.y
          }
        }

        if (props.nodeId && (isWidthChange || isHeightChange)) {
          const dimensionChange: NodeDimensionChange = {
            id: props.nodeId,
            type: 'dimensions',
            updateStyle: true,
            resizing: true,
            dimensions: {
              width,
              height,
            },
          }

          changes.push(dimensionChange)

          prevValues.width = width
          prevValues.height = height
        }

        if (changes.length === 0) {
          return
        }

        const direction = getDirection({
          width: prevValues.width,
          prevWidth,
          height: prevValues.height,
          prevHeight,
          invertX,
          invertY,
        })

        const nextValues = { ...prevValues, direction }

        const callResize = props.shouldResize?.(event, nextValues)

        if (callResize === false) {
          return
        }

        emits('resize', { event, params: nextValues })

        triggerEmits.nodesChange(changes)
      }
    })
    .on('end', (event: ResizeDragEvent) => {
      if (props.nodeId) {
        const dimensionChange: NodeDimensionChange = {
          id: props.nodeId,
          type: 'dimensions',
          resizing: false,
        }

        emits('resizeEnd', { event, params: prevValues })

        triggerEmits.nodesChange([dimensionChange])
      }
    })

  selection.call(dragHandler)

  onCleanup(() => {
    selection.on('.drag', null)
  })
})

const positionClassNames = computed(() => controlPosition.value.split('-'))
const colorStyleProp = computed(() => (props.variant === ResizeControlVariant.Line ? 'borderColor' : 'backgroundColor'))
const controlStyle = computed(() => (props.color ? { [colorStyleProp.value]: props.color } : {}))
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
    class="vue-flow__resize-control nodrag"
    :class="[...positionClassNames, variant]"
    :style="controlStyle"
  >
    <slot />
  </div>
</template>
