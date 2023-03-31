import { zoomIdentity } from 'd3-zoom'
import type { ComputedGetters, D3Selection, GraphNode, State, ViewportFunctions } from '~/types'

interface ExtendedViewport extends ViewportFunctions {
  initialized: boolean
}

const DEFAULT_PADDING = 0.1

function noop() {}

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

export default (state: State, getters: ComputedGetters) => {
  const { nodes, d3Zoom, d3Selection, dimensions, translateExtent, minZoom, maxZoom, viewport, snapToGrid, snapGrid, hooks } =
    $(state)

  const { getNodes } = $(getters)

  const nodesInitialized = ref(false)

  hooks.nodesInitialized.on(() => {
    nodesInitialized.value = true
  })

  const isReady = computed(() => !!d3Zoom && !!d3Selection && !!dimensions.width && !!dimensions.height && nodesInitialized.value)

  function zoom(scale: number, duration?: number) {
    if (d3Selection && d3Zoom) {
      d3Zoom.scaleBy(transition(d3Selection, duration), scale)
    }
  }

  function transformViewport(x: number, y: number, zoom: number, duration?: number) {
    // enforce translate extent
    const { x: clampedX, y: clampedY } = clampPosition({ x: -x, y: -y }, translateExtent)

    const nextTransform = zoomIdentity.translate(-clampedX, -clampedY).scale(zoom)

    if (d3Selection && d3Zoom) {
      d3Zoom.transform(transition(d3Selection, duration), nextTransform)
    }
  }

  return computed<ExtendedViewport>(() => {
    if (isReady.value) {
      return {
        initialized: true,
        zoomIn: (options) => {
          zoom(1.2, options?.duration)
        },
        zoomOut: (options) => {
          zoom(1 / 1.2, options?.duration)
        },
        zoomTo: (zoomLevel, options) => {
          if (d3Selection && d3Zoom) {
            d3Zoom.scaleTo(transition(d3Selection, options?.duration), zoomLevel)
          }
        },
        setTransform: (transform, options) => {
          transformViewport(transform.x, transform.y, transform.zoom, options?.duration)
        },
        getTransform: () => ({
          x: viewport.x,
          y: viewport.y,
          zoom: viewport.zoom,
        }),
        fitView: (
          options = {
            padding: DEFAULT_PADDING,
            includeHiddenNodes: false,
            duration: 0,
          },
        ) => {
          if (!nodes.length) return

          const nodesToFit: GraphNode[] = (options.includeHiddenNodes ? nodes : getNodes).filter((node) => {
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

          transformViewport(x, y, zoom, options?.duration)
        },
        setCenter: (x, y, options) => {
          const nextZoom = typeof options?.zoom !== 'undefined' ? options.zoom : maxZoom
          const centerX = dimensions.width / 2 - x * nextZoom
          const centerY = dimensions.height / 2 - y * nextZoom

          transformViewport(centerX, centerY, nextZoom, options?.duration)
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

          transformViewport(x, y, zoom, options?.duration)
        },
        project: (position) => pointToRendererPoint(position, viewport, snapToGrid, snapGrid),
      }
    }

    return initialViewportHelper
  })
}

function transition(selection: D3Selection, ms = 0) {
  return selection.transition().duration(ms)
}
