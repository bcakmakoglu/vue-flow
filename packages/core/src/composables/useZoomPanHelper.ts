import { zoomIdentity } from 'd3-zoom'
import type { D3Selection, GraphNode, ViewportFunctions } from '~/types'

const DEFAULT_PADDING = 0.1

/**
 * @deprecated use {@link useVueFlow} instead (all viewport functions are also available in {@link useVueFlow})
 */
export default (vueFlowId?: string): ViewportFunctions => {
  const { nodes, d3Zoom, d3Selection, dimensions, translateExtent, minZoom, maxZoom, viewport, snapToGrid, snapGrid, getNodes } =
    useVueFlow({ id: vueFlowId })

  return {
    zoomIn: (options) => {
      zoom(1.2, options?.duration)
    },
    zoomOut: (options) => {
      zoom(1 / 1.2, options?.duration)
    },
    zoomTo: (zoomLevel, options) => {
      if (d3Selection.value && d3Zoom.value) {
        d3Zoom.value.scaleTo(transition(d3Selection.value, options?.duration), zoomLevel)
      }
    },
    setTransform: (transform, options) => {
      transformViewport(transform.x, transform.y, transform.zoom, options?.duration)
    },
    getTransform: () => ({
      x: viewport.value.x,
      y: viewport.value.y,
      zoom: viewport.value.zoom,
    }),
    fitView: (
      options = {
        padding: DEFAULT_PADDING,
        includeHiddenNodes: false,
        duration: 0,
      },
    ) => {
      if (!nodes.value.length) return

      const nodesToFit: GraphNode[] = (options.includeHiddenNodes ? nodes.value : getNodes.value).filter((node) => {
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
        dimensions.value.width,
        dimensions.value.height,
        options.minZoom ?? minZoom.value,
        options.maxZoom ?? maxZoom.value,
        options.padding ?? DEFAULT_PADDING,
        options.offset,
      )

      transformViewport(x, y, zoom, options?.duration)
    },
    setCenter: (x, y, options) => {
      const nextZoom = typeof options?.zoom !== 'undefined' ? options.zoom : maxZoom.value
      const centerX = dimensions.value.width / 2 - x * nextZoom
      const centerY = dimensions.value.height / 2 - y * nextZoom

      transformViewport(centerX, centerY, nextZoom, options?.duration)
    },
    fitBounds: (bounds, options = { padding: DEFAULT_PADDING }) => {
      const { x, y, zoom } = getTransformForBounds(
        bounds,
        dimensions.value.width,
        dimensions.value.height,
        minZoom.value,
        maxZoom.value,
        options.padding,
      )

      transformViewport(x, y, zoom, options?.duration)
    },
    project: (position) => pointToRendererPoint(position, viewport.value, snapToGrid.value, snapGrid.value),
  }

  function zoom(scale: number, duration?: number) {
    if (d3Selection.value && d3Zoom.value) {
      d3Zoom.value.scaleBy(transition(d3Selection.value, duration), scale)
    }
  }

  function transformViewport(x: number, y: number, zoom: number, duration?: number) {
    // enforce translate extent
    const { x: clampedX, y: clampedY } = clampPosition({ x: -x, y: -y }, translateExtent.value)

    const nextTransform = zoomIdentity.translate(-clampedX, -clampedY).scale(zoom)

    if (d3Selection.value && d3Zoom.value) {
      d3Zoom.value.transform(transition(d3Selection.value, duration), nextTransform)
    }
  }
}

function transition(selection: D3Selection, ms = 0) {
  return selection.transition().duration(ms)
}
