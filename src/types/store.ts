import { Store } from 'pinia'
import { Dimensions, ElementId, Elements, Rect, SelectionRect, SnapGrid, Transform, XYPosition } from './types'
import { HandleType } from './handle'
import { ConnectionMode, OnConnectEndFunc, OnConnectFunc, OnConnectStartFunc, OnConnectStopFunc } from './connection'
import { Edge } from './edge'
import { Node, NodeExtent, TranslateExtent } from './node'
import { RevueFlowActions } from './actions'
import { D3Selection, D3Zoom, D3ZoomHandler } from '~/types/panel'

export interface FlowState {
  dimensions: Dimensions
  transform: Transform
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

  revueFlowVersion: string

  onConnect?: OnConnectFunc
  onConnectStart?: OnConnectStartFunc
  onConnectStop?: OnConnectStopFunc
  onConnectEnd?: OnConnectEndFunc
}

export type FlowStore = Store<string, FlowState, any, RevueFlowActions>
