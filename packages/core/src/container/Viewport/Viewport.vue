<script lang="ts" setup>
import type { D3ZoomEvent, ZoomTransform } from 'd3-zoom'
import { zoom, zoomIdentity } from 'd3-zoom'
import { pointer, select } from 'd3-selection'
import type { CoordinateExtent, FlowOptions, ViewportTransform } from '../../types'
import { PanOnScrollMode } from '../../types'
import Pane from '../Pane/Pane.vue'
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
  setState,
  emits,
  connectionStartHandle,
  userSelectionActive,
  paneDragging,
} = $(useVueFlow())

const viewportEl = ref<HTMLDivElement>()

let selectionKeyPressed = $ref(false)

let isZoomingOrPanning = $ref(false)

let zoomedWithRightMouseButton = $ref(false)

const isRightClickPan = (pan: FlowOptions['panOnDrag'], usedButton: number) =>
  usedButton === 2 && Array.isArray(pan) && pan.includes(2)

const panKeyPressed = useKeyPress(panActivationKeyCode)

const isConnecting = $computed(() => !!connectionStartHandle)

const shouldPanOnDrag = computed(() => !selectionKeyPressed && panOnDrag && panKeyPressed.value)

const isSelecting = computed(
  () => (selectionKeyCode !== true && selectionKeyPressed) || (selectionKeyCode === true && shouldPanOnDrag.value !== true),
)

const viewChanged = (prevViewport: ViewportTransform, eventTransform: ZoomTransform): boolean =>
  (prevViewport.x !== eventTransform.x && !isNaN(eventTransform.x)) ||
  (prevViewport.y !== eventTransform.y && !isNaN(eventTransform.y)) ||
  (prevViewport.zoom !== eventTransform.k && !isNaN(eventTransform.k))

const eventToFlowTransform = (eventTransform: ZoomTransform): ViewportTransform => ({
  x: eventTransform.x,
  y: eventTransform.y,
  zoom: eventTransform.k,
})

const setDimensions = () => {
  if (!viewportEl.value) return

  const { width, height } = getDimensions(viewportEl.value)
  dimensions.width = width
  dimensions.height = height
}

const isWrappedWithClass = (event: Event, className: string | undefined) => (event.target as Element).closest(`.${className}`)

let prevTransform = $ref<ViewportTransform>({
  x: 0,
  y: 0,
  zoom: 0,
})

onMounted(() => {
  useResizeObserver(viewportEl, setDimensions)

  const window = useWindow()
  useEventListener(window, 'resize', setDimensions)
})

onMounted(() => {
  const viewportElement = viewportEl.value!
  const bbox = viewportElement.getBoundingClientRect()
  const d3Zoom = zoom<HTMLDivElement, any>().scaleExtent([minZoom, maxZoom]).translateExtent(translateExtent)
  const d3Selection = select(viewportElement).call(d3Zoom)
  const d3ZoomHandler = d3Selection.on('wheel.zoom')

  const updatedTransform = zoomIdentity
    .translate(defaultViewport.x, defaultViewport.y)
    .scale(clamp(defaultViewport.zoom, minZoom, maxZoom))

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
    viewportRef: viewportElement,
  })

  const onKeyPress = (keyPress: boolean) => {
    selectionKeyPressed = keyPress

    if (keyPress && userSelectionActive && !isZoomingOrPanning) {
      d3Zoom.on('zoom', null)
    } else if (!keyPress && !userSelectionActive) {
      d3Zoom.on('zoom', (event: D3ZoomEvent<HTMLDivElement, any>) => {
        setState({ viewport: { x: event.transform.x, y: event.transform.y, zoom: event.transform.k } })

        const flowTransform = eventToFlowTransform(event.transform)

        zoomedWithRightMouseButton = isRightClickPan(panOnDrag, event.sourceEvent?.button)

        emits.viewportChange(flowTransform)
        emits.move({ event, flowTransform })
      })
    }
  }

  useKeyPress(selectionKeyCode, onKeyPress)

  // initialize
  onKeyPress(false)

  const zoomKeyPressed = useKeyPress(zoomActivationKeyCode)

  d3Zoom.on('start', (event: D3ZoomEvent<HTMLDivElement, any>) => {
    if (!event.sourceEvent) return null

    isZoomingOrPanning = true

    const flowTransform = eventToFlowTransform(event.transform)

    if (event.sourceEvent?.type === 'mousedown') {
      setState({ paneDragging: true })
    }

    prevTransform = flowTransform

    emits.viewportChangeStart(flowTransform)
    emits.moveStart({ event, flowTransform })
  })

  d3Zoom.on('end', (event: D3ZoomEvent<HTMLDivElement, any>) => {
    if (!event.sourceEvent) return null

    isZoomingOrPanning = false

    setState({ paneDragging: false })

    if (isRightClickPan(panOnDrag, event.sourceEvent?.button) && !zoomedWithRightMouseButton) {
      emits.paneContextMenu(event.sourceEvent)
    }

    zoomedWithRightMouseButton = false

    if (viewChanged(prevTransform, event.transform)) {
      const flowTransform = eventToFlowTransform(event.transform)

      prevTransform = flowTransform

      emits.viewportChangeEnd(flowTransform)
      emits.moveEnd({ event, flowTransform })
    }
  })

  watchEffect(() => {
    if (panOnScroll && !zoomKeyPressed.value && !userSelectionActive) {
      d3Selection
        .on('wheel', (event: WheelEvent) => {
          if (isWrappedWithClass(event, noWheelClassName)) {
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
          if (!preventScrolling || isWrappedWithClass(event, noWheelClassName)) {
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
    if (userSelectionActive) return false

    // if zoom on double click is disabled, we prevent the double click event
    if (!zoomOnDoubleClick && event.type === 'dblclick') return false

    // if the target element is inside an element with the nowheel class, we prevent zooming
    if (isWrappedWithClass(event, noWheelClassName) && event.type === 'wheel') return false

    // if the target element is inside an element with the nopan class, we prevent panning
    if (isWrappedWithClass(event, noPanClassName) && event.type !== 'wheel') return false

    if (!zoomOnPinch && event.ctrlKey && event.type === 'wheel') return false

    // when there is no scroll handling enabled, we prevent all wheel events
    if (!zoomScroll && !panOnScroll && !pinchZoom && event.type === 'wheel') return false

    // if the pane is not movable, we prevent dragging it with mousestart or touchstart
    if (!panOnDrag && (event.type === 'mousedown' || event.type === 'touchstart')) return false

    // if the pane is only movable using allowed clicks
    if (
      Array.isArray(panOnDrag) &&
      !panOnDrag.includes(event.button) &&
      (event.type === 'mousedown' || event.type === 'touchstart')
    ) {
      return false
    }

    // We only allow right clicks if pan on drag is set to right-click
    const buttonAllowed = (Array.isArray(panOnDrag) && panOnDrag.includes(event.button)) || !event.button || event.button <= 1

    // default filter for d3-zoom
    return (!event.ctrlKey || event.type === 'wheel') && buttonAllowed
  })
})
</script>

<script lang="ts">
export default {
  name: 'Viewport',
}
</script>

<template>
  <div ref="viewportEl" :key="`viewport-${id}`" class="vue-flow__viewport vue-flow__container">
    <Pane :is-selecting="isSelecting" :class="{ connecting: isConnecting, dragging: paneDragging, draggable: !!panOnDrag }">
      <Transform>
        <slot name="zoom-pane" />
      </Transform>
    </Pane>

    <slot />
  </div>
</template>
