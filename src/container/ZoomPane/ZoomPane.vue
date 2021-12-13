<script lang="ts" setup>
import { D3ZoomEvent, zoom, zoomIdentity, ZoomTransform } from 'd3-zoom'
import { pointer, select } from 'd3-selection'
import { FlowInstance, FlowTransform, PanOnScrollMode } from '../../types'
import { useKeyPress, useWindow, useZoomPanHelper, useVueFlow } from '../../composables'
import {
  clamp,
  clampPosition,
  onLoadGetEdges,
  onLoadGetElements,
  onLoadGetNodes,
  onLoadProject,
  onLoadToObject,
} from '../../utils'
import SelectionPane from '../SelectionPane/SelectionPane.vue'
import TransformationPane from '../TransformationPane/TransformationPane.vue'

const { id, store } = useVueFlow()
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

const noWheel = (event: Event) => (event.target as Element).closest('.nowheel')

const clampedZoom = clamp(store.defaultZoom, store.minZoom, store.maxZoom)
const transform = ref({
  ...clampPosition({ x: store.defaultPosition[0], y: store.defaultPosition[1] }, store.translateExtent),
  zoom: clampedZoom,
})
const d3Zoom = ref(zoom<HTMLDivElement, any>().scaleExtent([store.minZoom, store.maxZoom]).translateExtent(store.translateExtent))
const d3Selection = ref()

store.transform = [transform.value.x, transform.value.y, transform.value.zoom]
const { width, height } = useElementBounding(zoomPaneEl)

onMounted(() => {
  const d3z = d3Zoom.value!
  d3Selection.value = select(zoomPaneEl.value).call(d3z)
  const d3s = d3Selection.value!
  const d3ZoomHandler = d3s.on('wheel.zoom')

  const updatedTransform = zoomIdentity.translate(transform.value.x, transform.value.y).scale(transform.value.zoom)
  d3z.transform(d3s, updatedTransform)
  store.d3Zoom = d3z
  store.d3Selection = d3s
  store.d3ZoomHandler = d3ZoomHandler
  store.transform = [updatedTransform.x, updatedTransform.y, updatedTransform.k]

  d3z.on('start', (event: D3ZoomEvent<HTMLDivElement, any>) => {
    if (viewChanged(transform.value, event.transform)) {
      const flowTransform = eventToFlowTransform(event.transform)
      transform.value = flowTransform
      store.hooks.moveStart.trigger(flowTransform)
    }
  })

  d3z.on('end', (event: D3ZoomEvent<HTMLDivElement, any>) => {
    if (viewChanged(transform.value, event.transform)) {
      const flowTransform = eventToFlowTransform(event.transform)
      transform.value = flowTransform
      store.hooks.moveEnd.trigger(flowTransform)
    }
  })

  useKeyPress(store.selectionKeyCode, (keyPress) => {
    if (keyPress) {
      d3z.on('zoom', null)
    } else {
      d3z.on('zoom', (event: D3ZoomEvent<HTMLDivElement, any>) => {
        if (viewChanged(transform.value, event.transform)) {
          const flowTransform = eventToFlowTransform(event.transform)
          transform.value = flowTransform
          store.hooks.move.trigger(flowTransform)
        }
      })
    }
  })

  useKeyPress(store.zoomActivationKeyCode, (keyPress) => {
    if (store.panOnScroll && keyPress) {
      d3s
        ?.on('wheel', (event: WheelEvent) => {
          if (noWheel(event)) return
          event.preventDefault()
          event.stopImmediatePropagation()

          const currentZoom = d3s?.property('__zoom').k || 1

          if (event.ctrlKey && store.zoomOnPinch) {
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
          const deltaX = store.panOnScrollMode === PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize
          const deltaY = store.panOnScrollMode === PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize

          if (d3s && store.panOnScrollSpeed)
            d3z?.translateBy(
              d3s,
              -(deltaX / currentZoom) * store.panOnScrollSpeed,
              -(deltaY / currentZoom) * store.panOnScrollSpeed,
            )
        })
        .on('wheel.zoom', null)
    } else if (typeof d3ZoomHandler !== 'undefined') {
      d3s
        ?.on('wheel', (event: WheelEvent) => {
          if ((!store.zoomOnScroll && store.preventScrolling) || !store.preventScrolling || noWheel(event)) return
          event.preventDefault()
        })
        .on('wheel.zoom', d3ZoomHandler)
    }
  })

  const keyPress = useKeyPress(store.selectionKeyCode)
  d3z.filter((event: MouseEvent) => {
    const pinchZoom = store.zoomOnPinch && event.ctrlKey

    // if all interactions are disabled, we prevent all zoom events
    if (!store.paneMoveable && !store.zoomOnScroll && !store.panOnScroll && !store.zoomOnDoubleClick && !store.zoomOnPinch)
      return false

    // during a selection we prevent all other interactions
    if (keyPress.value) return false

    // if zoom on double click is disabled, we prevent the double click event
    if (!store.zoomOnDoubleClick && event.type === 'dblclick') return false

    if (noWheel(event) && event.type === 'wheel') return false

    // when the target element is a node, we still allow zooming
    if (
      ((event.target as Element).closest('.vue-flow__node') || (event.target as Element).closest('.vue-flow__edge')) &&
      event.type !== 'wheel'
    )
      return false

    // when the target element is a node selection, we still allow zooming
    if ((event.target as Element).closest('.vue-flow__nodesselection') && event.type !== 'wheel') return false

    if (!store.zoomOnPinch && event.ctrlKey && event.type === 'wheel') return false

    // when there is no scroll handling enabled, we prevent all wheel events
    if (!store.zoomOnScroll && !store.panOnScroll && !pinchZoom && event.type === 'wheel') return false

    // if the pane is not movable, we prevent dragging it with mousestart or touchstart
    if (!store.paneMoveable && (event.type === 'mousedown' || event.type === 'touchstart')) return false

    // default filter for d3-zoom
    return (!event.ctrlKey || event.type === 'wheel') && !event.button
  })

  watch(
    [width, height],
    ([newWidth, newHeight]) => {
      nextTick(() => {
        store.dimensions.width = newWidth
        store.dimensions.height = newHeight
      })
    },
    { flush: 'post', immediate: true },
  )
  watch(
    transform,
    (val) => {
      const { x, y } = clampPosition(val, store.translateExtent)
      nextTick(() => (store.transform = [x, y, clamp(val.zoom, store.minZoom, store.maxZoom)]))
    },
    { flush: 'post', immediate: true },
  )
})
nextTick(async () => {
  store.paneReady = true

  // if ssr we can't wait for dimensions, they'll never really exist
  const window = useWindow()
  if ('screen' in window)
    await until(store.dimensions).toMatch(({ height, width }) => !isNaN(width) && width > 0 && !isNaN(height) && height > 0)

  const { zoomIn, zoomOut, zoomTo, setTransform, getTransform, fitView, fitBounds, setCenter } = useZoomPanHelper(store)
  const instance: FlowInstance = {
    fitView: (params = { padding: 0.1 }) => fitView(params),
    zoomIn,
    zoomOut,
    zoomTo,
    setTransform,
    getTransform,
    setCenter,
    fitBounds,
    project: onLoadProject(store),
    getElements: onLoadGetElements(store),
    getNodes: onLoadGetNodes(store),
    getEdges: onLoadGetEdges(store),
    toObject: onLoadToObject(store),
  }
  store.hooks.paneReady.trigger(instance)
  store.instance = instance
  store.fitViewOnInit && instance.fitView()
})
</script>
<script lang="ts">
export default {
  name: 'ZoomPane',
}
</script>
<template>
  <div ref="zoomPane" class="vue-flow__renderer vue-flow__container">
    <TransformationPane>
      <template
        v-for="nodeName of Object.keys(store.getNodeTypes)"
        #[`node-${nodeName}`]="nodeProps"
        :key="`node-${nodeName}-${id}`"
      >
        <slot :name="`node-${nodeName}`" v-bind="nodeProps" />
      </template>
      <template
        v-for="edgeName of Object.keys(store.getEdgeTypes)"
        #[`edge-${edgeName}`]="edgeProps"
        :key="`edge-${edgeName}-${id}`"
      >
        <slot :name="`edge-${edgeName}`" v-bind="edgeProps" />
      </template>
      <template #connection-line="customConnectionLineProps">
        <slot name="connection-line" v-bind="customConnectionLineProps" />
      </template>
    </TransformationPane>
    <SelectionPane :key="`selection-pane-${id}`" />
  </div>
</template>
