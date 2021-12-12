import { createHooks } from './hooks'
import { ConnectionMode, FlowState, PanOnScrollMode, DefaultNodeTypes, DefaultEdgeTypes, ConnectionLineType } from '~/types'
import { DefaultNode, InputNode, OutputNode, BezierEdge, SmoothStepEdge, StepEdge, StraightEdge } from '~/components'

export const defaultNodeTypes: DefaultNodeTypes = {
  input: InputNode,
  default: DefaultNode,
  output: OutputNode,
}

export const defaultEdgeTypes: DefaultEdgeTypes = {
  default: BezierEdge,
  straight: StraightEdge,
  step: StepEdge,
  smoothstep: SmoothStepEdge,
}

export default (preloadedState?: Partial<FlowState>): FlowState => ({
  nodes: [],
  edges: [],

  paneReady: false,
  instance: undefined,

  dimensions: {
    width: 0,
    height: 0,
  },
  transform: [0, 0, 1],

  d3Zoom: undefined,
  d3Selection: undefined,
  d3ZoomHandler: undefined,
  minZoom: 0.5,
  maxZoom: 2,
  translateExtent: [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],

  nodeExtent: [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  preventScrolling: true,
  zoomOnScroll: true,
  zoomOnPinch: true,
  zoomOnDoubleClick: true,
  panOnScroll: false,
  panOnScrollSpeed: 0.5,
  panOnScrollMode: PanOnScrollMode.Free,
  paneMoveable: true,
  edgeUpdaterRadius: 10,
  onlyRenderVisibleElements: false,
  defaultZoom: 1,
  defaultPosition: [0, 0],

  nodesSelectionActive: false,
  selectionActive: false,
  selectedNodesBbox: { x: 0, y: 0, width: 0, height: 0 },

  defaultMarkerColor: '#b1b1b7',
  connectionLineStyle: {},
  connectionLineType: ConnectionLineType.Bezier,
  connectionNodeId: undefined,
  connectionHandleId: undefined,
  connectionHandleType: 'source',
  connectionPosition: { x: NaN, y: NaN },
  connectionMode: ConnectionMode.Loose,

  snapGrid: [15, 15],
  snapToGrid: false,

  edgesUpdatable: false,
  nodesConnectable: true,
  nodesDraggable: true,
  elementsSelectable: true,
  selectNodesOnDrag: true,
  multiSelectionActive: false,
  selectionKeyCode: 'Shift',
  multiSelectionKeyCode: 'Meta',
  zoomActivationKeyCode: 'Meta',
  deleteKeyCode: 'Backspace',

  hooks: createHooks(),

  storageKey: undefined,

  vueFlowVersion: typeof __VUE_FLOW_VERSION__ !== 'undefined' ? __VUE_FLOW_VERSION__ : '-',
  ...preloadedState,
})
