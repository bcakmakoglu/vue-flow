import { createHooks } from './hooks'
import {
  ConnectionMode,
  State,
  PanOnScrollMode,
  DefaultNodeTypes,
  DefaultEdgeTypes,
  ConnectionLineType,
  FlowOptions,
} from '~/types'
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

export default (opts?: FlowOptions): State => {
  const state: State = {
    nodes: [],
    edges: [],

    paneReady: false,
    initialized: false,
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

    applyDefault: true,

    vueFlowVersion: typeof __VUE_FLOW_VERSION__ !== 'undefined' ? __VUE_FLOW_VERSION__ : '-',
  }

  if (opts) {
    if (typeof opts.panOnScroll !== 'undefined') state.panOnScroll = opts.panOnScroll
    if (typeof opts.panOnScrollMode !== 'undefined') state.panOnScrollMode = opts.panOnScrollMode
    if (typeof opts.panOnScrollSpeed !== 'undefined') state.panOnScrollSpeed = opts.panOnScrollSpeed
    if (typeof opts.paneMoveable !== 'undefined') state.paneMoveable = opts.paneMoveable
    if (typeof opts.zoomOnScroll !== 'undefined') state.zoomOnScroll = opts.zoomOnScroll
    if (typeof opts.preventScrolling !== 'undefined') state.preventScrolling = opts.preventScrolling
    if (typeof opts.zoomOnDoubleClick !== 'undefined') state.zoomOnDoubleClick = opts.zoomOnDoubleClick
    if (typeof opts.zoomOnPinch !== 'undefined') state.zoomOnPinch = opts.zoomOnPinch
    if (typeof opts.defaultZoom !== 'undefined') state.defaultZoom = opts.defaultZoom
    if (typeof opts.defaultPosition !== 'undefined') state.defaultPosition = opts.defaultPosition
    if (typeof opts.edgeUpdaterRadius !== 'undefined') state.edgeUpdaterRadius = opts.edgeUpdaterRadius
    if (typeof opts.elementsSelectable !== 'undefined') state.elementsSelectable = opts.elementsSelectable
    if (typeof opts.onlyRenderVisibleElements !== 'undefined') state.onlyRenderVisibleElements = opts.onlyRenderVisibleElements
    if (typeof opts.edgesUpdatable !== 'undefined') state.edgesUpdatable = opts.edgesUpdatable
    if (typeof opts.nodesConnectable !== 'undefined') state.nodesConnectable = opts.nodesConnectable
    if (typeof opts.nodesDraggable !== 'undefined') state.nodesDraggable = opts.nodesDraggable
    if (typeof opts.defaultMarkerColor !== 'undefined') state.defaultMarkerColor = opts.defaultMarkerColor
    if (typeof opts.deleteKeyCode !== 'undefined') state.deleteKeyCode = opts.deleteKeyCode
    if (typeof opts.selectionKeyCode !== 'undefined') state.selectionKeyCode = opts.selectionKeyCode
    if (typeof opts.zoomActivationKeyCode !== 'undefined') state.zoomActivationKeyCode = opts.zoomActivationKeyCode
    if (typeof opts.multiSelectionKeyCode !== 'undefined') state.multiSelectionKeyCode = opts.multiSelectionKeyCode
    if (typeof opts.snapToGrid !== 'undefined') state.snapToGrid = opts.snapToGrid
    if (typeof opts.snapGrid !== 'undefined') state.snapGrid = opts.snapGrid
    if (typeof opts.nodeExtent !== 'undefined') state.nodeExtent = opts.nodeExtent
    if (typeof opts.maxZoom !== 'undefined') state.maxZoom = opts.maxZoom
    if (typeof opts.minZoom !== 'undefined') state.minZoom = opts.minZoom
    if (typeof opts.translateExtent !== 'undefined') state.translateExtent = opts.translateExtent
    if (typeof opts.applyDefault !== 'undefined') state.applyDefault = opts.applyDefault
    if (typeof opts.fitViewOnInit !== 'undefined') state.fitViewOnInit = opts.fitViewOnInit
  }

  return state
}
