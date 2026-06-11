import type { Viewport } from '@xyflow/system'
import type { EventHookExtended, EventHookOn, EventHookTrigger, VueFlowError } from '../utils'
import type { Edge } from './edge'
import type { GraphNode, Node } from './node'
import type { Connection, OnConnectStartParams } from './connection'
import type { EdgeChange, NodeChange } from './changes'
import type { VueFlowStore } from './store'

export type MouseTouchEvent = MouseEvent | TouchEvent

export interface NodeMouseEvent<NodeType extends Node = Node> {
  event: MouseTouchEvent
  node: GraphNode<NodeType>
}

export interface NodeDragEvent<NodeType extends Node = Node> {
  event: MouseTouchEvent
  node: GraphNode<NodeType>
  nodes: GraphNode<NodeType>[]
}

export interface EdgeMouseEvent<EdgeType extends Edge = Edge> {
  event: MouseTouchEvent
  edge: EdgeType
}

export interface EdgeUpdateEvent<EdgeType extends Edge = Edge> {
  event: MouseTouchEvent
  edge: EdgeType
  connection: Connection
}

export interface FlowEvents<NodeType extends Node = Node, EdgeType extends Edge = Edge> {
  nodesChange: NodeChange<NodeType>[]
  edgesChange: EdgeChange<EdgeType>[]
  nodeDoubleClick: NodeMouseEvent<NodeType>
  nodeClick: NodeMouseEvent<NodeType>
  nodeMouseEnter: NodeMouseEvent<NodeType>
  nodeMouseMove: NodeMouseEvent<NodeType>
  nodeMouseLeave: NodeMouseEvent<NodeType>
  nodeContextMenu: NodeMouseEvent<NodeType>
  nodeDragStart: NodeDragEvent<NodeType>
  nodeDrag: NodeDragEvent<NodeType>
  nodeDragStop: NodeDragEvent<NodeType>
  nodesInitialized: GraphNode[]
  updateNodeInternals: string[]
  miniMapNodeClick: NodeMouseEvent<NodeType>
  miniMapNodeDoubleClick: NodeMouseEvent<NodeType>
  miniMapNodeMouseEnter: NodeMouseEvent<NodeType>
  miniMapNodeMouseMove: NodeMouseEvent<NodeType>
  miniMapNodeMouseLeave: NodeMouseEvent<NodeType>
  connect: Connection
  connectStart: {
    event?: MouseEvent | TouchEvent
  } & OnConnectStartParams
  connectEnd: MouseEvent | TouchEvent | undefined
  clickConnectStart: {
    event?: MouseEvent | TouchEvent
  } & OnConnectStartParams
  clickConnectEnd: MouseEvent | TouchEvent | undefined
  init: VueFlowStore
  move: { event: MouseTouchEvent | null; viewport: Viewport }
  moveStart: { event: MouseTouchEvent | null; viewport: Viewport }
  moveEnd: { event: MouseTouchEvent | null; viewport: Viewport }
  selectionDragStart: NodeDragEvent<NodeType>
  selectionDrag: NodeDragEvent<NodeType>
  selectionDragStop: NodeDragEvent<NodeType>
  selectionContextMenu: { event: MouseEvent; nodes: GraphNode[] }
  selectionStart: MouseEvent
  selectionEnd: MouseEvent
  viewportChangeStart: Viewport
  viewportChange: Viewport
  viewportChangeEnd: Viewport
  paneScroll: WheelEvent | undefined
  paneClick: MouseEvent
  paneContextMenu: MouseEvent
  paneMouseEnter: PointerEvent
  paneMouseMove: PointerEvent
  paneMouseLeave: PointerEvent
  edgeContextMenu: EdgeMouseEvent<EdgeType>
  edgeMouseEnter: EdgeMouseEvent<EdgeType>
  edgeMouseMove: EdgeMouseEvent<EdgeType>
  edgeMouseLeave: EdgeMouseEvent<EdgeType>
  edgeDoubleClick: EdgeMouseEvent<EdgeType>
  edgeClick: EdgeMouseEvent<EdgeType>
  edgeUpdateStart: EdgeMouseEvent<EdgeType>
  edgeUpdate: EdgeUpdateEvent<EdgeType>
  edgeUpdateEnd: EdgeMouseEvent<EdgeType>
  error: VueFlowError
}

export type FlowHooks<NodeType extends Node = Node, EdgeType extends Edge = Edge> = Readonly<{
  [key in keyof FlowEvents<NodeType, EdgeType>]: EventHookExtended<FlowEvents<NodeType, EdgeType>[key]>
}>

export type FlowHooksOn<NodeType extends Node = Node, EdgeType extends Edge = Edge> = Readonly<{
  [key in keyof FlowEvents<NodeType, EdgeType> as `on${Capitalize<key>}`]: EventHookOn<FlowEvents<NodeType, EdgeType>[key]>
}>

export type FlowHooksEmit<NodeType extends Node = Node, EdgeType extends Edge = Edge> = Readonly<{
  [key in keyof FlowEvents<NodeType, EdgeType>]: EventHookTrigger<FlowEvents<NodeType, EdgeType>[key]>
}>

export interface NodeEventsHandler<NodeType extends Node = Node> {
  doubleClick: (event: NodeMouseEvent<NodeType>) => void | { off: () => void }
  click: (event: NodeMouseEvent<NodeType>) => void | { off: () => void }
  mouseEnter: (event: NodeMouseEvent<NodeType>) => void | { off: () => void }
  mouseMove: (event: NodeMouseEvent<NodeType>) => void | { off: () => void }
  mouseLeave: (event: NodeMouseEvent<NodeType>) => void | { off: () => void }
  contextMenu: (event: NodeMouseEvent<NodeType>) => void | { off: () => void }
  dragStart: (event: NodeDragEvent<NodeType>) => void | { off: () => void }
  drag: (event: NodeDragEvent<NodeType>) => void | { off: () => void }
  dragStop: (event: NodeDragEvent<NodeType>) => void | { off: () => void }
}

export type NodeEventsOn<NodeType extends Node = Node> = {
  [key in keyof NodeEventsHandler<NodeType>]: EventHookOn<
    NodeEventsHandler<NodeType>[key] extends (event: infer Event) => any ? Event : never
  >
}

export type NodeEventsEmit<NodeType extends Node = Node> = {
  [key in keyof NodeEventsHandler<NodeType>]: EventHookTrigger<
    NodeEventsHandler<NodeType>[key] extends (event: infer Event) => any ? Event : never
  >
}

export interface EdgeEventsHandler<EdgeType extends Edge = Edge> {
  doubleClick: (event: EdgeMouseEvent<EdgeType>) => void | { off: () => void }
  click: (event: EdgeMouseEvent<EdgeType>) => void | { off: () => void }
  mouseEnter: (event: EdgeMouseEvent<EdgeType>) => void | { off: () => void }
  mouseMove: (event: EdgeMouseEvent<EdgeType>) => void | { off: () => void }
  mouseLeave: (event: EdgeMouseEvent<EdgeType>) => void | { off: () => void }
  contextMenu: (event: EdgeMouseEvent<EdgeType>) => void | { off: () => void }
  updateStart: (event: EdgeMouseEvent<EdgeType>) => void | { off: () => void }
  update: (event: EdgeUpdateEvent<EdgeType>) => void | { off: () => void }
  updateEnd: (event: EdgeMouseEvent<EdgeType>) => void | { off: () => void }
}

export type EdgeEventsOn<EdgeType extends Edge = Edge> = {
  [key in keyof EdgeEventsHandler<EdgeType>]: EventHookOn<
    EdgeEventsHandler<EdgeType>[key] extends (event: infer Event) => any ? Event : never
  >
}

export type EdgeEventsEmit<EdgeType extends Edge = Edge> = {
  [key in keyof EdgeEventsHandler<EdgeType>]: EventHookTrigger<
    EdgeEventsHandler<EdgeType>[key] extends (event: infer Event) => any ? Event : never
  >
}
