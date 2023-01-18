import type { EventHook, EventHookOn, EventHookTrigger } from '@vueuse/core'
import type { D3ZoomEvent } from 'd3-zoom'
import type { GraphEdge } from './edge'
import type { GraphNode } from './node'
import type { Connection, OnConnectStartParams } from './connection'
import type { ViewportTransform } from './zoom'
import type { EdgeChange, NodeChange } from './changes'
import type { VueFlowStore } from './store'
import type { FlowElements } from './flow'

export type MouseTouchEvent = MouseEvent | TouchEvent | PointerEvent

export interface NodeMouseEvent {
  event: MouseTouchEvent
  node: GraphNode
  connectedEdges: GraphEdge[]
}

export interface NodeDragEvent {
  event: MouseEvent
  node: GraphNode
  nodes: GraphNode[]
  intersections?: GraphNode[]
}

export interface EdgeMouseEvent {
  event: MouseEvent
  edge: GraphEdge
}

export interface EdgeUpdateEvent {
  edge: GraphEdge
  connection: Connection
}

export interface FlowEvents {
  nodesChange: NodeChange[]
  edgesChange: EdgeChange[]
  nodeDoubleClick: NodeMouseEvent
  nodeClick: NodeMouseEvent
  nodeMouseEnter: NodeMouseEvent
  nodeMouseMove: NodeMouseEvent
  nodeMouseLeave: NodeMouseEvent
  nodeContextMenu: NodeMouseEvent
  nodeDragStart: NodeDragEvent
  nodeDrag: NodeDragEvent
  nodeDragStop: NodeDragEvent
  nodesInitialized: GraphNode[]
  updateNodeInternals: string[]
  miniMapNodeClick: NodeMouseEvent
  miniMapNodeDoubleClick: NodeMouseEvent
  miniMapNodeMouseEnter: NodeMouseEvent
  miniMapNodeMouseMove: NodeMouseEvent
  miniMapNodeMouseLeave: NodeMouseEvent
  connect: Connection
  connectStart: {
    event?: MouseEvent | TouchEvent
  } & OnConnectStartParams
  connectEnd: MouseEvent | TouchEvent | undefined
  paneReady: VueFlowStore
  move: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: ViewportTransform }
  moveStart: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: ViewportTransform }
  moveEnd: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: ViewportTransform }
  selectionDragStart: NodeDragEvent
  selectionDrag: NodeDragEvent
  selectionDragStop: NodeDragEvent
  selectionContextMenu: { event: MouseEvent; nodes: GraphNode[] }
  selectionStart: MouseEvent
  selectionEnd: MouseEvent
  viewportChangeStart: ViewportTransform
  viewportChange: ViewportTransform
  viewportChangeEnd: ViewportTransform
  paneScroll: WheelEvent | undefined
  paneClick: MouseEvent
  paneContextMenu: MouseEvent
  paneMouseEnter: MouseEvent
  paneMouseMove: MouseEvent
  paneMouseLeave: MouseEvent
  edgeContextMenu: EdgeMouseEvent
  edgeMouseEnter: EdgeMouseEvent
  edgeMouseMove: EdgeMouseEvent
  edgeMouseLeave: EdgeMouseEvent
  edgeDoubleClick: EdgeMouseEvent
  edgeClick: EdgeMouseEvent
  edgeUpdateStart: EdgeMouseEvent
  edgeUpdate: EdgeUpdateEvent
  edgeUpdateEnd: EdgeMouseEvent
}

export interface Emits {
  (event: 'nodesChange', changes: NodeChange[]): void
  (event: 'edgesChange', changes: EdgeChange[]): void
  (event: 'nodeDoubleClick', nodeMouseEvent: NodeMouseEvent): void
  (event: 'nodeClick', nodeMouseEvent: NodeMouseEvent): void
  (event: 'nodeMouseEnter', nodeMouseEvent: NodeMouseEvent): void
  (event: 'nodeMouseMove', nodeMouseEvent: NodeMouseEvent): void
  (event: 'nodeMouseLeave', nodeMouseEvent: NodeMouseEvent): void
  (event: 'nodeContextMenu', nodeMouseEvent: NodeMouseEvent): void
  (event: 'nodeDragStart', nodeDragEvent: NodeDragEvent): void
  (event: 'nodeDrag', nodeDragEvent: NodeDragEvent): void
  (event: 'nodeDragStop', nodeDragEvent: NodeDragEvent): void
  (event: 'nodesInitialized'): void
  (event: 'miniMapNodeClick', nodeMouseEvent: NodeMouseEvent): void
  (event: 'miniMapNodeDoubleClick', nodeMouseEvent: NodeMouseEvent): void
  (event: 'miniMapNodeMouseEnter', nodeMouseEvent: NodeMouseEvent): void
  (event: 'miniMapNodeMouseMove', nodeMouseEvent: NodeMouseEvent): void
  (event: 'miniMapNodeMouseLeave', nodeMouseEvent: NodeMouseEvent): void
  (event: 'connect', connectionEvent: Connection): void
  (
    event: 'connectStart',
    connectionEvent: {
      event?: MouseEvent
    } & OnConnectStartParams,
  ): void
  (event: 'connectEnd', connectionEvent?: MouseEvent): void
  (event: 'moveStart', moveEvent: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: ViewportTransform }): void
  (event: 'move', moveEvent: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: ViewportTransform }): void
  (event: 'moveEnd', moveEvent: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: ViewportTransform }): void
  (event: 'selectionDragStart', selectionEvent: NodeDragEvent): void
  (event: 'selectionDrag', selectionEvent: NodeDragEvent): void
  (event: 'selectionDragStop', selectionEvent: NodeDragEvent): void
  (event: 'selectionContextMenu', selectionEvent: { event: MouseEvent; nodes: GraphNode[] }): void
  (event: 'selectionStart', selectionEvent: MouseEvent): void
  (event: 'selectionEnd', selectionEvent: MouseEvent): void
  (event: 'viewportChangeStart', viewport: ViewportTransform): void
  (event: 'viewportChange', viewport: ViewportTransform): void
  (event: 'viewportChangeEnd', viewport: ViewportTransform): void
  (event: 'paneReady', paneEvent: VueFlowStore): void
  (event: 'paneScroll', paneEvent: WheelEvent | undefined): void
  (event: 'paneClick', paneEvent: MouseEvent): void
  (event: 'paneContextMenu', paneEvent: MouseEvent): void
  (event: 'paneMouseEnter', paneEvent: MouseEvent): void
  (event: 'paneMouseMove', paneEvent: MouseEvent): void
  (event: 'paneMouseLeave', paneEvent: MouseEvent): void
  (event: 'edgeContextMenu', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'edgeMouseEnter', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'edgeMouseMove', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'edgeMouseLeave', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'edgeDoubleClick', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'edgeClick', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'edgeUpdateStart', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'edgeUpdate', edgeUpdateEvent: EdgeUpdateEvent): void
  (event: 'edgeUpdateEnd', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'updateNodeInternals'): void

  /** v-model event definitions */
  (event: 'update:modelValue', value: FlowElements): void
  (event: 'update:nodes', value: GraphNode[]): void
  (event: 'update:edges', value: GraphEdge[]): void
}

export type FlowHooks = Readonly<{
  [key in keyof FlowEvents]: EventHook<FlowEvents[key]>
}>

export type FlowHooksOn = Readonly<{
  [key in keyof FlowEvents as `on${Capitalize<key>}`]: EventHookOn<FlowEvents[key]>
}>

export type FlowHooksEmit = Readonly<{
  [key in keyof FlowEvents]: EventHookTrigger<FlowEvents[key]>
}>

/**
 * To type `Args` (the event callback arguments) pass an array as argument list as first generic type
 * To type `Return` (the event callback return value) pass a value to the second generic type
 */
export type CustomEvent<Args extends any[] = any[], Return = any> = (...args: Args) => Return

type CustomEventHandlers<CustomEvents = {}> = {
  [key in keyof CustomEvents]: CustomEvents[key]
}

export type NodeEventsHandler<CustomEvents = {}> = {
  doubleClick: (event: NodeMouseEvent) => void | { off: () => void }
  click: (event: NodeMouseEvent) => void | { off: () => void }
  mouseEnter: (event: NodeMouseEvent) => void | { off: () => void }
  mouseMove: (event: NodeMouseEvent) => void | { off: () => void }
  mouseLeave: (event: NodeMouseEvent) => void | { off: () => void }
  contextMenu: (event: NodeMouseEvent) => void | { off: () => void }
  dragStart: (event: NodeDragEvent) => void | { off: () => void }
  drag: (event: NodeDragEvent) => void | { off: () => void }
  dragStop: (event: NodeDragEvent) => void | { off: () => void }
} & CustomEventHandlers<CustomEvents>

export type NodeEventsOn<CustomEvents = {}> = {
  [key in keyof NodeEventsHandler]: EventHookOn<NodeEventsHandler[key] extends (event: infer Event) => any ? Event : never>
} & CustomEventHandlers<CustomEvents>

export type NodeEventsEmit<CustomEvents = {}> = {
  [key in keyof NodeEventsHandler]: EventHookTrigger<NodeEventsHandler[key] extends (event: infer Event) => any ? Event : never>
} & CustomEventHandlers<CustomEvents>

export type EdgeEventsHandler<CustomEvents = {}> = {
  doubleClick: (event: EdgeMouseEvent) => void | { off: () => void }
  click: (event: EdgeMouseEvent) => void | { off: () => void }
  mouseEnter: (event: EdgeMouseEvent) => void | { off: () => void }
  mouseMove: (event: EdgeMouseEvent) => void | { off: () => void }
  mouseLeave: (event: EdgeMouseEvent) => void | { off: () => void }
  contextMenu: (event: EdgeMouseEvent) => void | { off: () => void }
  updateStart: (event: EdgeMouseEvent) => void | { off: () => void }
  update: (event: EdgeUpdateEvent) => void | { off: () => void }
  updateEnd: (event: EdgeMouseEvent) => void | { off: () => void }
} & CustomEventHandlers<CustomEvents>

export type EdgeEventsOn<CustomEvents = {}> = {
  [key in keyof EdgeEventsHandler]: EventHookOn<EdgeEventsHandler[key] extends (event: infer Event) => any ? Event : never>
} & CustomEventHandlers<CustomEvents>

export type EdgeEventsEmit<CustomEvents = {}> = {
  [key in keyof EdgeEventsHandler]: EventHookTrigger<EdgeEventsHandler[key] extends (event: infer Event) => any ? Event : never>
} & CustomEventHandlers<CustomEvents>
