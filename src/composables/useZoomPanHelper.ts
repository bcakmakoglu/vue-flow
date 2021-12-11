import { zoomIdentity } from 'd3-zoom'
import useStore from './useStore'
import { getRectOfNodes, pointToRendererPoint, getTransformForBounds } from '~/utils'
import { FitViewParams, FlowTransform, GraphNode, FlowStore, Rect, UseZoomPanHelper, XYPosition } from '~/types'

const DEFAULT_PADDING = 0.1

export default (store: FlowStore = useStore()): UseZoomPanHelper => {
  return {
    zoomIn: () => store.d3Selection && store.d3Zoom?.scaleBy(store.d3Selection, 1.2),
    zoomOut: () => store.d3Selection && store.d3Zoom?.scaleBy(store.d3Selection, 1 / 1.2),
    zoomTo: (zoomLevel: number) => store.d3Selection && store.d3Zoom?.scaleTo(store.d3Selection, zoomLevel),
    transform: (transform: FlowTransform) => {
      const nextTransform = zoomIdentity.translate(transform.x, transform.y).scale(transform.zoom)
      store.d3Selection && store.d3Zoom?.transform(store.d3Selection, nextTransform)
    },
    fitView: (
      options: FitViewParams = {
        padding: DEFAULT_PADDING,
        includeHiddenNodes: false,
        transitionDuration: 0,
      },
    ) => {
      if (!store.getNodes.length) return

      let nodes: GraphNode[] = []
      if (options.nodes) {
        nodes = store.nodes.filter((n) => options.nodes?.includes(n.id))
      }
      if (!nodes || !nodes.length) {
        nodes = options.includeHiddenNodes ? store.nodes : store.getNodes
      }
      const bounds = getRectOfNodes(nodes)
      const [x, y, zoom] = getTransformForBounds(
        bounds,
        store.dimensions.width,
        store.dimensions.height,
        options.minZoom ?? store.minZoom,
        options.maxZoom ?? store.maxZoom,
        options.padding ?? DEFAULT_PADDING,
        options.offset,
      )
      const transform = zoomIdentity.translate(x, y).scale(zoom)

      store.d3Selection &&
        store.d3Zoom?.transform(
          options.transitionDuration
            ? store.d3Selection.selection().transition().duration(options.transitionDuration)
            : store.d3Selection,
          transform,
        )
    },
    setCenter: (x: number, y: number, zoom?: number) => {
      const nextZoom = typeof zoom !== 'undefined' ? zoom : store.maxZoom
      const centerX = store.dimensions.width / 2 - x * nextZoom
      const centerY = store.dimensions.height / 2 - y * nextZoom
      const transform = zoomIdentity.translate(centerX, centerY).scale(nextZoom)

      store.d3Selection && store.d3Zoom?.transform(store.d3Selection, transform)
    },
    fitBounds: (bounds: Rect, padding = DEFAULT_PADDING) => {
      const [x, y, zoom] = getTransformForBounds(
        bounds,
        store.dimensions.width,
        store.dimensions.height,
        store.minZoom,
        store.maxZoom,
        padding,
      )
      const transform = zoomIdentity.translate(x, y).scale(zoom)

      store.d3Selection && store.d3Zoom?.transform(store.d3Selection, transform)
    },
    project: (position: XYPosition) => pointToRendererPoint(position, store.transform, store.snapToGrid, store.snapGrid),
  }
}
