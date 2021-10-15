import { D3ZoomEvent, zoom, zoomIdentity, ZoomTransform } from 'd3-zoom'
import { pointer, select } from 'd3-selection'
import { Ref } from 'vue'
import { FlowTransform, PanOnScrollMode, RevueFlowOptions } from '~/types'
import { RevueFlowHooks } from '~/hooks/RevueFlowHooks'
import { clamp } from '~/utils'
import useKeyPress from '~/hooks/useKeyPress'
import useZoomPanHelper from '~/hooks/useZoomPanHelper'
import { onLoadGetElements, onLoadProject, onLoadToObject } from '~/utils/graph'

const viewChanged = (prevTransform: FlowTransform, eventTransform: ZoomTransform): boolean =>
  prevTransform.x !== eventTransform.x || prevTransform.y !== eventTransform.y || prevTransform.zoom !== eventTransform.k

const eventToFlowTransform = (eventTransform: ZoomTransform): FlowTransform => ({
  x: eventTransform.x,
  y: eventTransform.y,
  zoom: eventTransform.k,
})

type UseZoomOptions = RevueFlowOptions

const useZoom = (zoomPane: Ref<HTMLDivElement>, options: UseZoomOptions) => {
  const {
    selectionKeyCode = 'Shift',
    zoomActivationKeyCode = 'Meta',
    minZoom = 0.5,
    maxZoom = 2,
    defaultZoom = 1,
    defaultPosition = [0, 0],
    translateExtent = [
      [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
    ],
    zoomOnScroll = true,
    zoomOnPinch = true,
    zoomOnDoubleClick = true,
    panOnScroll = false,
    panOnScrollSpeed = 0.5,
    panOnScrollMode = PanOnScrollMode.Free,
    paneMoveable = true,
  } = options
  const hooks = inject<RevueFlowHooks>('hooks')!
  const prevTransform = ref<FlowTransform>({ x: 0, y: 0, zoom: 0 })

  const clampedX = clamp(defaultPosition[0], translateExtent[0][0], translateExtent[1][0])
  const clampedY = clamp(defaultPosition[1], translateExtent[0][1], translateExtent[1][1])
  const clampedZoom = clamp(defaultZoom, minZoom, maxZoom)
  const transform = ref([clampedX, clampedY, clampedZoom])

  until(zoomPane)
    .toBeTruthy()
    .then(() => {
      const d3Zoom = zoom().scaleExtent([minZoom, maxZoom]).translateExtent(translateExtent)
      const d3Selection = select(unrefElement(zoomPane) as Element).call(d3Zoom)
      const d3ZoomHandler = d3Selection.on('wheel.zoom')

      const updatedTransform = zoomIdentity.translate(clampedX, clampedY).scale(clampedZoom)

      const { fitView, zoomIn, zoomOut, zoomTo } = useZoomPanHelper({ ...options, d3Zoom, d3Selection } as any)
      hooks.load.trigger({
        fitView: (params = { padding: 0.1 }) => fitView(params),
        zoomIn,
        zoomOut,
        zoomTo,
        setTransform: transform,
      } as any)
      d3Zoom.transform(d3Selection, updatedTransform)

      const applyZoomHandlers = () => {
        d3Zoom.on('start', (event: D3ZoomEvent<HTMLDivElement, any>) => {
          if (viewChanged(prevTransform.value, event.transform)) {
            const flowTransform = eventToFlowTransform(event.transform)
            prevTransform.value = flowTransform

            hooks.moveStart.trigger(flowTransform)
          }
        })

        d3Zoom.on('end', (event: D3ZoomEvent<HTMLDivElement, any>) => {
          if (viewChanged(prevTransform.value, event.transform)) {
            const flowTransform = eventToFlowTransform(event.transform)
            prevTransform.value = flowTransform

            hooks.moveEnd.trigger(flowTransform)
          }
        })

        useKeyPress(selectionKeyCode, (keyPress) => {
          if (keyPress) {
            d3Zoom.on('zoom', null)
          } else {
            d3Zoom.on('zoom', (event: D3ZoomEvent<HTMLDivElement, any>) => {
              transform.value = [event.transform.x, event.transform.y, event.transform.k]
              hooks.move.trigger(eventToFlowTransform(event.transform))
            })
          }
        })

        useKeyPress(zoomActivationKeyCode, (keyPress) => {
          if (panOnScroll && keyPress) {
            d3Selection
              ?.on('wheel', (event: WheelEvent) => {
                event.preventDefault()
                event.stopImmediatePropagation()

                const currentZoom = d3Selection?.property('__zoom').k || 1

                if (event.ctrlKey && zoomOnPinch) {
                  const point = pointer(event)
                  // taken from https://github.com/d3/d3-zoom/blob/master/src/zoom.js
                  const pinchDelta = -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * 10
                  const zoom = currentZoom * Math.pow(2, pinchDelta)
                  if (d3Selection) d3Zoom?.scaleTo(d3Selection, zoom, point)

                  return
                }

                // increase scroll speed in firefox
                // firefox: deltaMode === 1; chrome: deltaMode === 0
                const deltaNormalize = event.deltaMode === 1 ? 20 : 1
                const deltaX = panOnScrollMode === PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize
                const deltaY = panOnScrollMode === PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize

                if (d3Selection && panOnScrollSpeed)
                  d3Zoom?.translateBy(
                    d3Selection,
                    -(deltaX / currentZoom) * panOnScrollSpeed,
                    -(deltaY / currentZoom) * panOnScrollSpeed,
                  )
              })
              .on('wheel.zoom', null)
          } else if (typeof d3ZoomHandler !== 'undefined') {
            d3Selection?.on('wheel', null).on('wheel.zoom', d3ZoomHandler)
          }
        })
      }

      const applyZoomFilter = () => {
        const keyPress = useKeyPress(selectionKeyCode)
        d3Zoom.filter((event: MouseEvent) => {
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

  return {
    transform,
  }
}

export default useZoom
