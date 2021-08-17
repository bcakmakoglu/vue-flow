import { D3ZoomEvent, zoom, zoomIdentity, ZoomTransform } from 'd3-zoom';
import { select, pointer } from 'd3-selection';
import { clamp } from '../../utils';
import { FlowTransform, TranslateExtent, PanOnScrollMode, KeyCode, RevueFlowStore } from '../../types';
import { computed, defineComponent, inject, PropType, ref } from 'vue';
import useKeyPress from '../../hooks/useKeyPress';
import useResizeHandler from '../../hooks/useResizeHandler';
import { RevueFlowHooks } from '../../hooks/RevueFlowHooks';
import { templateRef, whenever } from '@vueuse/core';
import { ZoomBehavior } from 'd3';

interface ZoomPaneProps {
  selectionKeyPressed: boolean;
  elementsSelectable?: boolean;
  zoomOnScroll?: boolean;
  zoomOnPinch?: boolean;
  panOnScroll?: boolean;
  panOnScrollSpeed?: number;
  panOnScrollMode?: PanOnScrollMode;
  zoomOnDoubleClick?: boolean;
  paneMoveable?: boolean;
  defaultPosition?: [number, number];
  defaultZoom?: number;
  translateExtent?: TranslateExtent;
  zoomActivationKeyCode?: KeyCode;
}

export default defineComponent({
  name: 'ZoomPane',
  props: {
    zoomOnScroll: {
      type: Boolean as PropType<ZoomPaneProps['zoomOnScroll']>,
      required: false,
      default: true
    },
    zoomOnPinch: {
      type: Boolean as PropType<ZoomPaneProps['zoomOnPinch']>,
      required: false,
      default: true
    },
    panOnScroll: {
      type: Boolean as PropType<ZoomPaneProps['panOnScroll']>,
      required: false,
      default: false
    },
    panOnScrollSpeed: {
      type: Number as PropType<ZoomPaneProps['panOnScrollSpeed']>,
      required: false,
      default: 0.5
    },
    panOnScrollMode: {
      type: String as PropType<ZoomPaneProps['panOnScrollMode']>,
      required: false,
      default: PanOnScrollMode.Free
    },
    zoomOnDoubleClick: {
      type: Boolean as PropType<ZoomPaneProps['zoomOnDoubleClick']>,
      required: false,
      default: true
    },
    selectionKeyPressed: {
      type: Boolean as PropType<ZoomPaneProps['selectionKeyPressed']>,
      required: false,
      default: false
    },
    elementsSelectable: {
      type: Boolean as PropType<ZoomPaneProps['elementsSelectable']>,
      required: false,
      default: true
    },
    paneMoveable: {
      type: Boolean as PropType<ZoomPaneProps['paneMoveable']>,
      required: false,
      default: true
    },
    defaultPosition: {
      type: Array as unknown as PropType<ZoomPaneProps['defaultPosition']>,
      required: false,
      default: () => [0, 0]
    },
    defaultZoom: {
      type: Number as PropType<ZoomPaneProps['defaultZoom']>,
      required: false,
      default: 1
    },
    translateExtent: {
      type: Array as unknown as PropType<ZoomPaneProps['translateExtent']>,
      required: false,
      default: undefined
    },
    zoomActivationKeyCode: {
      type: [Number, String] as PropType<ZoomPaneProps['zoomActivationKeyCode']>,
      required: false,
      default: undefined
    }
  },
  setup(props, { slots }) {
    const store = inject<RevueFlowStore>('store')!;
    const hooks = inject<RevueFlowHooks>('hooks')!;
    const zoomPane = templateRef<HTMLDivElement>('zoom-pane', null);
    const prevTransform = ref<FlowTransform>({ x: 0, y: 0, zoom: 0 });
    const zoomActivationKeyPressed = useKeyPress(props.zoomActivationKeyCode);

    const viewChanged = (prevTransform: FlowTransform, eventTransform: ZoomTransform): boolean =>
      prevTransform.x !== eventTransform.x || prevTransform.y !== eventTransform.y || prevTransform.zoom !== eventTransform.k;

    const eventToFlowTransform = (eventTransform: ZoomTransform): FlowTransform => ({
      x: eventTransform.x,
      y: eventTransform.y,
      zoom: eventTransform.k
    });

    const { onReady } = useResizeHandler(zoomPane, store.updateSize);
    onReady(() => {
      if (props.defaultPosition && props.defaultZoom) {
        const currentTranslateExtent =
          typeof props.translateExtent !== 'undefined' ? props.translateExtent : store.translateExtent;
        const d3ZoomInstance = zoom().scaleExtent([store.minZoom, store.maxZoom]).translateExtent(currentTranslateExtent);
        const selection = select(zoomPane.value as Element).call(d3ZoomInstance);

        const clampedX = clamp(props.defaultPosition[0], currentTranslateExtent[0][0], currentTranslateExtent[1][0]);
        const clampedY = clamp(props.defaultPosition[1], currentTranslateExtent[0][1], currentTranslateExtent[1][1]);
        const clampedZoom = clamp(props.defaultZoom, store.minZoom, store.maxZoom);
        const updatedTransform = zoomIdentity.translate(clampedX, clampedY).scale(clampedZoom);

        d3ZoomInstance.transform(selection, updatedTransform);

        store.initD3Zoom({
          d3Zoom: d3ZoomInstance,
          d3Selection: selection,
          d3ZoomHandler: selection.on('wheel.zoom'),
          // we need to pass transform because zoom handler is not registered when we set the initial transform
          transform: [clampedX, clampedY, clampedZoom]
        });
        applyZoomHandlers(d3ZoomInstance);
        applyZoomFilter(d3ZoomInstance);
      }
    });

    whenever(zoomActivationKeyPressed, () => {
      if (props.panOnScroll) {
        store.d3Selection
          ?.on('wheel', (event: WheelEvent) => {
            event.preventDefault();
            event.stopImmediatePropagation();

            const currentZoom = store.d3Selection?.property('__zoom').k || 1;

            if (event.ctrlKey && props.zoomOnPinch) {
              const point = pointer(event);
              // taken from https://github.com/d3/d3-zoom/blob/master/src/zoom.js
              const pinchDelta = -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * 10;
              const zoom = currentZoom * Math.pow(2, pinchDelta);
              if (store.d3Selection) store.d3Zoom?.scaleTo(store.d3Selection, zoom, point);

              return;
            }

            // increase scroll speed in firefox
            // firefox: deltaMode === 1; chrome: deltaMode === 0
            const deltaNormalize = event.deltaMode === 1 ? 20 : 1;
            const deltaX = props.panOnScrollMode === PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize;
            const deltaY = props.panOnScrollMode === PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize;

            if (store.d3Selection && props.panOnScrollSpeed)
              store.d3Zoom?.translateBy(
                store.d3Selection,
                -(deltaX / currentZoom) * props.panOnScrollSpeed,
                -(deltaY / currentZoom) * props.panOnScrollSpeed
              );
          })
          .on('wheel.zoom', null);
      } else if (typeof store.d3ZoomHandler !== 'undefined') {
        store.d3Selection?.on('wheel', null).on('wheel.zoom', store.d3ZoomHandler);
      }
    });

    const applyZoomHandlers = (d3Zoom: ZoomBehavior<Element, unknown>) => {
      d3Zoom.on('start', (event: D3ZoomEvent<HTMLDivElement, any>) => {
        if (viewChanged(prevTransform.value, event.transform)) {
          const flowTransform = eventToFlowTransform(event.transform);
          prevTransform.value = flowTransform;

          hooks.moveStart.trigger(flowTransform);
        }
      });

      d3Zoom.on('end', (event: D3ZoomEvent<HTMLDivElement, any>) => {
        if (viewChanged(prevTransform.value, event.transform)) {
          const flowTransform = eventToFlowTransform(event.transform);
          prevTransform.value = flowTransform;

          hooks.moveEnd.trigger(flowTransform);
        }
      });

      d3Zoom.on('zoom', (event: D3ZoomEvent<HTMLDivElement, any>) => {
        store.transform = [event.transform.x, event.transform.y, event.transform.k];
        hooks.move.trigger(eventToFlowTransform(event.transform));
      });

      const selectionKeyPressed = computed(() => props.selectionKeyPressed);
      whenever(selectionKeyPressed, () => {
        if (selectionKeyPressed.value) {
          d3Zoom.on('zoom', null);
        }
      });
    };

    const applyZoomFilter = (d3Zoom: ZoomBehavior<Element, unknown>) => {
      d3Zoom.filter((event: MouseEvent) => {
        const zoomScroll = props.zoomOnScroll;
        const pinchZoom = props.zoomOnPinch && event.ctrlKey;

        // if all interactions are disabled, we prevent all zoom events
        if (!props.paneMoveable && !zoomScroll && !props.panOnScroll && !props.zoomOnDoubleClick && !props.zoomOnPinch) {
          return false;
        }

        // during a selection we prevent all other interactions
        if (props.selectionKeyPressed) {
          return false;
        }

        // if zoom on double click is disabled, we prevent the double click event
        if (!props.zoomOnDoubleClick && event.type === 'dblclick') {
          return false;
        }

        if ((event.target as Element).closest('.nowheel') && event.type === 'wheel') {
          return false;
        }

        // when the target element is a node, we still allow zooming
        if (
          ((event.target as Element).closest('.revue-flow__node') || (event.target as Element).closest('.revue-flow__edge')) &&
          event.type !== 'wheel'
        ) {
          return false;
        }

        // when the target element is a node selection, we still allow zooming
        if ((event.target as Element).closest('.revue-flow__nodesselection') && event.type !== 'wheel') {
          return false;
        }

        if (!props.zoomOnPinch && event.ctrlKey && event.type === 'wheel') {
          return false;
        }

        // when there is no scroll handling enabled, we prevent all wheel events
        if (!zoomScroll && !props.panOnScroll && !pinchZoom && event.type === 'wheel') {
          return false;
        }

        // if the pane is not movable, we prevent dragging it with mousestart or touchstart
        if (!props.paneMoveable && (event.type === 'mousedown' || event.type === 'touchstart')) {
          return false;
        }

        // default filter for d3-zoom
        return (!event.ctrlKey || event.type === 'wheel') && !event.button;
      });
    };

    return () => (
      <div ref="zoom-pane" class="revue-flow__renderer revue-flow__zoompane">
        {slots.default ? slots.default() : ''}
      </div>
    );
  }
});
