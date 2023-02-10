import { zoomIdentity } from 'd3-zoom'
import type { ComputedGetters, D3Selection, GraphNode, State, ViewportFunctions } from '~/types'

const DEFAULT_PADDING = 0.1

export default (state: State, getters: ComputedGetters): ViewportFunctions => {
  const { nodes, d3Zoom, d3Selection, dimensions, translateExtent, minZoom, maxZoom, viewport, snapToGrid, snapGrid } = $(state)

  const { getNodes } = $(getters)

  return {
    zoomIn: async (options) => {
      await zoom(1.2, options?.duration)
    },
    zoomOut: async (options) => {
      await zoom(1 / 1.2, options?.duration)
    },
    zoomTo: async (zoomLevel, options) => {
      if (d3Selection && d3Zoom) {
        d3Zoom.scaleTo(transition(d3Selection, options?.duration), zoomLevel)
      }
    },
    setTransform: async (transform, options) => {
      transformViewport(transform.x, transform.y, transform.zoom, options?.duration)
    },
    getTransform: () => ({
      x: viewport.x,
      y: viewport.y,
      zoom: viewport.zoom,
    }),
    fitView: async (
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
    setCenter: async (x, y, options) => {
      const nextZoom = typeof options?.zoom !== 'undefined' ? options.zoom : maxZoom
      const centerX = dimensions.width / 2 - x * nextZoom
      const centerY = dimensions.height / 2 - y * nextZoom

      transformViewport(centerX, centerY, nextZoom, options?.duration)
    },
    fitBounds: async (bounds, options = { padding: DEFAULT_PADDING }) => {
      const { x, y, zoom } = getTransformForBounds(bounds, dimensions.width, dimensions.height, minZoom, maxZoom, options.padding)

      transformViewport(x, y, zoom, options?.duration)
    },
    project: (position) => pointToRendererPoint(position, viewport, snapToGrid, snapGrid),
  }

  async function zoom(scale: number, duration?: number) {
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
}

function transition(selection: D3Selection, ms = 0) {
  return selection.transition().duration(ms)
}
