<script setup lang="ts">
import { onMounted, onUnmounted, toRef, watchEffect } from 'vue'
import { XYPanZoom } from '@xyflow/system'
import { useKeyPress, useResizeHandler, useVueFlow } from '../../composables'
import Pane from '~/container/Pane/Pane.vue'
import Transform from '~/container/Viewport/Transform.vue'

const {
  id,
  emits,
  viewport,
  viewportRef: zoomPane,
  panZoom,
  paneDragging,
  userSelectionActive,
  zoomActivationKeyCode,
  minZoom,
  maxZoom,
  translateExtent,
  defaultViewport,
  zoomOnScroll,
  zoomOnPinch,
  panOnScroll,
  panOnScrollSpeed,
  panOnScrollMode,
  zoomOnDoubleClick,
  panOnDrag,
  preventScrolling,
  noPanClassName,
  noWheelClassName,
  panActivationKeyCode,
  selectionKeyCode,
  connectionStartHandle,
} = useVueFlow()

const zoomActivationKeyPressed = useKeyPress(zoomActivationKeyCode)

const panKeyPressed = useKeyPress(panActivationKeyCode)

const selectionKeyPressed = useKeyPress(selectionKeyCode)

const shouldPanOnDrag = toRef(() => !selectionKeyPressed.value && (panKeyPressed.value || panOnDrag.value))

const isSelecting = toRef(() => selectionKeyPressed.value || (selectionKeyCode.value === true && shouldPanOnDrag.value !== true))

useResizeHandler(zoomPane)

onMounted(() => {
  if (zoomPane.value) {
    panZoom.value = XYPanZoom({
      domNode: zoomPane.value,
      minZoom: minZoom.value,
      maxZoom: maxZoom.value,
      translateExtent: translateExtent.value,
      viewport: { ...viewport.value, ...defaultViewport.value },
      onTransformChange: (transform) => {
        emits.viewportChange({ x: transform[0], y: transform[1], zoom: transform[2] })

        viewport.value = { x: transform[0], y: transform[1], zoom: transform[2] }
      },
      onDraggingChange: (isDraggingPane) => (paneDragging.value = isDraggingPane),
      onPanZoomStart: (event, viewport) => {
        emits.moveStart({ event, viewport })
        emits.viewportChangeStart(viewport)
      },
      onPanZoom: (event, viewport) => {
        emits.move({ event, viewport })
        emits.viewportChange(viewport)
      },
      onPanZoomEnd: (event, viewport) => {
        emits.moveEnd({ event, viewport })
        emits.viewportChangeEnd(viewport)
      },
    })

    const { x, y, zoom } = panZoom.value!.getViewport()

    viewport.value = { x, y, zoom }

    onUnmounted(() => {
      panZoom.value?.destroy()
    })
  }
})

watchEffect(() => {
  panZoom.value?.update({
    onPaneContextMenu(event) {
      emits.paneContextMenu(event)
    },
    zoomOnScroll: zoomOnScroll.value,
    zoomOnPinch: zoomOnPinch.value,
    panOnScroll: panOnScroll.value,
    panOnScrollSpeed: panOnScrollSpeed.value,
    panOnScrollMode: panOnScrollMode.value,
    zoomOnDoubleClick: zoomOnDoubleClick.value,
    panOnDrag: panOnDrag.value,
    zoomActivationKeyPressed: zoomActivationKeyPressed.value,
    preventScrolling: preventScrolling.value,
    noPanClassName: noPanClassName.value,
    userSelectionActive: userSelectionActive.value,
    noWheelClassName: noWheelClassName.value,
    lib: 'vue',
  })
})
</script>

<template>
  <div ref="zoomPane" :key="`viewport-${id}`" class="vue-flow__viewport vue-flow__container">
    <Pane
      :is-selecting="isSelecting"
      :class="{ connecting: !!connectionStartHandle, dragging: paneDragging, draggable: shouldPanOnDrag }"
    >
      <Transform>
        <slot />
      </Transform>
    </Pane>
  </div>
</template>
