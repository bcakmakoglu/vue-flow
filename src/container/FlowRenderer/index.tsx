import { GraphViewProps } from '../GraphView';
import ZoomPane from '../ZoomPane';
import UserSelection from '../../components/UserSelection';
import { defineComponent, PropType } from 'vue-demi';
import store from '../../store';

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
  components: { UserSelection, ZoomPane },
  props: {
    onPaneClick: {
      type: Function() as PropType<FlowRendererProps['onPaneClick']>,
      required: false,
      default: undefined as any
    },
    onPaneContextMenu: {
      type: Function() as PropType<FlowRendererProps['onPaneContextMenu']>,
      required: false,
      default: undefined as any
    },
    onPaneScroll: {
      type: Function() as PropType<FlowRendererProps['onPaneScroll']>,
      required: false,
      default: undefined as any
    },
    onElementsRemove: {
      type: Function() as PropType<FlowRendererProps['onElementsRemove']>,
      required: false,
      default: undefined as any
    },
    onMove: {
      type: Function() as PropType<FlowRendererProps['onMove']>,
      required: false,
      default: undefined as any
    },
    onMoveStart: {
      type: Function() as PropType<FlowRendererProps['onMoveStart']>,
      required: false,
      default: undefined as any
    },
    onMoveEnd: {
      type: Function() as PropType<FlowRendererProps['onMoveEnd']>,
      required: false,
      default: undefined as any
    },
    onSelectionDragStart: {
      type: Function() as PropType<FlowRendererProps['onSelectionDragStart']>,
      required: false,
      default: undefined as any
    },
    onSelectionDrag: {
      type: Function() as PropType<FlowRendererProps['onSelectionDrag']>,
      required: false,
      default: undefined as any
    },
    onSelectionDragStop: {
      type: Function() as PropType<FlowRendererProps['onSelectionDragStop']>,
      required: false,
      default: undefined as any
    },
    onSelectionContextMenu: {
      type: Function() as PropType<FlowRendererProps['onSelectionContextMenu']>,
      required: false,
      default: undefined as any
    },
    deleteKeyCode: {
      type: (Number || String) as PropType<FlowRendererProps['deleteKeyCode']>,
      required: false,
      default: undefined
    },
    selectionKeyCode: {
      type: (Number || String) as PropType<FlowRendererProps['selectionKeyCode']>,
      required: false,
      default: undefined
    },
    multiSelectionKeyCode: {
      type: (Number || String) as PropType<FlowRendererProps['multiSelectionKeyCode']>,
      required: false,
      default: undefined
    },
    zoomActivationKeyCode: {
      type: (Number || String) as PropType<FlowRendererProps['zoomActivationKeyCode']>,
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
    const pinia = store();

    const onClick = (event: MouseEvent) => {
      props.onPaneClick?.(event);
      pinia.unsetNodesSelection();
      pinia.resetSelectedElements();
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
        selectionKeyPressed={false}
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
        <div class="react-flow__pane" onClick={onClick} onContextmenu={onContextMenu} onWheel={onWheel} />
      </ZoomPane>
    );
  }
});

export default FlowRenderer;
