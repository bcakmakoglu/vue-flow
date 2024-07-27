<script lang="ts" setup>
import { onMounted, onUnmounted, toRef, watch } from 'vue'
import { XYPanZoom } from '@xyflow/system'
import Pane from '../Pane/Pane.vue'
import { useKeyPress, useVueFlow } from '../../composables'
import { useResizeHandler } from '../../composables/useResizeHandler'
import Transform from './Transform.vue'

const {
  minZoom,
  maxZoom,
  defaultViewport,
  translateExtent,
  zoomActivationKeyCode,
  selectionKeyCode,
  panActivationKeyCode,
  panOnScroll,
  panOnScrollMode,
  panOnScrollSpeed,
  panOnDrag,
  zoomOnDoubleClick,
  zoomOnPinch,
  zoomOnScroll,
  preventScrolling,
  noWheelClassName,
  noPanClassName,
  emits,
  connectionStartHandle,
  userSelectionActive,
  paneDragging,
  viewport,
  viewportRef,
  paneClickDistance,
  panZoom,
} = useVueFlow()

useResizeHandler(viewportRef)

const panKeyPressed = useKeyPress(panActivationKeyCode)

const selectionKeyPressed = useKeyPress(selectionKeyCode)

const zoomActivationKeyPressed = useKeyPress(zoomActivationKeyCode)

const shouldPanOnDrag = toRef(() => panKeyPressed.value || panOnDrag.value)

const shouldPanOnScroll = toRef(() => panKeyPressed.value || panOnScroll.value)

const isSelecting = toRef(() => selectionKeyPressed.value || (selectionKeyCode.value === true && shouldPanOnDrag.value !== true))

onMounted(() => {
  if (viewportRef.value) {
    panZoom.value = XYPanZoom({
      domNode: viewportRef.value,
      minZoom: minZoom.value,
      maxZoom: maxZoom.value,
      translateExtent: translateExtent.value,
      viewport: { ...defaultViewport.value, x: 0, y: 0, zoom: 1 },
      paneClickDistance: paneClickDistance.value,
      onTransformChange: (transform) => {
        const viewportTransform = {
          x: transform[0],
          y: transform[1],
          zoom: transform[2],
        }

        viewport.value = viewportTransform

        emits.viewportChange(viewportTransform)
      },
      onDraggingChange: (isPaneDragging) => {
        paneDragging.value = isPaneDragging
      },
      onPanZoomStart: (event, viewport) => {
        emits.moveStart({ event, flowTransform: viewport })
        emits.viewportChangeStart(viewport)
      },
      onPanZoom: (event, viewport) => {
        emits.move({ event, flowTransform: viewport })
        emits.viewportChange(viewport)
      },
      onPanZoomEnd: (event, viewport) => {
        emits.moveEnd({ event, flowTransform: viewport })
        emits.viewportChangeEnd(viewport)
      },
    })

    viewport.value = panZoom.value.getViewport()
  }
})

onUnmounted(() => {
  panZoom.value?.destroy()
})

watch(
  [
    zoomOnScroll,
    zoomOnPinch,
    shouldPanOnScroll,
    panOnScrollSpeed,
    panOnScrollMode,
    zoomOnDoubleClick,
    shouldPanOnDrag,
    zoomActivationKeyPressed,
    preventScrolling,
    noPanClassName,
    userSelectionActive,
    noWheelClassName,
  ],
  () => {
    panZoom.value?.update({
      zoomOnScroll: zoomOnScroll.value,
      zoomOnPinch: zoomOnPinch.value,
      panOnScroll: shouldPanOnScroll.value,
      panOnScrollSpeed: panOnScrollSpeed.value,
      panOnScrollMode: panOnScrollMode.value,
      zoomOnDoubleClick: zoomOnDoubleClick.value,
      panOnDrag: shouldPanOnDrag.value,
      zoomActivationKeyPressed: zoomActivationKeyPressed.value,
      preventScrolling: preventScrolling.value,
      noPanClassName: noPanClassName.value,
      userSelectionActive: userSelectionActive.value,
      noWheelClassName: noWheelClassName.value,
      lib: 'vue',
    })
  },
)
</script>

<template>
  <div ref="viewportRef" class="vue-flow__viewport vue-flow__container">
    <Pane
      :is-selecting="isSelecting"
      :selection-key-pressed="selectionKeyPressed"
      :class="{ connecting: !!connectionStartHandle, dragging: paneDragging, draggable: shouldPanOnDrag }"
    >
      <Transform>
        <slot />
      </Transform>
    </Pane>
  </div>
</template>
