<script lang="ts" setup>
import { D3ZoomEvent, zoomIdentity, ZoomTransform } from 'd3-zoom'
import { pointer } from 'd3-selection'
import { useKeyPress, useVueFlow } from '../../composables'
import { D3Selection, D3Zoom, D3ZoomHandler, FlowTransform, PanOnScrollMode } from '../../types'
import { clamp, clampPosition } from '../../utils'

interface Props {
  d3Zoom: D3Zoom
  d3Selection: D3Selection
  d3ZoomHandler: D3ZoomHandler
}

const props = defineProps<Props>()

const { store } = useVueFlow()

const viewChanged = (prevTransform: FlowTransform, eventTransform: ZoomTransform): boolean =>
  (prevTransform.x !== eventTransform.x && !isNaN(eventTransform.x)) ||
  (prevTransform.y !== eventTransform.y && !isNaN(eventTransform.y)) ||
  (prevTransform.zoom !== eventTransform.k && !isNaN(eventTransform.k))

const eventToFlowTransform = (eventTransform: ZoomTransform): FlowTransform => ({
  x: eventTransform.x,
  y: eventTransform.y,
  zoom: eventTransform.k,
})

const isWrappedWithClass = (event: Event, className: string | undefined) => (event.target as Element).closest(`.${className}`)

const clampedZoom = clamp(store.defaultZoom, store.minZoom, store.maxZoom)
const transform = ref({
  ...clampPosition({ x: store.defaultPosition[0], y: store.defaultPosition[1] }, store.translateExtent),
  zoom: clampedZoom,
})

const updatedTransform = zoomIdentity.translate(transform.value.x, transform.value.y).scale(transform.value.zoom)
props.d3Zoom.transform(props.d3Selection, updatedTransform)

store.transform = [updatedTransform.x, updatedTransform.y, updatedTransform.k]

const selectionKeyPressed = useKeyPress(store.selectionKeyCode, (keyPress) => {
  if (keyPress) {
    props.d3Zoom.on('zoom', null)
  } else {
    props.d3Zoom.on('zoom', (event: D3ZoomEvent<HTMLDivElement, any>) => {
      store.setState({ transform: [event.transform.x, event.transform.y, event.transform.k] })
      const flowTransform = eventToFlowTransform(event.transform)
      store.hooks.move.trigger({ event, flowTransform })
    })
  }
})

const zoomKeyPressed = useKeyPress(store.zoomActivationKeyCode)

props.d3Zoom.on('start', (event: D3ZoomEvent<HTMLDivElement, any>) => {
  const flowTransform = eventToFlowTransform(event.transform)
  transform.value = flowTransform
  store.hooks.moveStart.trigger({ event, flowTransform })
})

props.d3Zoom.on('end', (event: D3ZoomEvent<HTMLDivElement, any>) => {
  if (viewChanged(transform.value, event.transform)) {
    const flowTransform = eventToFlowTransform(event.transform)
    transform.value = flowTransform
    store.hooks.moveEnd.trigger({ event, flowTransform })
  }
})

props.d3Selection
  ?.on('wheel', (event: WheelEvent) => {
    if (store.panOnScroll && !zoomKeyPressed.value) {
      if (isWrappedWithClass(event, store.noWheelClassName)) return
      event.preventDefault()
      event.stopImmediatePropagation()

      const currentZoom = props.d3Selection?.property('__zoom').k || 1

      if (event.ctrlKey && store.zoomOnPinch) {
        const point = pointer(event)
        // taken from https://github.com/d3/d3-zoom/blob/master/src/zoom.js
        const pinchDelta = -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * 10
        const zoom = currentZoom * Math.pow(2, pinchDelta)
        if (props.d3Selection) props.d3Zoom.scaleTo(props.d3Selection, zoom, point)

        return
      }

      // increase scroll speed in firefox
      // firefox: deltaMode === 1; chrome: deltaMode === 0
      const deltaNormalize = event.deltaMode === 1 ? 20 : 1
      const deltaX = store.panOnScrollMode === PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize
      const deltaY = store.panOnScrollMode === PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize

      if (props.d3Selection && store.panOnScrollSpeed)
        props.d3Zoom?.translateBy(
          props.d3Selection,
          -(deltaX / currentZoom) * store.panOnScrollSpeed,
          -(deltaY / currentZoom) * store.panOnScrollSpeed,
        )
    } else {
      if (
        (!store.zoomOnScroll && store.preventScrolling) ||
        !store.preventScrolling ||
        isWrappedWithClass(event, store.noWheelClassName)
      )
        return null
      event.preventDefault()
    }
  })
  .on('wheel.zoom', store.panOnScroll || typeof props.d3ZoomHandler === 'undefined' ? null : (props.d3ZoomHandler as any))

props.d3Zoom.filter((event: MouseEvent) => {
  console.log(event)
  const zoomScroll = zoomKeyPressed.value || store.zoomOnScroll
  const pinchZoom = store.zoomOnPinch && event.ctrlKey

  // if all interactions are disabled, we prevent all zoom events
  if (!store.panOnDrag && !zoomScroll && !store.panOnScroll && !store.zoomOnDoubleClick && !store.zoomOnPinch) return false

  // during a selection we prevent all other interactions
  if (selectionKeyPressed.value) return false

  // if zoom on double click is disabled, we prevent the double click event
  if (!store.zoomOnDoubleClick && event.type === 'dblclick') return false

  // if the target element is inside an element with the nowheel class, we prevent zooming
  if (isWrappedWithClass(event, store.noWheelClassName) && event.type === 'wheel') return false

  // if the target element is inside an element with the nopan class, we prevent panning
  if (isWrappedWithClass(event, store.noPanClassName) && event.type !== 'wheel') return false

  if (!store.zoomOnPinch && event.ctrlKey && event.type === 'wheel') return false

  // when there is no scroll handling enabled, we prevent all wheel events
  if (!zoomScroll && !store.panOnScroll && !pinchZoom && event.type === 'wheel') return false

  // if the pane is not movable, we prevent dragging it with mousestart or touchstart
  if (!store.panOnDrag && (event.type === 'mousedown' || event.type === 'touchstart')) return false

  // default filter for d3-zoom
  return (!event.ctrlKey || event.type === 'wheel') && !event.button
})
</script>
<script lang="ts">
export default {
  name: 'Zoom',
}
</script>
<template>
  <slot />
</template>
