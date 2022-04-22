import { zoomIdentity } from 'd3-zoom'
import useVueFlow from './useVueFlow'
import useWindow from './useWindow'
import { getRectOfNodes, pointToRendererPoint, getTransformForBounds, clampPosition } from '~/utils'
import { GraphNode, Store, ViewportFuncs, D3Selection } from '~/types'

const DEFAULT_PADDING = 0.1

const transition = (selection: D3Selection, ms = 0) => selection.transition().duration(ms)

const untilDimensions = async (store: Store) => {
  // if ssr we can't wait for dimensions, they'll never really exist
  const window = useWindow()
  if ('screen' in window) {
    // wait until viewport dimensions has been established
    await until(store.dimensions).toMatch(({ height, width }) => !isNaN(width) && width > 0 && !isNaN(height) && height > 0)

    // if initial nodes are present, wait until the node dimensions have been established
    if (store.getNodes.length > 0) {
      await until(store.getNodes).toMatch(
        (nodes) =>
          !!nodes.filter(({ dimensions: { width, height } }) => !isNaN(width) && width > 0 && !isNaN(height) && height > 0)
            .length,
      )
    }
  }

  return true
}

export default (store: Store = useVueFlow().store): ViewportFuncs => {
  const hasDimensions = ref(false)
  store.hooks.paneReady.on(() => (hasDimensions.value = true))

  const zoomTo: ViewportFuncs['zoomTo'] = async (zoomLevel, options) => {
    if (!hasDimensions.value) await untilDimensions(store)

    if (store.d3Selection && store.d3Zoom) {
      store.d3Zoom.scaleTo(transition(store.d3Selection, options?.duration), zoomLevel)
    }
  }

  const zoom = async (scale: number, duration?: number) => {
    if (!hasDimensions.value) await untilDimensions(store)

    if (store.d3Selection && store.d3Zoom) {
      store.d3Zoom.scaleBy(transition(store.d3Selection, duration), scale)
    }
  }

  const zoomIn: ViewportFuncs['zoomIn'] = async (options) => {
    await zoom(1.2, options?.duration)
  }

  const zoomOut: ViewportFuncs['zoomOut'] = async (options) => {
    await zoom(1 / 1.2, options?.duration)
  }

  const transformViewport = (x: number, y: number, zoom: number, duration?: number) => {
    // enforce translate extent
    const { x: clampedX, y: clampedY } = clampPosition({ x: -x, y: -y }, store.translateExtent)

    const nextTransform = zoomIdentity.translate(-clampedX, -clampedY).scale(zoom)

    if (store.d3Selection && store.d3Zoom) {
      store.d3Zoom.transform(transition(store.d3Selection, duration), nextTransform)
    }
  }

  return {
    zoomIn,
    zoomOut,
    zoomTo,
    setTransform: async (transform, options) => {
      if (!hasDimensions.value) await untilDimensions(store)
      transformViewport(transform.x, transform.y, transform.zoom, options?.duration)
    },
    getTransform: () => ({
      x: store.viewport.x,
      y: store.viewport.y,
      zoom: store.viewport.zoom,
    }),
    fitView: async (
      options = {
        padding: DEFAULT_PADDING,
        includeHiddenNodes: false,
        duration: 0,
      },
    ) => {
      if (!hasDimensions.value) await untilDimensions(store)

      if (!store.getNodes.length) return

      let nodes: GraphNode[] = []
      if (options.nodes) {
        nodes = store.nodes.filter((n) => options.nodes?.includes(n.id))
      }

      if (!nodes || !nodes.length) {
        nodes = options.includeHiddenNodes ? store.nodes : store.getNodes
      }

      const bounds = getRectOfNodes(nodes)

      const { x, y, zoom } = getTransformForBounds(
        bounds,
        store.dimensions.width,
        store.dimensions.height,
        options.minZoom ?? store.minZoom,
        options.maxZoom ?? store.maxZoom,
        options.padding ?? DEFAULT_PADDING,
        options.offset,
      )

      transformViewport(x, y, zoom, options?.duration)
    },
    setCenter: async (x, y, options) => {
      if (!hasDimensions.value) await untilDimensions(store)

      const nextZoom = typeof options?.zoom !== 'undefined' ? options.zoom : store.maxZoom
      const centerX = store.dimensions.width / 2 - x * nextZoom
      const centerY = store.dimensions.height / 2 - y * nextZoom

      transformViewport(centerX, centerY, nextZoom, options?.duration)
    },
    fitBounds: async (bounds, options = { padding: DEFAULT_PADDING }) => {
      if (!hasDimensions.value) await untilDimensions(store)

      const { x, y, zoom } = getTransformForBounds(
        bounds,
        store.dimensions.width,
        store.dimensions.height,
        store.minZoom,
        store.maxZoom,
        options.padding,
      )

      transformViewport(x, y, zoom, options?.duration)
    },
    project: (position) => pointToRendererPoint(position, store.viewport, store.snapToGrid, store.snapGrid),
  }
}
