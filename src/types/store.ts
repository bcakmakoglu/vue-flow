import { ZoomBehavior, Selection } from 'd3'
import { Store } from 'pinia'
import { ElementId, Elements, Rect, SelectionRect, SnapGrid, Transform, XYPosition } from './types'
import { HandleType } from './handle'
import { ConnectionMode, OnConnectEndFunc, OnConnectFunc, OnConnectStartFunc, OnConnectStopFunc } from './connection'
import { Edge } from './edge'
import { Node, NodeExtent, TranslateExtent } from './node'
import { RevueFlowActions } from './actions'

export interface RevueFlowState {
  width: number
  height: number
  transform: Transform
  nodes: Node[]
  edges: Edge[]
  selectedElements: Elements | null
  selectedNodesBbox: Rect

  d3Zoom: ZoomBehavior<Element, unknown> | null
  d3Selection: Selection<Element, unknown, null, undefined> | null
  d3ZoomHandler: ((this: Element, event: any, d: unknown) => void) | undefined
  minZoom: number
  maxZoom: number
  translateExtent: TranslateExtent
  nodeExtent: NodeExtent

  nodesSelectionActive: boolean
  selectionActive: boolean

  userSelectionRect: SelectionRect

  connectionNodeId: ElementId | null
  connectionHandleId: ElementId | null
  connectionHandleType: HandleType | null
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

export type RevueFlowStore = Store<string, RevueFlowState, any, RevueFlowActions>
