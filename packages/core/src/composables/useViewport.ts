import { until } from '@vueuse/core'
import { zoomIdentity } from 'd3-zoom'
import { computed, ref } from 'vue'
import type { NodeBase } from '@xyflow/system'
import { clampPosition, getRectOfNodes, getTransformForBounds, pointToRendererPoint, rendererPointToPoint } from '@xyflow/system'
import type { ComputedGetters, D3Selection, GraphNode, Project, State, ViewportFunctions } from '~/types'

interface ExtendedViewport extends ViewportFunctions {
  initialized: boolean
  screenToFlowCoordinate: Project
  flowToScreenCoordinate: Project
}

const DEFAULT_PADDING = 0.1

function noop() {
  warn('Viewport not initialized yet.')

  return Promise.resolve(false)
}

const initialViewportHelper: ExtendedViewport = {
  zoomIn: noop,
  zoomOut: noop,
  zoomTo: noop,
  fitView: noop,
  setCenter: noop,
  fitBounds: noop,
  project: (position) => position,
  screenToFlowCoordinate: (position) => position,
  flowToScreenCoordinate: (position) => position,
  setViewport: noop,
  setTransform: noop,
  getViewport: () => ({ x: 0, y: 0, zoom: 1 }),
  getTransform: () => ({ x: 0, y: 0, zoom: 1 }),
  initialized: false,
}

export function useViewport(state: State, getters: ComputedGetters) {
  const {
    vueFlowRef: domNode,
    nodes,
    d3Zoom,
    d3Selection,
    dimensions,
    translateExtent,
    minZoom,
    maxZoom,
    viewport,
    snapToGrid,
    snapGrid,
  } = $(state)

  const { getNodes } = getters

  const isReady = ref(false)

  until(() => !!d3Zoom && !!d3Selection && !!dimensions.width && !!dimensions.height)
    .toBe(true)
    .then(() => {
      isReady.value = true
    })

  function zoom(scale: number, duration?: number) {
    return new Promise<boolean>((resolve) => {
      if (d3Selection && d3Zoom) {
        d3Zoom.scaleBy(
          transition(d3Selection, duration, () => {
            resolve(true)
          }),
          scale,
        )
      } else {
        resolve(false)
      }
    })
  }

  function transformViewport(x: number, y: number, zoom: number, duration?: number) {
    return new Promise<boolean>((resolve) => {
      // enforce translate extent
      const { x: clampedX, y: clampedY } = clampPosition({ x: -x, y: -y }, translateExtent)

      const nextTransform = zoomIdentity.translate(-clampedX, -clampedY).scale(zoom)

      if (d3Selection && d3Zoom) {
        d3Zoom.transform(
          transition(d3Selection, duration, () => {
            resolve(true)
          }),
          nextTransform,
        )
      } else {
        resolve(false)
      }
    })
  }

  return computed<ExtendedViewport>(() => {
    if (isReady.value) {
      return {
        initialized: true,
        // todo: allow passing scale as option
        zoomIn: (options) => {
          return zoom(1.2, options?.duration)
        },
        zoomOut: (options) => {
          return zoom(1 / 1.2, options?.duration)
        },
        zoomTo: (zoomLevel, options) => {
          return new Promise<boolean>((resolve) => {
            if (d3Selection && d3Zoom) {
              d3Zoom.scaleTo(
                transition(d3Selection, options?.duration, () => {
                  resolve(true)
                }),
                zoomLevel,
              )
            } else {
              resolve(false)
            }
          })
        },
        setViewport: (transform, options) => {
          return transformViewport(transform.x, transform.y, transform.zoom, options?.duration)
        },
        setTransform: (transform, options) => {
          return transformViewport(transform.x, transform.y, transform.zoom, options?.duration)
        },
        getViewport: () => ({
          x: viewport.x,
          y: viewport.y,
          zoom: viewport.zoom,
        }),
        getTransform: () => {
          return {
            x: viewport.x,
            y: viewport.y,
            zoom: viewport.zoom,
          }
        },
        fitView: (
          options = {
            padding: DEFAULT_PADDING,
            includeHiddenNodes: false,
            duration: 0,
          },
        ) => {
          const nodesToFit: GraphNode[] = (options.includeHiddenNodes ? nodes : getNodes.value).filter((node) => {
            const initialized = node.initialized && node.dimensions.width && node.dimensions.height
            let shouldInclude = true

            if (options.nodes?.length) {
              shouldInclude = options.nodes.includes(node.id)
            }

            return initialized && shouldInclude
          })

          if (!nodesToFit.length) {
            return Promise.resolve(false)
          }

          const bounds = getRectOfNodes(nodesToFit as NodeBase[])

          const [x, y, zoom] = getTransformForBounds(
            bounds,
            dimensions.width,
            dimensions.height,
            options.minZoom ?? minZoom,
            options.maxZoom ?? maxZoom,
            options.padding ?? DEFAULT_PADDING,
          )

          return transformViewport(x, y, zoom, options?.duration)
        },
        setCenter: (x, y, options) => {
          const nextZoom = typeof options?.zoom !== 'undefined' ? options.zoom : maxZoom
          const centerX = dimensions.width / 2 - x * nextZoom
          const centerY = dimensions.height / 2 - y * nextZoom

          return transformViewport(centerX, centerY, nextZoom, options?.duration)
        },
        fitBounds: (bounds, options = { padding: DEFAULT_PADDING }) => {
          const [x, y, zoom] = getTransformForBounds(
            bounds,
            dimensions.width,
            dimensions.height,
            minZoom,
            maxZoom,
            options.padding ?? DEFAULT_PADDING,
          )

          return transformViewport(x, y, zoom, options?.duration)
        },
        project: (position) => pointToRendererPoint(position, [viewport.x, viewport.y, viewport.zoom], snapToGrid, snapGrid),
        screenToFlowCoordinate: (position) => {
          if (domNode) {
            const { x: domX, y: domY } = domNode.getBoundingClientRect()

            const correctedPosition = {
              x: position.x - domX,
              y: position.y - domY,
            }

            return pointToRendererPoint(correctedPosition, [viewport.x, viewport.y, viewport.zoom], snapToGrid, snapGrid)
          }

          return { x: 0, y: 0 }
        },
        flowToScreenCoordinate: (position) => {
          if (domNode) {
            const { x: domX, y: domY } = domNode.getBoundingClientRect()

            const correctedPosition = {
              x: position.x + domX,
              y: position.y + domY,
            }

            return rendererPointToPoint(correctedPosition, [viewport.x, viewport.y, viewport.zoom])
          }

          return { x: 0, y: 0 }
        },
      }
    }

    return initialViewportHelper
  })
}

function transition(selection: D3Selection, ms = 0, onEnd: () => void) {
  return (selection as any).transition().duration(ms).on('end', onEnd)
}
