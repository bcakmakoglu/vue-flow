import { GraphViewProps } from '../GraphView';
import ZoomPane from '../ZoomPane';
import UserSelection from '../../components/UserSelection';
import NodesSelection from '../../components/NodesSelection';
import { defineComponent, inject, PropType } from 'vue';
import { RevueFlowStore } from '../../types';
import useGlobalKeyHandler from '../../hooks/useGlobalKeyHandler';
import useKeyPress from '../../hooks/useKeyPress';

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

const FlowRenderer = defineComponent({
  name: 'FlowRenderer',
  components: { UserSelection, ZoomPane, NodesSelection },
  props: {
    onPaneClick: {
      type: Function as unknown as PropType<FlowRendererProps['onPaneClick']>,
      required: false,
      default: undefined
    },
    onPaneContextMenu: {
      type: Function as unknown as PropType<FlowRendererProps['onPaneContextMenu']>,
      required: false,
      default: undefined
    },
    onPaneScroll: {
      type: Function as unknown as PropType<FlowRendererProps['onPaneScroll']>,
      required: false,
      default: undefined
    },
    onElementsRemove: {
      type: Function as unknown as PropType<FlowRendererProps['onElementsRemove']>,
      required: false,
      default: undefined
    },
    onMove: {
      type: Function as unknown as PropType<FlowRendererProps['onMove']>,
      required: false,
      default: undefined
    },
    onMoveStart: {
      type: Function as unknown as PropType<FlowRendererProps['onMoveStart']>,
      required: false,
      default: undefined
    },
    onMoveEnd: {
      type: Function as unknown as PropType<FlowRendererProps['onMoveEnd']>,
      required: false,
      default: undefined
    },
    onSelectionDragStart: {
      type: Function as unknown as PropType<FlowRendererProps['onSelectionDragStart']>,
      required: false,
      default: undefined
    },
    onSelectionDrag: {
      type: Function as unknown as PropType<FlowRendererProps['onSelectionDrag']>,
      required: false,
      default: undefined
    },
    onSelectionDragStop: {
      type: Function as unknown as PropType<FlowRendererProps['onSelectionDragStop']>,
      required: false,
      default: undefined
    },
    onSelectionContextMenu: {
      type: Function as unknown as PropType<FlowRendererProps['onSelectionContextMenu']>,
      required: false,
      default: undefined
    },
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
    const store = inject<RevueFlowStore>('store');
    const keyPressed = useKeyPress(props.selectionKeyCode);

    useGlobalKeyHandler({
      onElementsRemove: props.onElementsRemove,
      deleteKeyCode: props.deleteKeyCode as string,
      multiSelectionKeyCode: props.multiSelectionKeyCode as string
    });

    const onClick = (event: MouseEvent) => {
      props.onPaneClick?.(event);
      store?.unsetNodesSelection();
      store?.resetSelectedElements();
    };

    const onContextMenu = (event: MouseEvent) => {
      props.onPaneContextMenu?.(event);
    };

    const onWheel = (event: WheelEvent) => {
      props.onPaneScroll?.(event);
    };

    return () => (
      <ZoomPane
        onMove={props.onMove}
        onMoveStart={props.onMoveStart}
        onMoveEnd={props.onMoveEnd}
        selectionKeyPressed={keyPressed.value}
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
      >
        {slots.default ? slots.default() : ''}
        {keyPressed.value ? <UserSelection track-by={'selection'} /> : ''}
        {store?.nodesSelectionActive && (
          <NodesSelection
            onSelectionDragStart={props.onSelectionDragStart}
            onSelectionDrag={props.onSelectionDrag}
            onSelectionDragStop={props.onSelectionDragStop}
            onSelectionContextMenu={props.onSelectionContextMenu}
          />
        )}
        <div class="revue-flow__pane" onClick={onClick} onContextmenu={onContextMenu} onWheel={onWheel} />
      </ZoomPane>
    );
  }
});

export default FlowRenderer;
