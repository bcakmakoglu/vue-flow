import { zoomIdentity } from 'd3-zoom'
import useVueFlow from './useVueFlow'
import useWindow from './useWindow'
import { clampPosition, getRectOfNodes, getTransformForBounds, pointToRendererPoint } from '~/utils'
import type { D3Selection, Dimensions, Getters, GraphNode, ViewportFunctions } from '~/types'

const DEFAULT_PADDING = 0.1

const transition = (selection: D3Selection, ms = 0) => selection.transition().duration(ms)

const untilDimensions = async (dimensions: Dimensions, getNodes: Getters['getNodes']) => {
  // if ssr we can't wait for dimensions, they'll never really exist
  const window = useWindow()
  if ('screen' in window) {
    // wait until viewport dimensions has been established
    await until(dimensions).toMatch(({ height, width }) => !isNaN(width) && width > 0 && !isNaN(height) && height > 0)

    // if initial nodes are present, wait until the node dimensions have been established
    if (getNodes.length > 0) {
      await until(getNodes).toMatch(
        (nodes) =>
          !!nodes.filter(({ dimensions: { width, height } }) => !isNaN(width) && width > 0 && !isNaN(height) && height > 0)
            .length,
      )
    }
  }

  return true
}

/**
 * @deprecated use {@link useVueFlow} instead (all viewport functions are also available in {@link useVueFlow})
 */
export default (vueFlowId?: string): ViewportFunctions => {
  const {
    onPaneReady,
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
  } = $(useVueFlow({ id: vueFlowId }))

  let hasDimensions = $ref(false)

  onPaneReady(() => (hasDimensions = true))

  const zoomTo: ViewportFunctions['zoomTo'] = async (zoomLevel, options) => {
    if (!hasDimensions) await untilDimensions(dimensions, getNodes)

    if (d3Selection && d3Zoom) {
      d3Zoom.scaleTo(transition(d3Selection, options?.duration), zoomLevel)
    }
  }

  const zoom = async (scale: number, duration?: number) => {
    if (!hasDimensions) await untilDimensions(dimensions, getNodes)

    if (d3Selection && d3Zoom) {
      d3Zoom.scaleBy(transition(d3Selection, duration), scale)
    }
  }

  const zoomIn: ViewportFunctions['zoomIn'] = async (options) => {
    await zoom(1.2, options?.duration)
  }

  const zoomOut: ViewportFunctions['zoomOut'] = async (options) => {
    await zoom(1 / 1.2, options?.duration)
  }

  const transformViewport = (x: number, y: number, zoom: number, duration?: number) => {
    // enforce translate extent
    const { x: clampedX, y: clampedY } = clampPosition({ x: -x, y: -y }, translateExtent)

    const nextTransform = zoomIdentity.translate(-clampedX, -clampedY).scale(zoom)

    if (d3Selection && d3Zoom) {
      d3Zoom.transform(transition(d3Selection, duration), nextTransform)
    }
  }

  return {
    zoomIn,
    zoomOut,
    zoomTo,
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

      if (!getNodes.length) return

      let nodeBounds: GraphNode[] = []
      if (options.nodes) {
        nodeBounds = nodes.filter((n) => options.nodes?.includes(n.id))
      }

      if (!nodeBounds || !nodeBounds.length) {
        nodeBounds = options.includeHiddenNodes ? nodeBounds : getNodes
      }

      const bounds = getRectOfNodes(nodeBounds)

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
}
