import { ConnectionMode, EdgeType, FlowState, NodeType } from '~/types'
import { createHooks } from '~/composables'
import { DefaultNode, InputNode, OutputNode } from '~/components/Nodes'
import { BezierEdge, SmoothStepEdge, StepEdge, StraightEdge } from '~/components/Edges'

export const defaultNodeTypes: Record<string, NodeType> = {
  input: InputNode as NodeType,
  default: DefaultNode as NodeType,
  output: OutputNode as NodeType,
}

export const defaultEdgeTypes: Record<string, EdgeType> = {
  default: BezierEdge as EdgeType,
  straight: StraightEdge as EdgeType,
  step: StepEdge as EdgeType,
  smoothstep: SmoothStepEdge as EdgeType,
}

export const initialState = (): FlowState => ({
  dimensions: {
    width: 0,
    height: 0,
  },
  transform: [0, 0, 1],
  nodeTypes: defaultNodeTypes,
  edgeTypes: defaultEdgeTypes,
  elements: [],
  nodes: [],
  edges: [],
  selectedElements: undefined,
  selectedNodesBbox: { x: 0, y: 0, width: 0, height: 0 },

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

  nodesSelectionActive: false,
  selectionActive: false,

  userSelectionRect: {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    draw: false,
  },
  connectionNodeId: undefined,
  connectionHandleId: undefined,
  connectionHandleType: 'source',
  connectionPosition: { x: NaN, y: NaN },
  connectionMode: ConnectionMode.Loose,

  snapGrid: [15, 15],
  snapToGrid: false,

  nodesDraggable: true,
  nodesConnectable: true,
  elementsSelectable: true,

  multiSelectionActive: false,

  isReady: false,
  hooks: createHooks(),
  storageKey: undefined,

  vueFlowVersion: typeof __VUE_FLOW_VERSION__ !== 'undefined' ? __VUE_FLOW_VERSION__ : '-',
})

export { default as useFlowStore } from './flowStore'
