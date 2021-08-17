import { zoomIdentity } from 'd3-zoom';
import { computed, effectScope, inject } from 'vue';
import { createEventHook, EventHookOn, until } from '@vueuse/core';
import { Selection, ZoomBehavior } from 'd3';
import { getRectOfNodes, pointToRendererPoint, getTransformForBounds } from '../utils/graph';
import { FitViewParams, FlowTransform, ZoomPanHelperFunctions, Rect, XYPosition, RevueFlowStore } from '../types';

const DEFAULT_PADDING = 0.1;

const useZoomPanHelper = (): { onReady: EventHookOn<ZoomPanHelperFunctions> } => {
  const zoomPanHelperEvent = createEventHook<ZoomPanHelperFunctions>();
  const store = inject<RevueFlowStore>('store')!;

  const scope = effectScope();
  scope.run(() => {
    const d3Zoom = computed(() => store.d3Zoom);
    const d3Selection = computed(() => store.d3Selection);

    const createZoomPanHelper = (
      d3Zoom: ZoomBehavior<Element, unknown>,
      d3Selection: Selection<Element, any, any, any>
    ): ZoomPanHelperFunctions => ({
      zoomIn: () => d3Zoom?.scaleBy(d3Selection, 1.2),
      zoomOut: () => d3Zoom?.scaleBy(d3Selection, 1 / 1.2),
      zoomTo: (zoomLevel: number) => d3Zoom.scaleTo(d3Selection, zoomLevel),
      transform: (transform: FlowTransform) => {
        const nextTransform = zoomIdentity.translate(transform.x, transform.y).scale(transform.zoom);

        d3Zoom.transform(d3Selection, nextTransform);
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

        d3Zoom?.transform(d3Selection, transform);
      },
      setCenter: (x: number, y: number, zoom?: number) => {
        const { width, height, maxZoom } = store;

        const nextZoom = typeof zoom !== 'undefined' ? zoom : maxZoom;
        const centerX = width / 2 - x * nextZoom;
        const centerY = height / 2 - y * nextZoom;
        const transform = zoomIdentity.translate(centerX, centerY).scale(nextZoom);

        d3Zoom.transform(d3Selection, transform);
      },
      fitBounds: (bounds: Rect, padding = DEFAULT_PADDING) => {
        const { width, height, minZoom, maxZoom } = store;
        const [x, y, zoom] = getTransformForBounds(bounds, width, height, minZoom, maxZoom, padding);
        const transform = zoomIdentity.translate(x, y).scale(zoom);

        d3Zoom.transform(d3Selection, transform);
      },
      project: (position: XYPosition) => {
        const { transform, snapToGrid, snapGrid } = store;
        return pointToRendererPoint(position, transform, snapToGrid, snapGrid);
      }
    });

    until(d3Zoom)
      .toBeTruthy()
      .then(() => {
        if (d3Zoom.value && d3Selection.value) {
          zoomPanHelperEvent.trigger(createZoomPanHelper(d3Zoom.value, d3Selection.value));
        } else {
          throw Error('D3 could not be initialized.');
        }
        scope.stop();
      });
  });

  return {
    onReady: zoomPanHelperEvent.on
  };
};

export default useZoomPanHelper;
