import type { EventHookOn, EventHookTrigger } from '@vueuse/core'
import type { Viewport } from '@xyflow/system'
import type { EventHookExtended, VueFlowError } from '../utils'
import type { GraphEdge } from './edge'
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

export interface EdgeMouseEvent {
  event: MouseTouchEvent
  edge: GraphEdge
}

export interface EdgeUpdateEvent {
  event: MouseTouchEvent
  edge: GraphEdge
  connection: Connection
}

export interface FlowEvents<NodeType extends Node = Node> {
  nodesChange: NodeChange<NodeType>[]
  edgesChange: EdgeChange[]
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
  /** @deprecated use `init` instead */
  paneReady: VueFlowStore
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
  edgeContextMenu: EdgeMouseEvent
  edgeMouseEnter: EdgeMouseEvent
  edgeMouseMove: EdgeMouseEvent
  edgeMouseLeave: EdgeMouseEvent
  edgeDoubleClick: EdgeMouseEvent
  edgeClick: EdgeMouseEvent
  edgeUpdateStart: EdgeMouseEvent
  edgeUpdate: EdgeUpdateEvent
  edgeUpdateEnd: EdgeMouseEvent
  error: VueFlowError
}

export type FlowHooks<NodeType extends Node = Node> = Readonly<{
  [key in keyof FlowEvents<NodeType>]: EventHookExtended<FlowEvents<NodeType>[key]>
}>

export type FlowHooksOn<NodeType extends Node = Node> = Readonly<{
  [key in keyof FlowEvents<NodeType> as `on${Capitalize<key>}`]: EventHookOn<FlowEvents<NodeType>[key]>
}>

export type FlowHooksEmit<NodeType extends Node = Node> = Readonly<{
  [key in keyof FlowEvents<NodeType>]: EventHookTrigger<FlowEvents<NodeType>[key]>
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

export interface EdgeEventsHandler {
  doubleClick: (event: EdgeMouseEvent) => void | { off: () => void }
  click: (event: EdgeMouseEvent) => void | { off: () => void }
  mouseEnter: (event: EdgeMouseEvent) => void | { off: () => void }
  mouseMove: (event: EdgeMouseEvent) => void | { off: () => void }
  mouseLeave: (event: EdgeMouseEvent) => void | { off: () => void }
  contextMenu: (event: EdgeMouseEvent) => void | { off: () => void }
  updateStart: (event: EdgeMouseEvent) => void | { off: () => void }
  update: (event: EdgeUpdateEvent) => void | { off: () => void }
  updateEnd: (event: EdgeMouseEvent) => void | { off: () => void }
}

export type EdgeEventsOn = {
  [key in keyof EdgeEventsHandler]: EventHookOn<EdgeEventsHandler[key] extends (event: infer Event) => any ? Event : never>
}

export type EdgeEventsEmit = {
  [key in keyof EdgeEventsHandler]: EventHookTrigger<EdgeEventsHandler[key] extends (event: infer Event) => any ? Event : never>
}
