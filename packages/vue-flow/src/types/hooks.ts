import type { EventHook, EventHookOn, EventHookTrigger } from '@vueuse/core'
import type { MouseTouchEvent } from '@braks/revue-draggable'
import type { D3ZoomEvent } from 'd3-zoom'
import type { FlowInstance } from './flow'
import type { GraphEdge } from './edge'
import type { GraphNode } from './node'
import type { Connection, OnConnectStartParams } from './connection'
import type { FlowTransform } from './zoom'
import type { EdgeChange, NodeChange } from './changes'

export interface NodeMouseEvent {
  event: MouseTouchEvent
  node: GraphNode
  connectedEdges: GraphEdge[]
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
  nodeDragStart: NodeMouseEvent
  nodeDrag: NodeMouseEvent
  nodeDragStop: NodeMouseEvent
  miniMapNodeClick: NodeMouseEvent
  miniMapNodeDoubleClick: NodeMouseEvent
  miniMapNodeMouseEnter: { event: MouseEvent; node: GraphNode }
  miniMapNodeMouseMove: { event: MouseEvent; node: GraphNode }
  miniMapNodeMouseLeave: { event: MouseEvent; node: GraphNode }
  connect: Connection
  connectStart: {
    event: MouseEvent
  } & OnConnectStartParams
  connectStop: MouseEvent
  connectEnd: MouseEvent
  paneReady: FlowInstance
  move: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: FlowTransform }
  moveStart: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: FlowTransform }
  moveEnd: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: FlowTransform }
  selectionDragStart: { event: MouseTouchEvent; nodes: GraphNode[] }
  selectionDrag: { event: MouseTouchEvent; nodes: GraphNode[] }
  selectionDragStop: { event: MouseTouchEvent; nodes: GraphNode[] }
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

export type EmitFunc = (name: keyof FlowHooks, ...args: FlowEvents[keyof FlowEvents][]) => void
