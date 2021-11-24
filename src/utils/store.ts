import { isEdge, isNode, parseEdge, parseNode } from './graph'
import {
  ConnectionMode,
  Elements,
  FlowState,
  NodeExtent,
  GraphNode,
  PanOnScrollMode,
  DefaultNodeTypes,
  DefaultEdgeTypes,
  GraphEdge,
} from '~/types'
import { DefaultNode, InputNode, OutputNode, BezierEdge, SmoothStepEdge, StepEdge, StraightEdge } from '~/components'
import { createHooks } from '~/composables'

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

export const initialState = (): FlowState => ({
  dimensions: {
    width: 0,
    height: 0,
  },
  transform: [0, 0, 1],
  elements: [],
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
  preventScrolling: true,
  zoomOnScroll: true,
  zoomOnPinch: true,
  zoomOnDoubleClick: true,
  panOnScroll: false,
  panOnScrollSpeed: 0.5,
  panOnScrollMode: PanOnScrollMode.Free,
  paneMoveable: true,
  edgeUpdaterRadius: 10,

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

  arrowHeadColor: '#b1b1b7',
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
  loading: false,

  vueFlowVersion: typeof __VUE_FLOW_VERSION__ !== 'undefined' ? __VUE_FLOW_VERSION__ : '-',
})

export const parseElements = (elements: Elements, nodes: GraphNode[], edges: GraphEdge[], nodeExtent: NodeExtent) => {
  const parsedElements = []
  for (const element of elements) {
    if (isNode(element)) {
      const storeNode = nodes[nodes.map((x) => x.id).indexOf(element.id)]

      if (storeNode) {
        const updatedNode = {
          ...storeNode,
          ...element,
        } as GraphNode

        if (typeof element.type !== 'undefined' && element.type !== storeNode.type) {
          // we reset the elements dimensions here in order to force a re-calculation of the bounds.
          // When the type of a node changes it is possible that the number or positions of handles changes too.
          updatedNode.__vf.width = 0
        }

        parsedElements.push(updatedNode)
      } else {
        parsedElements.push(parseNode(element, nodeExtent))
      }
    } else if (isEdge(element)) {
      const storeEdge = edges[edges.map((x) => x.id).indexOf(element.id)]

      if (storeEdge) {
        parsedElements.push({
          ...storeEdge,
          ...element,
        } as GraphEdge)
      } else {
        parsedElements.push(parseEdge(element))
      }
    }
  }
  return parsedElements
}
const isObject = (val: any) => val !== null && typeof val === 'object'
const isArray = Array.isArray

const smartUnref = (val: any) => {
  if (val !== null && !isRef(val) && typeof val === 'object') {
    // eslint-disable-next-line no-use-before-define
    return deepUnref(val)
  }

  return unref(val)
}

const unrefArray = (arr: any[]) => {
  const unreffed: any[] = []

  arr.forEach((val) => {
    unreffed.push(smartUnref(val))
  })

  return unreffed
}

const unrefObject = (obj: Record<string, any>) => {
  const unreffed: Record<string, any> = {}

  Object.keys(obj).forEach((key) => {
    unreffed[key] = smartUnref(obj[key])
  })

  return unreffed
}

export const deepUnref = (val: any) => {
  const checkedVal = isRef(val) ? unref(val) : val

  if (!isObject(checkedVal)) {
    return checkedVal
  }

  if (isArray(checkedVal)) {
    return unrefArray(checkedVal)
  }

  return unrefObject(checkedVal)
}
