import { EventHook, EventHookOn, EventHookTrigger } from '@vueuse/core'
import { MouseTouchEvent } from '@braks/revue-draggable'
import { D3ZoomEvent } from 'd3-zoom'
import { FlowInstance } from './flow'
import { GraphEdge } from './edge'
import { GraphNode } from './node'
import { Connection, OnConnectStartParams } from './connection'
import { FlowTransform } from './zoom'
import { EdgeChange, NodeChange } from './changes'

export interface FlowEvents {
  nodesChange: NodeChange[]
  edgesChange: EdgeChange[]
  nodeDoubleClick: { event: MouseTouchEvent; node: GraphNode }
  nodeClick: { event: MouseTouchEvent; node: GraphNode }
  nodeMouseEnter: { event: MouseEvent; node: GraphNode }
  nodeMouseMove: { event: MouseEvent; node: GraphNode }
  nodeMouseLeave: { event: MouseEvent; node: GraphNode }
  nodeContextMenu: { event: MouseEvent; node: GraphNode }
  nodeDragStart: { event: MouseTouchEvent; node: GraphNode }
  nodeDrag: { event: MouseTouchEvent; node: GraphNode }
  nodeDragStop: { event: MouseTouchEvent; node: GraphNode }
  miniMapNodeClick: { event: MouseTouchEvent; node: GraphNode }
  miniMapNodeDoubleClick: { event: MouseTouchEvent; node: GraphNode }
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
  edgeContextMenu: { event: MouseEvent; edge: GraphEdge }
  edgeMouseEnter: { event: MouseEvent; edge: GraphEdge }
  edgeMouseMove: { event: MouseEvent; edge: GraphEdge }
  edgeMouseLeave: { event: MouseEvent; edge: GraphEdge }
  edgeDoubleClick: { event: MouseEvent; edge: GraphEdge }
  edgeClick: { event: MouseEvent; edge: GraphEdge }
  edgeUpdateStart: { event: MouseEvent; edge: GraphEdge }
  edgeUpdate: { edge: GraphEdge; connection: Connection }
  edgeUpdateEnd: { event: MouseEvent; edge: GraphEdge }
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
