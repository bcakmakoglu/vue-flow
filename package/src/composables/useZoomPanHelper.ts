import { zoomIdentity } from 'd3-zoom'
import useVueFlow from './useVueFlow'
import useWindow from './useWindow'
import { getRectOfNodes, pointToRendererPoint, getTransformForBounds } from '~/utils'
import { GraphNode, Store, ViewportFuncs, D3Selection } from '~/types'

const DEFAULT_PADDING = 0.1

const transition = (selection: D3Selection, ms = 0) => selection.transition().duration(ms)

export default (store: Store = useVueFlow().store): ViewportFuncs => ({
  zoomIn: (options) => store.d3Selection && store.d3Zoom?.scaleBy(transition(store.d3Selection, options?.duration), 1.2),
  zoomOut: (options) => store.d3Selection && store.d3Zoom?.scaleBy(transition(store.d3Selection, options?.duration), 1 / 1.2),
  zoomTo: (zoomLevel, options) =>
    store.d3Selection && store.d3Zoom?.scaleTo(transition(store.d3Selection, options?.duration), zoomLevel),
  setTransform: (transform, options) => {
    const nextTransform = zoomIdentity.translate(transform.x, transform.y).scale(transform.zoom)
    store.d3Selection && store.d3Zoom?.transform(transition(store.d3Selection, options?.duration), nextTransform)
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
    // if ssr we can't wait for dimensions, they'll never really exist
    const window = useWindow()
    if ('screen' in window)
      await until(store.dimensions).toMatch(({ height, width }) => !isNaN(width) && width > 0 && !isNaN(height) && height > 0)

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
    const transform = zoomIdentity.translate(x, y).scale(zoom)

    store.d3Selection && store.d3Zoom?.transform(transition(store.d3Selection, options?.duration), transform)
  },
  setCenter: (x, y, options) => {
    const nextZoom = typeof options?.zoom !== 'undefined' ? options.zoom : store.maxZoom
    const centerX = store.dimensions.width / 2 - x * nextZoom
    const centerY = store.dimensions.height / 2 - y * nextZoom
    const transform = zoomIdentity.translate(centerX, centerY).scale(nextZoom)

    store.d3Selection && store.d3Zoom?.transform(transition(store.d3Selection, options?.duration), transform)
  },
  fitBounds: (bounds, options = { padding: DEFAULT_PADDING }) => {
    const { x, y, zoom } = getTransformForBounds(
      bounds,
      store.dimensions.width,
      store.dimensions.height,
      store.minZoom,
      store.maxZoom,
      options.padding,
    )
    const transform = zoomIdentity.translate(x, y).scale(zoom)

    store.d3Selection && store.d3Zoom?.transform(transition(store.d3Selection, options.duration), transform)
  },
  project: (position) => pointToRendererPoint(position, store.viewport, store.snapToGrid, store.snapGrid),
})
