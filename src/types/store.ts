import { Store } from 'pinia'
import { Dimensions, ElementId, Elements, FlowOptions, Rect, SelectionRect, SnapGrid, Transform, XYPosition } from './types'
import { HandleType } from './handle'
import { ConnectionMode, OnConnectEndFunc, OnConnectFunc, OnConnectStartFunc, OnConnectStopFunc } from './connection'
import { Edge, EdgeType } from './edge'
import { Node, NodeExtent, NodeType, TranslateExtent } from './node'
import { FlowActions } from './actions'
import { D3Selection, D3Zoom, D3ZoomHandler } from './panel'
import { FlowHooks } from './hooks'

export interface FlowState extends FlowOptions {
  dimensions: Dimensions
  transform: Transform
  elements: Elements
  nodes: Node[]
  nodeTypes: Record<string, NodeType> | string[]
  edges: Edge[]
  edgeTypes: Record<string, EdgeType> | string[]
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
}

export type FlowStore = Store<string, FlowState, any, FlowActions>
