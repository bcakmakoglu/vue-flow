import { zoomIdentity } from 'd3-zoom'
import { computed } from 'vue'
import type { ComputedGetters, D3Selection, GraphNode, State, ViewportFunctions } from '~/types'
import { clampPosition, getRectOfNodes, getTransformForBounds, pointToRendererPoint } from '~/utils'

interface ExtendedViewport extends ViewportFunctions {
  initialized: boolean
}

const DEFAULT_PADDING = 0.1

function noop() {
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
  setTransform: noop,
  getTransform: () => ({ x: 0, y: 0, zoom: 1 }),
  initialized: false,
}

export function useViewport(state: State, getters: ComputedGetters) {
  const { nodes, d3Zoom, d3Selection, dimensions, translateExtent, minZoom, maxZoom, viewport, snapToGrid, snapGrid } = $(state)

  const { getNodes, getNodesInitialized } = getters

  const isReady = computed(
    () =>
      !!d3Zoom &&
      !!d3Selection &&
      !!dimensions.width &&
      !!dimensions.height &&
      getNodesInitialized.value.length === getNodes.value.length,
  )

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
        setTransform: (transform, options) => {
          return transformViewport(transform.x, transform.y, transform.zoom, options?.duration)
        },
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
          if (!nodes.length) {
            return Promise.resolve(false)
          }

          const nodesToFit: GraphNode[] = (options.includeHiddenNodes ? nodes : getNodes.value).filter((node) => {
            const initialized = node.initialized && node.dimensions.width && node.dimensions.height
            let shouldInclude = true

            if (options.nodes?.length) {
              shouldInclude = options.nodes.includes(node.id)
            }

            return initialized && shouldInclude
          })

          const bounds = getRectOfNodes(nodesToFit)

          const { x, y, zoom } = getTransformForBounds(
            bounds,
            dimensions.width,
            dimensions.height,
            options.minZoom ?? minZoom,
            options.maxZoom ?? maxZoom,
            options.padding ?? DEFAULT_PADDING,
            options.offset,
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
          const { x, y, zoom } = getTransformForBounds(
            bounds,
            dimensions.width,
            dimensions.height,
            minZoom,
            maxZoom,
            options.padding,
          )

          return transformViewport(x, y, zoom, options?.duration)
        },
        project: (position) => pointToRendererPoint(position, viewport, snapToGrid, snapGrid),
      }
    }

    return initialViewportHelper
  })
}

function transition(selection: D3Selection, ms = 0, onEnd: () => void) {
  return selection.transition().duration(ms).on('end', onEnd)
}
