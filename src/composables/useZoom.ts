import { D3ZoomEvent, zoom, zoomIdentity, ZoomTransform } from 'd3-zoom'
import { pointer, select } from 'd3-selection'
import { Ref } from 'vue'
import { get } from '@vueuse/core'
import { FlowTransform, PanOnScrollMode, Transform, UseZoom, UseZoomOptions } from '~/types'
import { clamp, onLoadGetElements, onLoadProject, onLoadToObject } from '~/utils'
import useKeyPress from '~/composables/useKeyPress'
import { Hooks, Store } from '~/context'
import { useZoomPanHelper } from '~/composables/index'

const viewChanged = (prevTransform: FlowTransform, eventTransform: ZoomTransform): boolean =>
  prevTransform.x !== eventTransform.x || prevTransform.y !== eventTransform.y || prevTransform.zoom !== eventTransform.k

const eventToFlowTransform = (eventTransform: ZoomTransform): FlowTransform => ({
  x: eventTransform.x,
  y: eventTransform.y,
  zoom: eventTransform.k,
})

export default function (el: Ref<HTMLDivElement>, options: UseZoomOptions): UseZoom {
  const {
    selectionKeyCode = 'Shift',
    zoomActivationKeyCode = 'Meta',
    defaultZoom = 1,
    defaultPosition = [0, 0],
    zoomOnScroll = true,
    zoomOnPinch = true,
    zoomOnDoubleClick = true,
    panOnScroll = false,
    panOnScrollSpeed = 0.5,
    panOnScrollMode = PanOnScrollMode.Free,
    paneMoveable = true,
  } = options
  const hooks = inject(Hooks)!
  const store = inject(Store)!
  const prevTransform = ref<FlowTransform>({ x: 0, y: 0, zoom: 0 })

  const clampedX = clamp(defaultPosition[0], store.translateExtent[0][0], store.translateExtent[1][0])
  const clampedY = clamp(defaultPosition[1], store.translateExtent[0][1], store.translateExtent[1][1])
  const clampedZoom = clamp(defaultZoom, store.minZoom, store.maxZoom)
  const transform = controlledRef<Transform>([clampedX, clampedY, clampedZoom], {
    onBeforeChange(val, oldVal) {
      if (val === oldVal) return false
    },
  })
  store.transform = transform.value
  const d3Zoom = ref(
    zoom<HTMLDivElement, any>().scaleExtent([store.minZoom, store.maxZoom]).translateExtent(store.translateExtent),
  )
  const d3Selection = ref()

  until(el)
    .toBeTruthy()
    .then(() => {
      const d3z = get(d3Zoom)!
      d3Selection.value = select(el.value).call(d3z)
      const d3s = get(d3Selection)!
      const d3ZoomHandler = d3s.on('wheel.zoom')

      const updatedTransform = zoomIdentity.translate(clampedX, clampedY).scale(clampedZoom)
      d3z.transform(d3s, updatedTransform)
      store.initD3Zoom({ d3Zoom: d3z, d3Selection: d3s, d3ZoomHandler })
      const { zoomIn, zoomOut, zoomTo, transform: setTransform, fitView } = useZoomPanHelper(store)
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

      const applyZoomHandlers = () => {
        d3z.on('start', (event: D3ZoomEvent<HTMLDivElement, any>) => {
          if (viewChanged(prevTransform.value, event.transform)) {
            const flowTransform = eventToFlowTransform(event.transform)
            prevTransform.value = flowTransform

            hooks.moveStart.trigger(flowTransform)
          }
        })

        d3z.on('end', (event: D3ZoomEvent<HTMLDivElement, any>) => {
          if (viewChanged(prevTransform.value, event.transform)) {
            const flowTransform = eventToFlowTransform(event.transform)
            prevTransform.value = flowTransform

            hooks.moveEnd.trigger(flowTransform)
          }
        })

        useKeyPress(selectionKeyCode, (keyPress) => {
          if (keyPress) {
            d3z.on('zoom', null)
          } else {
            d3z.on('zoom', (event: D3ZoomEvent<HTMLDivElement, any>) => {
              transform.value = [
                clamp(event.transform.x, store.translateExtent[0][0], store.translateExtent[1][0]),
                clamp(event.transform.y, store.translateExtent[0][1], store.translateExtent[1][1]),
                clamp(event.transform.k, store.minZoom, store.maxZoom),
              ]
              hooks.move.trigger(eventToFlowTransform(event.transform))
            })
          }
        })

        useKeyPress(zoomActivationKeyCode, (keyPress) => {
          if (panOnScroll && keyPress) {
            d3s
              ?.on('wheel', (event: WheelEvent) => {
                event.preventDefault()
                event.stopImmediatePropagation()

                const currentZoom = d3s?.property('__zoom').k || 1

                if (event.ctrlKey && zoomOnPinch) {
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
                const deltaX = panOnScrollMode === PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize
                const deltaY = panOnScrollMode === PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize

                if (d3s && panOnScrollSpeed)
                  d3z?.translateBy(d3s, -(deltaX / currentZoom) * panOnScrollSpeed, -(deltaY / currentZoom) * panOnScrollSpeed)
              })
              .on('wheel.zoom', null)
          } else if (typeof d3ZoomHandler !== 'undefined') {
            d3s?.on('wheel', null).on('wheel.zoom', d3ZoomHandler)
          }
        })
      }

      const applyZoomFilter = () => {
        const keyPress = useKeyPress(selectionKeyCode)
        d3z.filter((event: MouseEvent) => {
          const zoomScroll = zoomOnScroll
          const pinchZoom = zoomOnPinch && event.ctrlKey

          // if all interactions are disabled, we prevent all zoom events
          if (!paneMoveable && !zoomScroll && !panOnScroll && !zoomOnDoubleClick && !zoomOnPinch) return false

          // during a selection we prevent all other interactions
          if (keyPress.value) return false

          // if zoom on double click is disabled, we prevent the double click event
          if (!zoomOnDoubleClick && event.type === 'dblclick') return false

          if ((event.target as Element).closest('.nowheel') && event.type === 'wheel') return false

          // when the target element is a node, we still allow zooming
          if (
            ((event.target as Element).closest('.revue-flow__node') || (event.target as Element).closest('.revue-flow__edge')) &&
            event.type !== 'wheel'
          )
            return false

          // when the target element is a node selection, we still allow zooming
          if ((event.target as Element).closest('.revue-flow__nodesselection') && event.type !== 'wheel') return false

          if (!zoomOnPinch && event.ctrlKey && event.type === 'wheel') return false

          // when there is no scroll handling enabled, we prevent all wheel events
          if (!zoomScroll && !panOnScroll && !pinchZoom && event.type === 'wheel') return false

          // if the pane is not movable, we prevent dragging it with mousestart or touchstart
          if (!paneMoveable && (event.type === 'mousedown' || event.type === 'touchstart')) return false

          // default filter for d3-zoom
          return (!event.ctrlKey || event.type === 'wheel') && !event.button
        })
      }

      applyZoomHandlers()
      applyZoomFilter()
    })

  return { transform, d3Zoom, d3Selection }
}
