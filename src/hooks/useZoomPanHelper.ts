import { zoomIdentity } from 'd3-zoom'
import { getRectOfNodes, pointToRendererPoint, getTransformForBounds } from '~/utils/graph'
import {
  FitViewParams,
  FlowTransform,
  ZoomPanHelperFunctions,
  Rect,
  XYPosition,
  Node,
  Transform,
  SnapGrid,
  Dimensions,
  D3Zoom,
  D3Selection,
} from '~/types'

const DEFAULT_PADDING = 0.1

type UseZoomPanHelper = (
  d3Zoom: D3Zoom,
  d3Selection: D3Selection,
  nodes: Node[],
  transform: Transform,
  dimensions: Dimensions,
  minZoom: number,
  maxZoom: number,
  snapToGrid: boolean,
  snapGrid: SnapGrid,
) => ZoomPanHelperFunctions

export default (function (
  d3Zoom,
  d3Selection,
  nodes = [],
  transform = [0, 0, 0],
  dimensions = {
    width: 0,
    height: 0,
  },
  minZoom = 0.5,
  maxZoom = 2,
  snapToGrid = false,
  snapGrid = [15, 15],
): ZoomPanHelperFunctions {
  return {
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
        dimensions.width,
        dimensions.height,
        options.minZoom || minZoom,
        options.maxZoom || maxZoom,
        options.padding || DEFAULT_PADDING,
      )
      const transform = zoomIdentity.translate(x, y).scale(zoom)

      d3Zoom?.transform(d3Selection, transform)
    },
    setCenter: (x: number, y: number, zoom?: number) => {
      const nextZoom = typeof zoom !== 'undefined' ? zoom : maxZoom
      const centerX = dimensions.width / 2 - x * nextZoom
      const centerY = dimensions.height / 2 - y * nextZoom
      const transform = zoomIdentity.translate(centerX, centerY).scale(nextZoom)

      d3Zoom.transform(d3Selection, transform)
    },
    fitBounds: (bounds: Rect, padding = DEFAULT_PADDING) => {
      const [x, y, zoom] = getTransformForBounds(bounds, dimensions.width, dimensions.height, minZoom, maxZoom, padding)
      const transform = zoomIdentity.translate(x, y).scale(zoom)

      d3Zoom.transform(d3Selection, transform)
    },
    project: (position: XYPosition) => {
      return pointToRendererPoint(position, transform, snapToGrid, snapGrid)
    },
  }
} as UseZoomPanHelper)
