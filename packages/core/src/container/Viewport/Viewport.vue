<script lang="ts" setup>
import type { D3ZoomEvent, ZoomTransform } from 'd3-zoom'
import { zoom, zoomIdentity } from 'd3-zoom'
import { pointer, select } from 'd3-selection'
import type { CoordinateExtent, ViewportTransform } from '../../types'
import { PanOnScrollMode } from '../../types'
import SelectionPane from '../SelectionPane/SelectionPane.vue'
import Transform from './Transform.vue'

const {
  id,
  minZoom,
  maxZoom,
  defaultViewport,
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
  connectionStartHandle,
} = $(useVueFlow())

const viewportEl = templateRef<HTMLDivElement>('viewport', null)

let isZoomingOrPanning = $ref(false)

let isDragging = $ref(false)

const isConnecting = $computed(() => !!connectionStartHandle)

const viewChanged = (prevViewport: ViewportTransform, eventTransform: ZoomTransform): boolean =>
  (prevViewport.x !== eventTransform.x && !isNaN(eventTransform.x)) ||
  (prevViewport.y !== eventTransform.y && !isNaN(eventTransform.y)) ||
  (prevViewport.zoom !== eventTransform.k && !isNaN(eventTransform.k))

const eventToFlowTransform = (eventTransform: ZoomTransform): ViewportTransform => ({
  x: eventTransform.x,
  y: eventTransform.y,
  zoom: eventTransform.k,
})

const isWrappedWithClass = (event: Event, className: string | undefined) => (event.target as Element).closest(`.${className}`)

let prevTransform = $ref<ViewportTransform>({
  x: 0,
  y: 0,
  zoom: 0,
})

onMounted(() => {
  useResizeObserver(viewportEl, () => {
    if (!viewportEl.value) return

    const { width, height } = getDimensions(viewportEl.value)
    dimensions.width = width
    dimensions.height = height
  })

  const window = useWindow()
  useEventListener(window, 'resize', () => {
    if (!viewportEl.value) return

    const { width, height } = getDimensions(viewportEl.value)
    dimensions.width = width
    dimensions.height = height
  })
})

onMounted(() => {
  const bbox = viewportEl.value.getBoundingClientRect()
  const d3Zoom = zoom<HTMLDivElement, any>().scaleExtent([minZoom, maxZoom]).translateExtent(translateExtent)
  const d3Selection = select(viewportEl.value).call(d3Zoom)
  const d3ZoomHandler = d3Selection.on('wheel.zoom')

  const updatedTransform = zoomIdentity.translate(defaultPosition[0], defaultPosition[1]).scale(defaultZoom)
  const extent: CoordinateExtent = [
    [0, 0],
    [bbox.width, bbox.height],
  ]

  const constrainedTransform = d3Zoom.constrain()(updatedTransform, extent, translateExtent)
  d3Zoom.transform(d3Selection, constrainedTransform)

  setState({
    d3Zoom,
    d3Selection,
    d3ZoomHandler,
    viewport: { x: updatedTransform.x, y: updatedTransform.y, zoom: updatedTransform.k },
    viewportRef: viewportEl.value,
  })

  const onKeyPress = (keyPress: boolean) => {
    if (keyPress && !isZoomingOrPanning) {
      d3Zoom.on('zoom', null)
    } else if (!keyPress) {
      d3Zoom.on('zoom', (event: D3ZoomEvent<HTMLDivElement, any>) => {
        setState({ viewport: { x: event.transform.x, y: event.transform.y, zoom: event.transform.k } })

        const flowTransform = eventToFlowTransform(event.transform)

        emits.move({ event, flowTransform })
      })
    }
  }

  const selectionKeyPressed = useKeyPress(selectionKeyCode, onKeyPress)
  // initialize
  onKeyPress(false)

  const zoomKeyPressed = useKeyPress(zoomActivationKeyCode)

  d3Zoom.on('start', (event: D3ZoomEvent<HTMLDivElement, any>) => {
    if (!event.sourceEvent) return null

    isZoomingOrPanning = true

    const flowTransform = eventToFlowTransform(event.transform)

    if (event.sourceEvent?.type === 'mousedown') {
      isDragging = true
    }

    prevTransform = flowTransform

    emits.moveStart({ event, flowTransform })
  })

  d3Zoom.on('end', (event: D3ZoomEvent<HTMLDivElement, any>) => {
    if (!event.sourceEvent) return null

    isZoomingOrPanning = false
    isDragging = false

    if (viewChanged(prevTransform, event.transform)) {
      const flowTransform = eventToFlowTransform(event.transform)

      prevTransform = flowTransform

      emits.moveEnd({ event, flowTransform })
    }
  })

  watchEffect(() => {
    if (panOnScroll && !zoomKeyPressed.value) {
      d3Selection
        .on('wheel', (event: WheelEvent) => {
          if (isWrappedWithClass(event, noWheelClassName?.value)) {
            return false
          }

          event.preventDefault()
          event.stopImmediatePropagation()

          const currentZoom = d3Selection.property('__zoom').k || 1

          if (event.ctrlKey && zoomOnPinch) {
            const point = pointer(event)
            // taken from https://github.com/d3/d3-zoom/blob/master/src/zoom.js
            const pinchDelta = -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * 10
            const zoom = currentZoom * 2 ** pinchDelta
            d3Zoom.scaleTo(d3Selection, zoom, point)

            return
          }

          // increase scroll speed in firefox
          // firefox: deltaMode === 1; chrome: deltaMode === 0
          const deltaNormalize = event.deltaMode === 1 ? 20 : 1
          const deltaX = panOnScrollMode === PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize
          const deltaY = panOnScrollMode === PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize

          d3Zoom.translateBy(d3Selection, -(deltaX / currentZoom) * panOnScrollSpeed, -(deltaY / currentZoom) * panOnScrollSpeed)
        })
        .on('wheel.zoom', null)
    } else if (typeof d3ZoomHandler !== 'undefined') {
      d3Selection
        .on('wheel', (event: WheelEvent) => {
          if (!preventScrolling || isWrappedWithClass(event, noWheelClassName?.value)) {
            return null
          }

          event.preventDefault()
        })
        .on('wheel.zoom', d3ZoomHandler)
    }
  })

  d3Zoom.filter((event: MouseEvent) => {
    const zoomScroll = zoomKeyPressed.value || zoomOnScroll
    const pinchZoom = zoomOnPinch && event.ctrlKey

    if (
      event.button === 1 &&
      event.type === 'mousedown' &&
      ((event.target as HTMLElement)?.closest(`.vue-flow__node`) || (event.target as HTMLElement)?.closest(`.vue-flow__edge`))
    ) {
      return true
    }

    // if all interactions are disabled, we prevent all zoom events
    if (!panOnDrag && !zoomScroll && !panOnScroll && !zoomOnDoubleClick && !zoomOnPinch) return false

    // during a selection we prevent all other interactions
    if (selectionKeyPressed.value && selectionKeyCode !== true) return false

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
    return (!event.ctrlKey || event.type === 'wheel') && (!event.button || event.button <= 1)
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
    <SelectionPane :class="{ connecting: isConnecting, dragging: isDragging, draggable: panOnDrag }" />
  </div>
</template>
