import { computed, defineComponent, inject, PropType } from 'vue';
import ZoomPane from '../ZoomPane';
import UserSelection from '../../components/UserSelection';
import NodesSelection from '../../components/NodesSelection';
import { RevueFlowStore, GraphViewProps } from '../../types';
import useGlobalKeyHandler from '../../hooks/useGlobalKeyHandler';
import useKeyPress from '../../hooks/useKeyPress';
import { RevueFlowHooks } from '../../hooks/RevueFlowHooks';

type FlowRendererProps = Omit<
  GraphViewProps,
  | 'elements'
  | 'snapToGrid'
  | 'nodeTypes'
  | 'edgeTypes'
  | 'snapGrid'
  | 'connectionLineType'
  | 'arrowHeadColor'
  | 'onlyRenderVisibleElements'
  | 'selectNodesOnDrag'
>;

export default defineComponent({
  name: 'FlowRenderer',
  components: { UserSelection, ZoomPane, NodesSelection },
  props: {
    deleteKeyCode: {
      type: [Number, String] as PropType<FlowRendererProps['deleteKeyCode']>,
      required: false,
      default: undefined
    },
    selectionKeyCode: {
      type: [Number, String] as PropType<FlowRendererProps['selectionKeyCode']>,
      required: false,
      default: undefined
    },
    multiSelectionKeyCode: {
      type: [Number, String] as PropType<FlowRendererProps['multiSelectionKeyCode']>,
      required: false,
      default: undefined
    },
    zoomActivationKeyCode: {
      type: [Number, String] as PropType<FlowRendererProps['zoomActivationKeyCode']>,
      required: false,
      default: undefined
    },
    elementsSelectable: {
      type: Boolean as PropType<FlowRendererProps['elementsSelectable']>,
      required: false,
      default: false
    },
    zoomOnScroll: {
      type: Boolean as PropType<FlowRendererProps['zoomOnScroll']>,
      required: false,
      default: false
    },
    zoomOnPinch: {
      type: Boolean as PropType<FlowRendererProps['zoomOnPinch']>,
      required: false,
      default: false
    },
    panOnScroll: {
      type: Boolean as PropType<FlowRendererProps['panOnScroll']>,
      required: false,
      default: false
    },
    panOnScrollSpeed: {
      type: Number as PropType<FlowRendererProps['panOnScrollSpeed']>,
      required: false,
      default: undefined
    },
    panOnScrollMode: {
      type: String as PropType<FlowRendererProps['panOnScrollMode']>,
      required: false,
      default: undefined
    },
    zoomOnDoubleClick: {
      type: Boolean as PropType<FlowRendererProps['zoomOnDoubleClick']>,
      required: false,
      default: false
    },
    paneMoveable: {
      type: Boolean as PropType<FlowRendererProps['paneMoveable']>,
      required: false,
      default: false
    },
    defaultPosition: {
      type: Array as unknown as PropType<FlowRendererProps['defaultPosition']>,
      required: false,
      default: undefined
    },
    defaultZoom: {
      type: Number as PropType<FlowRendererProps['defaultZoom']>,
      required: false,
      default: undefined
    },
    translateExtent: {
      type: Array as unknown as PropType<FlowRendererProps['translateExtent']>,
      required: false,
      default: undefined
    }
  },
  setup(props, { slots }) {
    const store = inject<RevueFlowStore>('store')!;
    const hooks = inject<RevueFlowHooks>('hooks')!;
    const keyPressed = useKeyPress(props.selectionKeyCode);

    useGlobalKeyHandler({
      store,
      onElementsRemove: hooks.elementsRemove.trigger,
      deleteKeyCode: props.deleteKeyCode || '',
      multiSelectionKeyCode: props.multiSelectionKeyCode || ''
    });

    const onClick = (event: MouseEvent) => {
      hooks.paneClick.trigger(event);
      store.unsetNodesSelection();
      store.resetSelectedElements();
    };

    const onContextMenu = (event: MouseEvent) => hooks.paneContextMenu.trigger(event);

    const onWheel = (event: WheelEvent) => hooks.paneScroll.trigger(event);

    const selectionActive = computed(() => store.nodesSelectionActive);

    return () => (
      <ZoomPane
        elementsSelectable={props.elementsSelectable}
        zoomOnScroll={props.zoomOnScroll}
        zoomOnPinch={props.zoomOnPinch}
        panOnScroll={props.panOnScroll}
        panOnScrollSpeed={props.panOnScrollSpeed}
        panOnScrollMode={props.panOnScrollMode}
        zoomOnDoubleClick={props.zoomOnDoubleClick}
        paneMoveable={props.paneMoveable}
        defaultPosition={props.defaultPosition}
        defaultZoom={props.defaultZoom}
        translateExtent={props.translateExtent}
        zoomActivationKeyCode={props.zoomActivationKeyCode}
        selectionKeyCode={props.selectionKeyCode}
      >
        {slots.default ? slots.default() : ''}
        {keyPressed.value ? <UserSelection /> : ''}
        {selectionActive.value ? <NodesSelection /> : ''}
        <div class="revue-flow__pane" onClick={onClick} onContextmenu={onContextMenu} onWheel={onWheel} />
      </ZoomPane>
    );
  }
});
