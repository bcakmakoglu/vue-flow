import { zoomIdentity } from 'd3-zoom'
import { Selection, ZoomBehavior } from 'd3'
import { getRectOfNodes, pointToRendererPoint, getTransformForBounds } from '~/utils/graph'
import { FitViewParams, FlowTransform, ZoomPanHelperFunctions, Rect, XYPosition, Node, Transform, SnapGrid } from '~/types'

const DEFAULT_PADDING = 0.1

const useZoomPanHelper = ({
  d3Zoom,
  d3Selection,
  nodes = [],
  width = 0,
  height = 0,
  minZoom = 0.5,
  maxZoom = 2,
  transform = [0, 0, 0],
  snapToGrid = false,
  snapGrid = [15, 15],
}: {
  d3Zoom: ZoomBehavior<Element, unknown>
  d3Selection: Selection<Element, any, any, any>
  nodes: Node[]
  width: number
  height: number
  minZoom: number
  maxZoom: number
  transform: Transform
  snapToGrid: boolean
  snapGrid: SnapGrid
}): ZoomPanHelperFunctions => ({
  zoomIn: () => d3Zoom?.scaleBy(d3Selection, 1.2),
  zoomOut: () => d3Zoom?.scaleBy(d3Selection, 1 / 1.2),
  zoomTo: (zoomLevel: number) => d3Zoom.scaleTo(d3Selection, zoomLevel),
  transform: (transform: FlowTransform) => {
    const nextTransform = zoomIdentity.translate(transform.x, transform.y).scale(transform.zoom)

    d3Zoom.transform(d3Selection, nextTransform)
  },
  fitView: (options: FitViewParams = { padding: DEFAULT_PADDING, includeHiddenNodes: false }) => {
    if (!nodes.length) {
      return
    }

    const bounds = getRectOfNodes(options.includeHiddenNodes ? nodes : nodes.filter((node) => !node.isHidden))
    const [x, y, zoom] = getTransformForBounds(
      bounds,
      width,
      height,
      options.minZoom || minZoom,
      options.maxZoom || maxZoom,
      options.padding || DEFAULT_PADDING,
    )
    const transform = zoomIdentity.translate(x, y).scale(zoom)

    d3Zoom?.transform(d3Selection, transform)
  },
  setCenter: (x: number, y: number, zoom?: number) => {
    const nextZoom = typeof zoom !== 'undefined' ? zoom : maxZoom
    const centerX = width / 2 - x * nextZoom
    const centerY = height / 2 - y * nextZoom
    const transform = zoomIdentity.translate(centerX, centerY).scale(nextZoom)

    d3Zoom.transform(d3Selection, transform)
  },
  fitBounds: (bounds: Rect, padding = DEFAULT_PADDING) => {
    const [x, y, zoom] = getTransformForBounds(bounds, width, height, minZoom, maxZoom, padding)
    const transform = zoomIdentity.translate(x, y).scale(zoom)

    d3Zoom.transform(d3Selection, transform)
  },
  project: (position: XYPosition) => {
    return pointToRendererPoint(position, transform, snapToGrid, snapGrid)
  },
})

export default useZoomPanHelper
