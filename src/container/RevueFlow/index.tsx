import { PropType } from 'vue'
import '../../style.css'
import '../../theme-default.css'
import GraphView from '../GraphView'
import DefaultNode from '../../components/Nodes/DefaultNodeDepr'
import InputNode from '../../components/Nodes/InputNodeDepr'
import OutputNode from '../../components/Nodes/OutputNodeDepr'
import { createNodeTypes } from '../NodeRenderer/utils'
import { BezierEdge, StepEdge, SmoothStepEdge, StraightEdge } from '../../components/Edges'
import { createEdgeTypes } from '../EdgeRenderer/utils'
import { ConnectionMode, ConnectionLineType, PanOnScrollMode, RevueFlowStore, RevueFlowProps } from '../../types'
import { initialState } from '../../store'
import configureStore from '../../store/configure-store'
import { RevueFlowHooks, useRevueFlow } from '../../hooks/RevueFlowHooks'

const defaultNodeTypes = {
  input: InputNode,
  default: DefaultNode,
  output: OutputNode,
}

const defaultEdgeTypes = {
  default: BezierEdge,
  straight: StraightEdge,
  step: StepEdge,
  smoothstep: SmoothStepEdge,
}

export default defineComponent({
  name: 'RevueFlow',
  components: { GraphView },
  props: {
    modelValue: {
      type: Array as PropType<RevueFlowProps['modelValue']>,
      required: false,
      default: () => [],
    },
    nodeTypesId: {
      type: String as PropType<RevueFlowProps['nodeTypesId']>,
      required: false,
      default: '1',
    },
    edgeTypesId: {
      type: String as PropType<RevueFlowProps['edgeTypesId']>,
      required: false,
      default: '1',
    },
    nodeTypes: {
      type: Object as PropType<RevueFlowProps['nodeTypes']>,
      required: false,
      default: () => defaultNodeTypes,
    },
    edgeTypes: {
      type: Object as PropType<RevueFlowProps['edgeTypes']>,
      required: false,
      default: () => defaultEdgeTypes,
    },
    connectionMode: {
      type: String as PropType<RevueFlowProps['connectionMode']>,
      required: false,
      default: ConnectionMode.Strict,
    },
    connectionLineType: {
      type: String as PropType<RevueFlowProps['connectionLineType']>,
      required: false,
      default: ConnectionLineType.Bezier,
    },
    connectionLineStyle: {
      type: Object as PropType<RevueFlowProps['connectionLineStyle']>,
      required: false,
      default: undefined,
    },
    connectionLineComponent: {
      type: Object as PropType<RevueFlowProps['connectionLineComponent']>,
      required: false,
      default: undefined,
    },
    selectionKeyCode: {
      type: [Number, String] as PropType<RevueFlowProps['selectionKeyCode']>,
      required: false,
      default: 'Shift',
    },
    multiSelectionKeyCode: {
      type: [Number, String] as PropType<RevueFlowProps['multiSelectionKeyCode']>,
      required: false,
      default: 'Meta',
    },
    zoomActivationKeyCode: {
      type: [Number, String] as PropType<RevueFlowProps['zoomActivationKeyCode']>,
      required: false,
      default: 'Meta',
    },
    deleteKeyCode: {
      type: [Number, String] as PropType<RevueFlowProps['deleteKeyCode']>,
      required: false,
      default: 'Backspace',
    },
    snapToGrid: {
      type: Boolean as PropType<RevueFlowProps['snapToGrid']>,
      required: false,
      default: false,
    },
    snapGrid: {
      type: Array as unknown as PropType<RevueFlowProps['snapGrid']>,
      required: false,
      default: () => [15, 15],
    },
    onlyRenderVisibleElements: {
      type: Boolean as PropType<RevueFlowProps['onlyRenderVisibleElements']>,
      required: false,
      default: false,
    },
    nodesDraggable: {
      type: Boolean as PropType<RevueFlowProps['nodesDraggable']>,
      required: false,
      default: undefined,
    },
    nodesConnectable: {
      type: Boolean as PropType<RevueFlowProps['nodesConnectable']>,
      required: false,
      default: true,
    },
    elementsSelectable: {
      type: Boolean as PropType<RevueFlowProps['elementsSelectable']>,
      required: false,
      default: true,
    },
    selectNodesOnDrag: {
      type: Boolean as PropType<RevueFlowProps['selectNodesOnDrag']>,
      required: false,
      default: true,
    },
    minZoom: {
      type: Number as PropType<RevueFlowProps['minZoom']>,
      required: false,
      default: 0.5,
    },
    maxZoom: {
      type: Number as PropType<RevueFlowProps['maxZoom']>,
      required: false,
      default: 2,
    },
    defaultZoom: {
      type: Number as PropType<RevueFlowProps['defaultZoom']>,
      required: false,
      default: 1,
    },
    defaultPosition: {
      type: Array as unknown as PropType<RevueFlowProps['defaultPosition']>,
      required: false,
      default: () => [0, 0],
    },
    translateExtent: {
      type: Array as unknown as PropType<RevueFlowProps['translateExtent']>,
      required: false,
      default: () => [
        [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
        [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
      ],
    },
    nodeExtent: {
      type: Array as unknown as PropType<RevueFlowProps['nodeExtent']>,
      required: false,
      default: () => [
        [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
        [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
      ],
    },
    arrowHeadColor: {
      type: String as PropType<RevueFlowProps['arrowHeadColor']>,
      required: false,
      default: '#b1b1b7',
    },
    markerEndId: {
      type: String as PropType<RevueFlowProps['markerEndId']>,
      required: false,
      default: undefined,
    },
    zoomOnScroll: {
      type: Boolean as PropType<RevueFlowProps['zoomOnScroll']>,
      required: false,
      default: true,
    },
    zoomOnPinch: {
      type: Boolean as PropType<RevueFlowProps['zoomOnPinch']>,
      required: false,
      default: true,
    },
    panOnScroll: {
      type: Boolean as PropType<RevueFlowProps['panOnScroll']>,
      required: false,
      default: false,
    },
    panOnScrollSpeed: {
      type: Number as PropType<RevueFlowProps['panOnScrollSpeed']>,
      required: false,
      default: 0.5,
    },
    panOnScrollMode: {
      type: String as PropType<RevueFlowProps['panOnScrollMode']>,
      required: false,
      default: PanOnScrollMode.Free,
    },
    zoomOnDoubleClick: {
      type: Boolean as PropType<RevueFlowProps['zoomOnDoubleClick']>,
      required: false,
      default: true,
    },
    paneMoveable: {
      type: Boolean as PropType<RevueFlowProps['paneMoveable']>,
      required: false,
      default: true,
    },
    edgeUpdaterRadius: {
      type: Number as PropType<RevueFlowProps['edgeUpdaterRadius']>,
      required: false,
      default: 10,
    },
  },
  emits: Object.keys(useRevueFlow()),
  setup(props, { emit, slots }) {
    const store = configureStore(initialState)()
    provide<RevueFlowStore>('store', store)
    const hooks = useRevueFlow().bind(emit)
    provide<RevueFlowHooks>('hooks', hooks)
    const elements = useVModel(props, 'modelValue', emit)

    store.setElements(elements.value)
    watch(elements.value, () => {
      store.setElements(elements.value)
    })

    onUpdated(() => {
      store.setElements(elements.value)
    })

    onBeforeUnmount(() => {
      store.$reset()
      store.setElements([])
    })

    return () => (
      <div className="revue-flow">
        <GraphView
          nodeTypes={createNodeTypes({ ...defaultNodeTypes, ...props.nodeTypes })}
          edgeTypes={createEdgeTypes({ ...defaultEdgeTypes, ...props.edgeTypes })}
          connectionMode={props.connectionMode}
          connectionLineType={props.connectionLineType}
          connectionLineStyle={props.connectionLineStyle}
          connectionLineComponent={props.connectionLineComponent}
          selectionKeyCode={props.selectionKeyCode}
          deleteKeyCode={props.deleteKeyCode}
          multiSelectionKeyCode={props.multiSelectionKeyCode}
          zoomActivationKeyCode={props.zoomActivationKeyCode}
          snapToGrid={props.snapToGrid}
          snapGrid={props.snapGrid}
          onlyRenderVisibleElements={props.onlyRenderVisibleElements}
          nodesDraggable={props.nodesDraggable}
          nodesConnectable={props.nodesConnectable}
          elementsSelectable={props.elementsSelectable}
          selectNodesOnDrag={props.selectNodesOnDrag}
          minZoom={props.minZoom}
          maxZoom={props.maxZoom}
          defaultZoom={props.defaultZoom}
          defaultPosition={props.defaultPosition}
          translateExtent={props.translateExtent}
          nodeExtent={props.nodeExtent}
          arrowHeadColor={props.arrowHeadColor}
          markerEndId={props.markerEndId}
          zoomOnScroll={props.zoomOnScroll}
          zoomOnPinch={props.zoomOnPinch}
          zoomOnDoubleClick={props.zoomOnDoubleClick}
          panOnScroll={props.panOnScroll}
          panOnScrollSpeed={props.panOnScrollSpeed}
          panOnScrollMode={props.panOnScrollMode}
          paneMoveable={props.paneMoveable}
          edgeUpdaterRadius={props.edgeUpdaterRadius}
        />
        {slots.default ? slots.default() : ''}
      </div>
    )
  },
})
