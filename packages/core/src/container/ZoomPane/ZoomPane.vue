<script setup lang="ts">
import { onMounted, onUnmounted, toRef, watch } from 'vue'
import { XYPanZoom } from '@xyflow/system'
import { useKeyPress, useVueFlow } from '../../composables'
import { useResizeHandler } from '../../composables/useResizeHandler'
import Pane from '../Pane/Pane.vue'
import Viewport from '../Viewport/Viewport.vue'
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'

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

const shouldPanOnScroll = toRef(() => panKeyPressed.value || panOnScroll.value)

const isSelecting = toRef(() => selectionKeyPressed.value || (selectionKeyCode.value === true && shouldPanOnDrag.value !== true))

useResizeHandler(zoomPane)

onMounted(() => {
  if (zoomPane.value) {
    const panZoomInstance = XYPanZoom({
      domNode: zoomPane.value,
      minZoom: minZoom.value,
      maxZoom: maxZoom.value,
      translateExtent: translateExtent.value,
      viewport: { ...viewport.value, ...defaultViewport.value },
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

    viewport.value = panZoomInstance.getViewport()
    panZoom.value = panZoomInstance

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
        connectionStartHandle,
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
          paneClickDistance: 0,
          onTransformChange: (transform) => {
            emits.viewportChange({ x: transform[0], y: transform[1], zoom: transform[2] })
            viewport.value = { x: transform[0], y: transform[1], zoom: transform[2] }
          },
          connectionInProgress: !!connectionStartHandle.value,
          lib: 'vue',
        })
      },
      { immediate: true },
    )
  }
})
</script>

<script lang="ts">
export default {
  name: 'ZoomPane',
}
</script>

<template>
  <div ref="zoomPane" :key="`viewport-${id}`" class="vue-flow__viewport vue-flow__container">
    <Pane
      :is-selecting="isSelecting"
      :selection-key-pressed="selectionKeyPressed"
      :class="{ connecting: !!connectionStartHandle, dragging: paneDragging, draggable: shouldPanOnDrag }"
    >
      <Viewport>
        <EdgeRenderer />

        <div class="vue-flow__edge-labels" />

        <NodeRenderer />

        <slot />
      </Viewport>
    </Pane>
  </div>
</template>
