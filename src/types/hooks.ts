import { EventHook } from '@vueuse/core'
import { FlowTransform, FlowInstance, FlowElements } from './flow'
import { GraphEdge } from './edge'
import { Node } from './node'
import { Connection, OnConnectStartParams } from './connection'

export type FlowHook<T = any> = EventHook<T>

export interface FlowEvents {
  elementClick: { event: MouseEvent; element: Node | GraphEdge }
  elementsRemove: FlowElements
  nodeDoubleClick: { event: MouseEvent; node: Node }
  nodeClick: { event: MouseEvent; node: Node }
  nodeMouseEnter: { event: MouseEvent; node: Node }
  nodeMouseMove: { event: MouseEvent; node: Node }
  nodeMouseLeave: { event: MouseEvent; node: Node }
  nodeContextMenu: { event: MouseEvent; node: Node }
  nodeDragStart: { event: MouseEvent; node: Node }
  nodeDrag: { event: MouseEvent; node: Node }
  nodeDragStop: { event: MouseEvent; node: Node }
  connect: Connection
  connectStart: {
    event: MouseEvent
    params: OnConnectStartParams
  }
  connectStop: MouseEvent
  connectEnd: MouseEvent
  load: FlowInstance
  move: FlowTransform | undefined
  moveStart: FlowTransform | undefined
  moveEnd: FlowTransform | undefined
  selectionChange: FlowElements | null
  selectionDragStart: { event: MouseEvent; nodes: Node[] }
  selectionDrag: { event: MouseEvent; nodes: Node[] }
  selectionDragStop: { event: MouseEvent; nodes: Node[] }
  selectionContextMenu: { event: MouseEvent; nodes: Node[] }
  paneScroll: WheelEvent | undefined
  paneClick: MouseEvent
  paneContextMenu: MouseEvent
  edgeUpdate: { edge: GraphEdge; connection: Connection }
  edgeContextMenu: { event: MouseEvent; edge: GraphEdge }
  edgeMouseEnter: { event: MouseEvent; edge: GraphEdge }
  edgeMouseMove: { event: MouseEvent; edge: GraphEdge }
  edgeMouseLeave: { event: MouseEvent; edge: GraphEdge }
  edgeDoubleClick: { event: MouseEvent; edge: GraphEdge }
  edgeClick: { event: MouseEvent; edge: GraphEdge }
  edgeUpdateStart: { event: MouseEvent; edge: GraphEdge }
  edgeUpdateEnd: MouseEvent
}

export type FlowHooks = { [key in keyof FlowEvents]: FlowHook<FlowEvents[key]> }

export type EmitFunc<T extends FlowHooks = FlowHooks> = (name: keyof T, ...args: any[]) => void
