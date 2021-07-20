import { zoomIdentity } from 'd3-zoom';
import { getRectOfNodes, pointToRendererPoint, getTransformForBounds } from '../utils/graph';
import { FitViewParams, FlowTransform, ZoomPanHelperFunctions, Rect, XYPosition, RevueFlowStore } from '../types';
import { inject } from 'vue';

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
  const store = inject<RevueFlowStore>('store')!;
  const zoomPanHelperFunctions = () => {
    if (store.d3Selection && store.d3Zoom) {
      return {
        zoomIn: () => store.d3Zoom?.scaleBy(store.d3Selection as any, 1.2),
        zoomOut: () => store.d3Zoom?.scaleBy(store.d3Selection as any, 1 / 1.2),
        zoomTo: (zoomLevel: number) => store.d3Zoom?.scaleTo(store.d3Selection as any, zoomLevel),
        transform: (transform: FlowTransform) => {
          const nextTransform = zoomIdentity.translate(transform.x, transform.y).scale(transform.zoom);

          store.d3Zoom?.transform(store.d3Selection as any, nextTransform);
        },
        fitView: (options: FitViewParams = { padding: DEFAULT_PADDING, includeHiddenNodes: false }) => {
          const { nodes, width, height, minZoom, maxZoom } = store;

          if (!nodes.length) {
            return;
          }

          const bounds = getRectOfNodes(options.includeHiddenNodes ? nodes : nodes.filter((node) => !node.isHidden));
          const [x, y, zoom] = getTransformForBounds(
            bounds,
            width,
            height,
            options.minZoom || minZoom,
            options.maxZoom || maxZoom,
            options.padding || DEFAULT_PADDING
          );
          const transform = zoomIdentity.translate(x, y).scale(zoom);

          store.d3Zoom?.transform(store.d3Selection as any, transform);
        },
        setCenter: (x: number, y: number, zoom?: number) => {
          const { width, height, maxZoom } = store;

          const nextZoom = typeof zoom !== 'undefined' ? zoom : maxZoom;
          const centerX = width / 2 - x * nextZoom;
          const centerY = height / 2 - y * nextZoom;
          const transform = zoomIdentity.translate(centerX, centerY).scale(nextZoom);

          store.d3Zoom?.transform(store.d3Selection as any, transform);
        },
        fitBounds: (bounds: Rect, padding = DEFAULT_PADDING) => {
          const { width, height, minZoom, maxZoom } = store;
          const [x, y, zoom] = getTransformForBounds(bounds, width, height, minZoom, maxZoom, padding);
          const transform = zoomIdentity.translate(x, y).scale(zoom);

          store.d3Zoom?.transform(store.d3Selection as any, transform);
        },
        project: (position: XYPosition) => {
          const { transform, snapToGrid, snapGrid } = store;
          return pointToRendererPoint(position, transform, snapToGrid, snapGrid);
        },
        initialized: true
      };
    }

    return initialZoomPanHelper;
  };

  return zoomPanHelperFunctions();
};

export default useZoomPanHelper;
