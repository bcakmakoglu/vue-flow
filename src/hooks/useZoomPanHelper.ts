import { zoomIdentity } from 'd3-zoom';
import { getRectOfNodes, pointToRendererPoint, getTransformForBounds } from '../utils/graph';
import { FitViewParams, FlowTransform, ZoomPanHelperFunctions, Rect, XYPosition } from '../types';
import { computed } from 'vue';
import store from '../store';

const DEFAULT_PADDING = 0.1;

const initialZoomPanHelper: ZoomPanHelperFunctions = {
  zoomIn: () => {},
  zoomOut: () => {},
  zoomTo: (_: number) => {},
  transform: (_: FlowTransform) => {},
  fitView: (_: FitViewParams = { padding: DEFAULT_PADDING, includeHiddenNodes: false }) => {},
  setCenter: (_: number, __: number) => {},
  fitBounds: (_: Rect) => {},
  project: (position: XYPosition) => position,
  initialized: false
};

const useZoomPanHelper = (): ZoomPanHelperFunctions => {
  const pinia = store();
  const zoomPanHelperFunctions = computed<ZoomPanHelperFunctions>(() => {
    if (pinia.d3Selection && pinia.d3Zoom) {
      return {
        zoomIn: () => pinia.d3Zoom?.scaleBy(pinia.d3Selection as any, 1.2),
        zoomOut: () => pinia.d3Zoom?.scaleBy(pinia.d3Selection as any, 1 / 1.2),
        zoomTo: (zoomLevel: number) => pinia.d3Zoom?.scaleTo(pinia.d3Selection as any, zoomLevel),
        transform: (transform: FlowTransform) => {
          const nextTransform = zoomIdentity.translate(transform.x, transform.y).scale(transform.zoom);

          pinia.d3Zoom?.transform(pinia.d3Selection as any, nextTransform);
        },
        fitView: (options: FitViewParams = { padding: DEFAULT_PADDING, includeHiddenNodes: false }) => {
          const { nodes, width, height, minZoom, maxZoom } = pinia;

          if (!nodes.length) {
            return;
          }

          const bounds = getRectOfNodes(options.includeHiddenNodes ? nodes : nodes.filter((node) => !node.isHidden));
          const [x, y, zoom] = getTransformForBounds(
            bounds,
            width,
            height,
            options.minZoom ?? minZoom,
            options.maxZoom ?? maxZoom,
            options.padding ?? DEFAULT_PADDING
          );
          const transform = zoomIdentity.translate(x, y).scale(zoom);

          pinia.d3Zoom?.transform(pinia.d3Selection as any, transform);
        },
        setCenter: (x: number, y: number, zoom?: number) => {
          const { width, height, maxZoom } = pinia;

          const nextZoom = typeof zoom !== 'undefined' ? zoom : maxZoom;
          const centerX = width / 2 - x * nextZoom;
          const centerY = height / 2 - y * nextZoom;
          const transform = zoomIdentity.translate(centerX, centerY).scale(nextZoom);

          pinia.d3Zoom?.transform(pinia.d3Selection as any, transform);
        },
        fitBounds: (bounds: Rect, padding = DEFAULT_PADDING) => {
          const { width, height, minZoom, maxZoom } = pinia;
          const [x, y, zoom] = getTransformForBounds(bounds, width, height, minZoom, maxZoom, padding);
          const transform = zoomIdentity.translate(x, y).scale(zoom);

          pinia.d3Zoom?.transform(pinia.d3Selection as any, transform);
        },
        project: (position: XYPosition) => {
          const { transform, snapToGrid, snapGrid } = pinia;
          return pointToRendererPoint(position, transform, snapToGrid, snapGrid);
        },
        initialized: true
      };
    }

    return initialZoomPanHelper;
  });

  return zoomPanHelperFunctions.value;
};

export default useZoomPanHelper;
