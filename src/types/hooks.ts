import { EventHook, EventHookOn } from '@vueuse/core'
import { MouseTouchEvent } from '@braks/revue-draggable'
import { FlowInstance, Dimensions, XYPosition } from './flow'
import { GraphEdge } from './edge'
import { GraphNode } from './node'
import { Connection, OnConnectStartParams } from './connection'
import { FlowTransform } from './zoom'
import { EdgeChange, NodeChange } from './changes'

export interface FlowEvents<N = any, E = N> {
  nodesChange: NodeChange[]
  edgesChange: EdgeChange[]
  nodeDoubleClick: { event: MouseTouchEvent; node: GraphNode<N> }
  nodeClick: { event: MouseTouchEvent; node: GraphNode<N> }
  nodeMouseEnter: { event: MouseEvent; node: GraphNode<N> }
  nodeMouseMove: { event: MouseEvent; node: GraphNode<N> }
  nodeMouseLeave: { event: MouseEvent; node: GraphNode<N> }
  nodeContextMenu: { event: MouseEvent; node: GraphNode<N> }
  nodeDragStart: { event: MouseTouchEvent; node: GraphNode<N> }
  nodeDrag: { event: MouseTouchEvent; node: GraphNode<N> }
  nodeDragStop: { event: MouseTouchEvent; node: GraphNode<N> }
  connect: Connection
  connectStart: {
    event: MouseEvent
  } & OnConnectStartParams
  connectStop: MouseEvent
  connectEnd: MouseEvent
  paneReady: FlowInstance<N, E>
  move: FlowTransform | undefined
  moveStart: FlowTransform | undefined
  moveEnd: FlowTransform | undefined
  selectionDragStart: { event: MouseTouchEvent; nodes: GraphNode<N>[] }
  selectionDrag: { event: MouseTouchEvent; nodes: GraphNode<N>[] }
  selectionDragStop: { event: MouseTouchEvent; nodes: GraphNode<N>[] }
  selectionContextMenu: { event: MouseEvent; nodes: GraphNode<N>[] }
  paneScroll: WheelEvent | undefined
  paneClick: MouseEvent
  paneContextMenu: MouseEvent
  edgeContextMenu: { event: MouseEvent; edge: GraphEdge<E> }
  edgeMouseEnter: { event: MouseEvent; edge: GraphEdge<E> }
  edgeMouseMove: { event: MouseEvent; edge: GraphEdge<E> }
  edgeMouseLeave: { event: MouseEvent; edge: GraphEdge<E> }
  edgeDoubleClick: { event: MouseEvent; edge: GraphEdge<E> }
  edgeClick: { event: MouseEvent; edge: GraphEdge<E> }
  edgeUpdateStart: { event: MouseEvent; edge: GraphEdge<E> }
  edgeUpdate: { edge: GraphEdge<E>; connection: Connection }
  edgeUpdateEnd: { event: MouseEvent; edge: GraphEdge<E> }
}

export type FlowEvent = FlowEvents[keyof FlowEvents]
export type FlowHook<T extends FlowEvent = any> = EventHook<T>
export type FlowHookOn<T extends FlowEvent = any> = EventHookOn<T>

export type FlowHooks<N = any, E = N> = { [key in keyof FlowEvents<N, E>]: FlowHook<FlowEvents<N, E>[key]> }
export type FlowHooksOn<N = any, E = N> = {
  [key in keyof FlowEvents<N, E> as `on${Capitalize<key>}`]: FlowHookOn<FlowEvents<N, E>[key]>
}

export type EmitFunc<T extends FlowHooks = FlowHooks> = (name: keyof T, ...args: any[]) => void
