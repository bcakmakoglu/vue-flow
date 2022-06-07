import type { EventHook, EventHookOn, EventHookTrigger } from '@vueuse/core'
import type { D3ZoomEvent } from 'd3-zoom'
import type { GraphEdge } from './edge'
import type { GraphNode } from './node'
import type { Connection, OnConnectStartParams } from './connection'
import type { ViewpaneTransform } from './zoom'
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
  miniMapNodeClick: NodeMouseEvent
  miniMapNodeDoubleClick: NodeMouseEvent
  miniMapNodeMouseEnter: NodeMouseEvent
  miniMapNodeMouseMove: NodeMouseEvent
  miniMapNodeMouseLeave: NodeMouseEvent
  connect: Connection
  connectStart: {
    event: MouseEvent
  } & OnConnectStartParams
  connectStop: MouseEvent
  connectEnd: MouseEvent
  paneReady: VueFlowStore
  move: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: ViewpaneTransform }
  moveStart: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: ViewpaneTransform }
  moveEnd: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: ViewpaneTransform }
  selectionDragStart: NodeDragEvent
  selectionDrag: NodeDragEvent
  selectionDragStop: NodeDragEvent
  selectionContextMenu: { event: MouseEvent; nodes: GraphNode[] }
  paneScroll: WheelEvent | undefined
  paneClick: MouseEvent
  paneContextMenu: MouseEvent
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
 * Vue Flow component event emitter definitions
 */
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
  (event: 'miniMapNodeClick', nodeMouseEvent: NodeMouseEvent): void
  (event: 'miniMapNodeDoubleClick', nodeMouseEvent: NodeMouseEvent): void
  (event: 'miniMapNodeMouseEnter', nodeMouseEvent: NodeMouseEvent): void
  (event: 'miniMapNodeMouseMove', nodeMouseEvent: NodeMouseEvent): void
  (event: 'miniMapNodeMouseLeave', nodeMouseEvent: NodeMouseEvent): void
  (event: 'connect', connectionEvent: Connection): void
  (
    event: 'connectStart',
    connectionEvent: {
      event: MouseEvent
    } & OnConnectStartParams,
  ): void
  (event: 'connectStop', connectionEvent: MouseEvent): void
  (event: 'connectEnd', connectionEvent: MouseEvent): void
  (event: 'moveStart', moveEvent: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: ViewpaneTransform }): void
  (event: 'move', moveEvent: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: ViewpaneTransform }): void
  (event: 'moveEnd', moveEvent: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: ViewpaneTransform }): void
  (event: 'selectionDragStart', selectionEvent: NodeDragEvent): void
  (event: 'selectionDrag', selectionEvent: NodeDragEvent): void
  (event: 'selectionDragStop', selectionEvent: NodeDragEvent): void
  (event: 'selectionContextMenu', selectionEvent: { event: MouseEvent; nodes: GraphNode[] }): void
  (event: 'paneReady', paneEvent: VueFlowStore): void
  (event: 'paneScroll', paneEvent: WheelEvent | undefined): void
  (event: 'paneClick', paneEvent: MouseEvent): void
  (event: 'paneContextMenu', paneEvent: MouseEvent): void
  (event: 'edgeContextMenu', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'edgeMouseEnter', edgeMouseEvent: EdgeMouseEvent): void
  (event: 'edgeMouseMove', edgeMouseEvent: MouseEvent): void
  (event: 'edgeMouseLeave', edgeMouseEvent: MouseEvent): void
  (event: 'edgeDoubleClick', edgeMouseEvent: MouseEvent): void
  (event: 'edgeClick', edgeMouseEvent: MouseEvent): void
  (event: 'edgeUpdateStart', edgeMouseEvent: MouseEvent): void
  (event: 'edgeUpdate', edgeMouseEvent: MouseEvent): void
  (event: 'edgeUpdateEnd', edgeMouseEvent: MouseEvent): void

  /** v-model event definitions */
  (event: 'update:modelValue', value: FlowElements): void
  (event: 'update:nodes', value: GraphNode[]): void
  (event: 'update:edges', value: GraphEdge[]): void
}
