import { createHooks } from './hooks'
import type { DefaultEdgeTypes, DefaultNodeTypes, FlowOptions, State } from '~/types'
import { ConnectionLineType, ConnectionMode, PanOnScrollMode } from '~/types'
import {
  BezierEdge,
  DefaultNode,
  InputNode,
  OutputNode,
  SimpleBezierEdge,
  SmoothStepEdge,
  StepEdge,
  StraightEdge,
} from '~/components'

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
  simplebezier: SimpleBezierEdge,
}

const isDef = <T>(val: T): val is NonNullable<T> => typeof val !== 'undefined'

const defaultState = (): State => ({
  vueFlowRef: null,
  viewportRef: null,
  nodes: [],
  edges: [],
  nodeTypes: {},
  edgeTypes: {},

  initialized: false,

  dimensions: {
    width: 0,
    height: 0,
  },
  viewport: { x: 0, y: 0, zoom: 1 },

  d3Zoom: null,
  d3Selection: null,
  d3ZoomHandler: null,
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
  panOnDrag: true,
  edgeUpdaterRadius: 10,
  onlyRenderVisibleElements: false,
  defaultZoom: 1,
  defaultPosition: [0, 0],

  nodesSelectionActive: false,
  userSelectionActive: false,

  defaultMarkerColor: '#b1b1b7',
  connectionLineStyle: {},
  connectionLineType: ConnectionLineType.Bezier,
  connectionLineOptions: {
    type: ConnectionLineType.Bezier,
    style: {},
  },
  connectionNodeId: null,
  connectionHandleId: null,
  connectionHandleType: null,
  connectionPosition: { x: NaN, y: NaN },
  connectionMode: ConnectionMode.Loose,
  connectionStartHandle: null,
  connectOnClick: true,

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

  applyDefault: true,
  autoConnect: false,

  fitViewOnInit: false,
  noDragClassName: 'nodrag',
  noWheelClassName: 'nowheel',
  noPanClassName: 'nopan',
  defaultEdgeOptions: undefined,
  elevateEdgesOnSelect: false,

  vueFlowVersion: typeof __VUE_FLOW_VERSION__ !== 'undefined' ? __VUE_FLOW_VERSION__ : '-',
})

export default (opts?: FlowOptions): State => {
  const state = defaultState()
  if (opts) {
    Object.keys(opts).forEach((o) => {
      const option = opts[o as keyof typeof opts]
      if (isDef(option)) (state as any)[o] = option
    })
  }

  return state
}
