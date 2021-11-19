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
  dimensions: Dimensions
  transform: Transform
  elements: Elements
  nodes: Node[]
  nodeTypes: NodeTypes
  edges: Edge[]
  edgeTypes: EdgeTypes
  selectedElements?: Elements
  selectedNodesBbox: Rect

  d3Zoom?: D3Zoom
  d3Selection?: D3Selection
  d3ZoomHandler?: D3ZoomHandler
  minZoom: number
  maxZoom: number
  translateExtent: TranslateExtent
  nodeExtent: NodeExtent

  nodesSelectionActive: boolean
  selectionActive: boolean

  userSelectionRect: SelectionRect

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

  multiSelectionActive: boolean

  vueFlowVersion: string

  onConnect?: OnConnectFunc
  onConnectStart?: OnConnectStartFunc
  onConnectStop?: OnConnectStopFunc
  onConnectEnd?: OnConnectEndFunc

  isReady: boolean
  hooks: FlowHooks
  storageKey?: string
  instance?: FlowInstance
}

export interface FlowGetters {
  getEdgeTypes: () => EdgeTypes
  getNodeTypes: () => NodeTypes
  getNodes: () => Node[]
  getEdges: () => Edge[]
}

export type FlowStore = Store<string, FlowState, FlowGetters, FlowActions>
