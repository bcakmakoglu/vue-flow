import { zoomIdentity } from 'd3-zoom'
import type { D3Selection, Dimensions, GraphNode, ViewportFunctions } from '~/types'

const DEFAULT_PADDING = 0.1

/**
 * @deprecated use {@link useVueFlow} instead (all viewport functions are also available in {@link useVueFlow})
 */
export default (vueFlowId?: string): ViewportFunctions => {
  const {
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
    getNodes,
    onPaneReady,
  } = $(useVueFlow({ id: vueFlowId }))

  let hasDimensions = $ref(false)

  onPaneReady(() => (hasDimensions = true))

  return {
    zoomIn: async (options) => {
      await zoom(1.2, options?.duration)
    },
    zoomOut: async (options) => {
      await zoom(1 / 1.2, options?.duration)
    },
    zoomTo: async (zoomLevel, options) => {
      if (!hasDimensions) await untilDimensions(dimensions, getNodes)

      if (d3Selection && d3Zoom) {
        d3Zoom.scaleTo(transition(d3Selection, options?.duration), zoomLevel)
      }
    },
    setTransform: async (transform, options) => {
      if (!hasDimensions) await untilDimensions(dimensions, getNodes)
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
      if (!hasDimensions) await untilDimensions(dimensions, getNodes)

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
      if (!hasDimensions) await untilDimensions(dimensions, getNodes)

      const nextZoom = typeof options?.zoom !== 'undefined' ? options.zoom : maxZoom
      const centerX = dimensions.width / 2 - x * nextZoom
      const centerY = dimensions.height / 2 - y * nextZoom

      transformViewport(centerX, centerY, nextZoom, options?.duration)
    },
    fitBounds: async (bounds, options = { padding: DEFAULT_PADDING }) => {
      if (!hasDimensions) await untilDimensions(dimensions, getNodes)

      const { x, y, zoom } = getTransformForBounds(bounds, dimensions.width, dimensions.height, minZoom, maxZoom, options.padding)

      transformViewport(x, y, zoom, options?.duration)
    },
    project: (position) => pointToRendererPoint(position, viewport, snapToGrid, snapGrid),
  }

  async function zoom(scale: number, duration?: number) {
    if (!hasDimensions) await untilDimensions(dimensions, getNodes)

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

async function untilDimensions(dimensions: Dimensions, nodes: GraphNode[]) {
  // if ssr we can't wait for dimensions, they'll never really exist
  const window = useWindow()
  if ('screen' in window) {
    // if initial nodes are present, wait until the node dimensions have been established
    if (nodes.length > 0) {
      await until(nodes).toMatch((nodes) => !!nodes.filter((node) => node.initialized).length)
    }
  }

  return true
}
