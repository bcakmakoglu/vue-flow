<script lang="ts" setup>
import type { D3ZoomEvent, ZoomTransform } from 'd3-zoom'
import { zoom, zoomIdentity } from 'd3-zoom'
import { pointer, select } from 'd3-selection'
import type { ViewpaneTransform } from '../../types'
import { PanOnScrollMode } from '../../types'
import { useKeyPress, useVueFlow, useWindow } from '../../composables'
import { clamp, clampPosition, getDimensions } from '../../utils'
import SelectionPane from '../SelectionPane/SelectionPane.vue'
import Transform from './Transform.vue'

const {
  id,
  minZoom,
  maxZoom,
  defaultZoom,
  defaultPosition,
  translateExtent,
  dimensions,
  zoomActivationKeyCode,
  selectionKeyCode,
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
  setState,
  emits,
} = $(useVueFlow())

const viewportEl = templateRef<HTMLDivElement>('viewport', null)

let isZoomingOrPanning = $ref(false)

const viewChanged = (prevTransform: ViewpaneTransform, eventTransform: ZoomTransform): boolean =>
  (prevTransform.x !== eventTransform.x && !isNaN(eventTransform.x)) ||
  (prevTransform.y !== eventTransform.y && !isNaN(eventTransform.y)) ||
  (prevTransform.zoom !== eventTransform.k && !isNaN(eventTransform.k))

const eventToFlowTransform = (eventTransform: ZoomTransform): ViewpaneTransform => ({
  x: eventTransform.x,
  y: eventTransform.y,
  zoom: eventTransform.k,
})

const isWrappedWithClass = (event: Event, className: string | undefined) => (event.target as Element).closest(`.${className}`)

const clampedZoom = clamp(defaultZoom, minZoom, maxZoom)

let transform = $ref({
  ...clampPosition({ x: defaultPosition[0], y: defaultPosition[1] }, translateExtent),
  zoom: clampedZoom,
})

const { width, height } = useElementBounding(viewportEl)

const stop = watch(
  [width, height],
  ([newWidth, newHeight]) => {
    dimensions.width = newWidth
    dimensions.height = newHeight
  },
  { immediate: true },
)

onBeforeUnmount(() => stop())

onMounted(() => {
  const window = useWindow()
  if ('screen' in window) {
    useEventListener(window, 'onresize', () => {
      if (!viewportEl.value) return
      const { width, height } = getDimensions(viewportEl.value)
      dimensions.width = width
      dimensions.height = height
    })
  }

  const d3Zoom = zoom<HTMLDivElement, any>().scaleExtent([minZoom, maxZoom]).translateExtent(translateExtent)
  const d3Selection = select(viewportEl.value).call(d3Zoom)
  const d3ZoomHandler = d3Selection.on('wheel.zoom')

  const updatedTransform = zoomIdentity.translate(transform.x, transform.y).scale(transform.zoom)
  d3Zoom.transform(d3Selection, updatedTransform)

  setState({
    d3Zoom,
    d3Selection,
    d3ZoomHandler,
    viewport: { x: updatedTransform.x, y: updatedTransform.y, zoom: updatedTransform.k },
  })

  const selectionKeyPressed = useKeyPress($$(selectionKeyCode), (keyPress) => {
    if (keyPress && !isZoomingOrPanning) {
      d3Zoom.on('zoom', null)
    } else if (!keyPress) {
      d3Zoom.on('zoom', (event: D3ZoomEvent<HTMLDivElement, any>) => {
        setState({ viewport: { x: event.transform.x, y: event.transform.y, zoom: event.transform.k } })
        const flowTransform = eventToFlowTransform(event.transform)
        emits.move({ event, flowTransform })
      })
    }
  })

  const zoomKeyPressed = useKeyPress($$(zoomActivationKeyCode))

  d3Zoom.on('start', (event: D3ZoomEvent<HTMLDivElement, any>) => {
    isZoomingOrPanning = true

    const flowTransform = eventToFlowTransform(event.transform)
    transform = flowTransform
    emits.moveStart({ event, flowTransform })
  })

  d3Zoom.on('end', (event: D3ZoomEvent<HTMLDivElement, any>) => {
    isZoomingOrPanning = false

    if (viewChanged(transform, event.transform)) {
      const flowTransform = eventToFlowTransform(event.transform)
      transform = flowTransform
      emits.moveEnd({ event, flowTransform })
    }
  })

  d3Selection
    .on('wheel', (event: WheelEvent) => {
      if (panOnScroll && !zoomKeyPressed.value) {
        if (isWrappedWithClass(event, noWheelClassName as any)) return
        event.preventDefault()
        event.stopImmediatePropagation()

        const currentZoom = d3Selection?.property('__zoom').k || 1

        if (event.ctrlKey && zoomOnPinch) {
          const point = pointer(event)
          // taken from https://github.com/d3/d3-zoom/blob/master/src/zoom.js
          const pinchDelta = -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * 10
          const zoom = currentZoom * 2 ** pinchDelta
          if (d3Selection) d3Zoom.scaleTo(d3Selection, zoom, point)

          return
        }

        // increase scroll speed in firefox
        // firefox: deltaMode === 1; chrome: deltaMode === 0
        const deltaNormalize = event.deltaMode === 1 ? 20 : 1
        const deltaX = panOnScrollMode === PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize
        const deltaY = panOnScrollMode === PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize

        if (d3Selection && panOnScrollSpeed) {
          d3Zoom.translateBy(d3Selection, -(deltaX / currentZoom) * panOnScrollSpeed, -(deltaY / currentZoom) * panOnScrollSpeed)
        }
      } else {
        if ((!zoomOnScroll && preventScrolling) || !preventScrolling || isWrappedWithClass(event, noWheelClassName?.value)) {
          return null
        }

        event.preventDefault()
      }
    })
    .on('wheel.zoom', panOnScroll || typeof d3ZoomHandler === 'undefined' ? null : (d3ZoomHandler as any))

  d3Zoom.filter((event: MouseEvent) => {
    const zoomScroll = zoomKeyPressed.value || zoomOnScroll
    const pinchZoom = zoomOnPinch && event.ctrlKey

    // if all interactions are disabled, we prevent all zoom events
    if (!panOnDrag && !zoomScroll && !panOnScroll && !zoomOnDoubleClick && !zoomOnPinch) return false

    // during a selection we prevent all other interactions
    if (selectionKeyPressed.value) return false

    // if zoom on double click is disabled, we prevent the double click event
    if (!zoomOnDoubleClick && event.type === 'dblclick') return false

    // if the target element is inside an element with the nowheel class, we prevent zooming
    if (isWrappedWithClass(event, noWheelClassName as any) && event.type === 'wheel') return false

    // if the target element is inside an element with the nopan class, we prevent panning
    if (isWrappedWithClass(event, noPanClassName as any) && event.type !== 'wheel') return false

    if (!zoomOnPinch && event.ctrlKey && event.type === 'wheel') return false

    // when there is no scroll handling enabled, we prevent all wheel events
    if (!zoomScroll && !panOnScroll && !pinchZoom && event.type === 'wheel') return false

    // if the pane is not movable, we prevent dragging it with mousestart or touchstart
    if (!panOnDrag && (event.type === 'mousedown' || event.type === 'touchstart')) return false

    // default filter for d3-zoom
    return (!event.ctrlKey || event.type === 'wheel') && !event.button
  })
})
</script>

<script lang="ts">
export default {
  name: 'Viewport',
}
</script>

<template>
  <div ref="viewport" :key="`viewport-${id}`" class="vue-flow__viewport vue-flow__container">
    <Transform>
      <slot />
    </Transform>
    <SelectionPane />
  </div>
</template>
