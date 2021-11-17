<script lang="ts" setup>
import { D3ZoomEvent, zoom, zoomIdentity, ZoomTransform } from 'd3-zoom'
import { get, invoke } from '@vueuse/core'
import { pointer, select } from 'd3-selection'
import { FlowTransform, KeyCode, PanOnScrollMode } from '../../types'
import { useHooks, useKeyPress, useStore, useZoomPanHelper } from '../../composables'
import { clamp, onLoadGetElements, onLoadProject, onLoadToObject } from '../../utils'

interface ZoomPaneProps {
  selectionKeyCode?: KeyCode
  zoomActivationKeyCode?: KeyCode
  paneMoveable?: boolean
  defaultZoom?: number
  defaultPosition?: [number, number]
  zoomOnScroll?: boolean
  zoomOnPinch?: boolean
  panOnScroll?: boolean
  panOnScrollSpeed?: number
  panOnScrollMode?: PanOnScrollMode
  zoomOnDoubleClick?: boolean
}

const props = withDefaults(defineProps<ZoomPaneProps>(), {
  selectionKeyCode: 'Shift',
  zoomActivationKeyCode: 'Meta',
  defaultZoom: 1,
  defaultPosition: () => [0, 0],
  zoomOnScroll: true,
  zoomOnPinch: true,
  zoomOnDoubleClick: true,
  panOnScroll: false,
  panOnScrollSpeed: 0.5,
  panOnScrollMode: PanOnScrollMode.Free,
  paneMoveable: true,
})
const store = useStore()
const hooks = useHooks()

const zoomPaneEl = templateRef<HTMLDivElement>('zoomPane', null)

const viewChanged = (prevTransform: FlowTransform, eventTransform: ZoomTransform): boolean =>
  (prevTransform.x !== eventTransform.x && !isNaN(eventTransform.x)) ||
  (prevTransform.y !== eventTransform.y && !isNaN(eventTransform.y)) ||
  (prevTransform.zoom !== eventTransform.k && !isNaN(eventTransform.k))

const eventToFlowTransform = (eventTransform: ZoomTransform): FlowTransform => ({
  x: eventTransform.x,
  y: eventTransform.y,
  zoom: eventTransform.k,
})

const clampedX = clamp(props.defaultPosition[0], store.translateExtent[0][0], store.translateExtent[1][0])
const clampedY = clamp(props.defaultPosition[1], store.translateExtent[0][1], store.translateExtent[1][1])
const clampedZoom = clamp(props.defaultZoom, store.minZoom, store.maxZoom)
const transform = ref({ x: clampedX, y: clampedY, zoom: clampedZoom })
const d3Zoom = ref(zoom<HTMLDivElement, any>().scaleExtent([store.minZoom, store.maxZoom]).translateExtent(store.translateExtent))
const d3Selection = ref()
store.transform = [transform.value.x, transform.value.y, transform.value.zoom]

invoke(async () => {
  await until(zoomPaneEl).toBeTruthy()
  const d3z = get(d3Zoom)!
  d3Selection.value = select(zoomPaneEl.value).call(d3z)
  const d3s = get(d3Selection)!
  const d3ZoomHandler = d3s.on('wheel.zoom')

  const updatedTransform = zoomIdentity.translate(clampedX, clampedY).scale(clampedZoom)
  d3z.transform(d3s, updatedTransform)
  store.initD3Zoom({ d3Zoom: d3z, d3Selection: d3s, d3ZoomHandler })
  store.transform = [updatedTransform.x, updatedTransform.y, updatedTransform.k]

  d3z.on('start', (event: D3ZoomEvent<HTMLDivElement, any>) => {
    if (viewChanged(transform.value, event.transform)) {
      const flowTransform = eventToFlowTransform(event.transform)
      transform.value = flowTransform

      hooks.moveStart.trigger(flowTransform)
    }
  })

  d3z.on('end', (event: D3ZoomEvent<HTMLDivElement, any>) => {
    if (viewChanged(transform.value, event.transform)) {
      const flowTransform = eventToFlowTransform(event.transform)
      transform.value = flowTransform

      hooks.moveEnd.trigger(flowTransform)
    }
  })

  useKeyPress(props.selectionKeyCode, (keyPress) => {
    if (keyPress) {
      d3z.on('zoom', null)
    } else {
      d3z.on('zoom', (event: D3ZoomEvent<HTMLDivElement, any>) => {
        if (viewChanged(transform.value, event.transform)) {
          const flowTransform = eventToFlowTransform(event.transform)
          transform.value = flowTransform

          hooks.move.trigger(flowTransform)
        }
      })
    }
  })

  useKeyPress(props.zoomActivationKeyCode, (keyPress) => {
    if (props.panOnScroll && keyPress) {
      d3s
        ?.on('wheel', (event: WheelEvent) => {
          event.preventDefault()
          event.stopImmediatePropagation()

          const currentZoom = d3s?.property('__zoom').k || 1

          if (event.ctrlKey && props.zoomOnPinch) {
            const point = pointer(event)
            // taken from https://github.com/d3/d3-zoom/blob/master/src/zoom.js
            const pinchDelta = -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * 10
            const zoom = currentZoom * Math.pow(2, pinchDelta)
            if (d3s) d3z.scaleTo(d3s, zoom, point)

            return
          }

          // increase scroll speed in firefox
          // firefox: deltaMode === 1; chrome: deltaMode === 0
          const deltaNormalize = event.deltaMode === 1 ? 20 : 1
          const deltaX = props.panOnScrollMode === PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize
          const deltaY = props.panOnScrollMode === PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize

          if (d3s && props.panOnScrollSpeed)
            d3z?.translateBy(
              d3s,
              -(deltaX / currentZoom) * props.panOnScrollSpeed,
              -(deltaY / currentZoom) * props.panOnScrollSpeed,
            )
        })
        .on('wheel.zoom', null)
    } else if (typeof d3ZoomHandler !== 'undefined') {
      d3s?.on('wheel', null).on('wheel.zoom', d3ZoomHandler)
    }
  })

  const keyPress = useKeyPress(props.selectionKeyCode)
  d3z.filter((event: MouseEvent) => {
    const pinchZoom = props.zoomOnPinch && event.ctrlKey

    // if all interactions are disabled, we prevent all zoom events
    if (!props.paneMoveable && !props.zoomOnScroll && !props.panOnScroll && !props.zoomOnDoubleClick && !props.zoomOnPinch)
      return false

    // during a selection we prevent all other interactions
    if (keyPress.value) return false

    // if zoom on double click is disabled, we prevent the double click event
    if (!props.zoomOnDoubleClick && event.type === 'dblclick') return false

    if ((event.target as Element).closest('.nowheel') && event.type === 'wheel') return false

    // when the target element is a node, we still allow zooming
    if (
      ((event.target as Element).closest('.vue-flow__node') || (event.target as Element).closest('.vue-flow__edge')) &&
      event.type !== 'wheel'
    )
      return false

    // when the target element is a node selection, we still allow zooming
    if ((event.target as Element).closest('.vue-flow__nodesselection') && event.type !== 'wheel') return false

    if (!props.zoomOnPinch && event.ctrlKey && event.type === 'wheel') return false

    // when there is no scroll handling enabled, we prevent all wheel events
    if (!props.zoomOnScroll && !props.panOnScroll && !pinchZoom && event.type === 'wheel') return false

    // if the pane is not movable, we prevent dragging it with mousestart or touchstart
    if (!props.paneMoveable && (event.type === 'mousedown' || event.type === 'touchstart')) return false

    // default filter for d3-zoom
    return (!event.ctrlKey || event.type === 'wheel') && !event.button
  })
})

const { width, height } = useElementBounding(zoomPaneEl)
store.dimensions = {
  width: width.value,
  height: height.value,
}

watch([width, height], ([newWidth, newHeight]) => {
  store.dimensions.width = newWidth
  store.dimensions.height = newHeight
})
watch(transform, (val) => (store.transform = [val.x, val.y, val.zoom]))

const { zoomIn, zoomOut, zoomTo, transform: setTransform, fitView } = useZoomPanHelper()
watchOnce(
  () => !isNaN(width.value) && width.value > 0 && !isNaN(height.value) && height.value > 0,
  () => {
    hooks.load.trigger({
      fitView: (params = { padding: 0.1 }) => fitView(params),
      zoomIn,
      zoomOut,
      zoomTo,
      setTransform,
      project: onLoadProject(store),
      getElements: onLoadGetElements(store),
      toObject: onLoadToObject(store),
    })
  },
)
</script>
<template>
  <Suspense>
    <div ref="zoomPane" class="vue-flow__renderer vue-flow__zoompane">
      <slot v-bind="{ transform, dimensions: { width, height } }"></slot>
    </div>
  </Suspense>
</template>
