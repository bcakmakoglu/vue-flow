import { Store } from 'pinia'
import {
  Dimensions,
  ElementId,
  Elements,
  FlowInstance,
  FlowOptions,
  Rect,
  SelectionRect,
  SnapGrid,
  Transform,
  XYPosition,
} from './types'
import { HandleType } from './handle'
import { ConnectionMode, OnConnectEndFunc, OnConnectFunc, OnConnectStartFunc, OnConnectStopFunc } from './connection'
import { Edge, EdgeTypes } from './edge'
import { Node, NodeExtent, NodeTypes, TranslateExtent } from './node'
import { FlowActions } from './actions'
import { D3Selection, D3Zoom, D3ZoomHandler } from './panel'
import { FlowHooks } from './hooks'

export interface FlowState extends FlowOptions {
  elements: Elements
  nodes: Node[]
  edges: Edge[]
  selectedElements?: Elements
  selectedNodesBbox: Rect

  d3Zoom?: D3Zoom
  d3Selection?: D3Selection
  d3ZoomHandler?: D3ZoomHandler
  minZoom: number
  maxZoom: number
  translateExtent: TranslateExtent
  nodeExtent: NodeExtent
  dimensions: Dimensions
  transform: Transform

  nodesSelectionActive: boolean
  selectionActive: boolean
  userSelectionRect: SelectionRect
  multiSelectionActive: boolean

  connectionNodeId?: ElementId
  connectionHandleId?: ElementId
  connectionHandleType?: HandleType
  connectionPosition: XYPosition
  connectionMode: ConnectionMode

  snapToGrid: boolean
  snapGrid: SnapGrid

  nodesDraggable: boolean
  nodesConnectable: boolean
  elementsSelectable: boolean

  onConnect?: OnConnectFunc
  onConnectStart?: OnConnectStartFunc
  onConnectStop?: OnConnectStopFunc
  onConnectEnd?: OnConnectEndFunc

  isReady: boolean
  hooks: FlowHooks
  instance?: FlowInstance

  vueFlowVersion: string
}

export interface FlowGetters {
  getEdgeTypes: () => EdgeTypes
  getNodeTypes: () => NodeTypes
  getNodes: () => Node[]
  getEdges: () => Edge[]
}

export type FlowStore = Store<string, FlowState, FlowGetters, FlowActions>
