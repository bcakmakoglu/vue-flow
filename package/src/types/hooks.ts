import { EventHook, EventHookOn } from '@vueuse/core'
import { MouseTouchEvent } from '@braks/revue-draggable'
import { D3ZoomEvent } from 'd3-zoom'
import { ElementData, FlowInstance } from './flow'
import { GraphEdge } from './edge'
import { GraphNode } from './node'
import { Connection, OnConnectStartParams } from './connection'
import { FlowTransform } from './zoom'
import { EdgeChange, NodeChange } from './changes'

export interface FlowEvents<NodeData = ElementData, EdgeData = ElementData> {
  nodesChange: NodeChange[]
  edgesChange: EdgeChange[]
  nodeDoubleClick: { event: MouseTouchEvent; node: GraphNode<NodeData> }
  nodeClick: { event: MouseTouchEvent; node: GraphNode<NodeData> }
  nodeMouseEnter: { event: MouseEvent; node: GraphNode<NodeData> }
  nodeMouseMove: { event: MouseEvent; node: GraphNode<NodeData> }
  nodeMouseLeave: { event: MouseEvent; node: GraphNode<NodeData> }
  nodeContextMenu: { event: MouseEvent; node: GraphNode<NodeData> }
  nodeDragStart: { event: MouseTouchEvent; node: GraphNode<NodeData> }
  nodeDrag: { event: MouseTouchEvent; node: GraphNode<NodeData> }
  nodeDragStop: { event: MouseTouchEvent; node: GraphNode<NodeData> }
  connect: Connection
  connectStart: {
    event: MouseEvent
  } & OnConnectStartParams
  connectStop: MouseEvent
  connectEnd: MouseEvent
  paneReady: FlowInstance<NodeData, EdgeData>
  move: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: FlowTransform }
  moveStart: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: FlowTransform }
  moveEnd: { event: D3ZoomEvent<HTMLDivElement, any>; flowTransform: FlowTransform }
  selectionDragStart: { event: MouseTouchEvent; nodes: GraphNode<NodeData>[] }
  selectionDrag: { event: MouseTouchEvent; nodes: GraphNode<NodeData>[] }
  selectionDragStop: { event: MouseTouchEvent; nodes: GraphNode<NodeData>[] }
  selectionContextMenu: { event: MouseEvent; nodes: GraphNode<NodeData>[] }
  paneScroll: WheelEvent | undefined
  paneClick: MouseEvent
  paneContextMenu: MouseEvent
  edgeContextMenu: { event: MouseEvent; edge: GraphEdge<EdgeData> }
  edgeMouseEnter: { event: MouseEvent; edge: GraphEdge<EdgeData> }
  edgeMouseMove: { event: MouseEvent; edge: GraphEdge<EdgeData> }
  edgeMouseLeave: { event: MouseEvent; edge: GraphEdge<EdgeData> }
  edgeDoubleClick: { event: MouseEvent; edge: GraphEdge<EdgeData> }
  edgeClick: { event: MouseEvent; edge: GraphEdge<EdgeData> }
  edgeUpdateStart: { event: MouseEvent; edge: GraphEdge<EdgeData> }
  edgeUpdate: { edge: GraphEdge<EdgeData>; connection: Connection }
  edgeUpdateEnd: { event: MouseEvent; edge: GraphEdge<EdgeData> }
}

export type FlowHooks<NodeData = ElementData, EdgeData = ElementData> = {
  [key in keyof FlowEvents<NodeData, EdgeData>]: EventHook<FlowEvents<NodeData, EdgeData>[key]>
}
export type FlowHooksOn<NodeData = ElementData, EdgeData = ElementData> = {
  [key in keyof FlowEvents<NodeData, EdgeData> as `on${Capitalize<key>}`]: EventHookOn<FlowEvents<NodeData, EdgeData>[key]>
}

export type EmitFunc = (name: keyof FlowHooks, ...args: FlowEvents[keyof FlowEvents][]) => void
