import { EventHook } from '@vueuse/core'
import { Connection, Edge, Elements, FlowTransform, Node, OnConnectStartParams, FlowInstance } from '../types'

export type FlowHook<T = any> = EventHook<T>

export interface FlowEvents {
  elementClick: { event: MouseEvent; element: Node | Edge }
  elementsRemove: Elements
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
  selectionChange: Elements | null
  selectionDragStart: { event: MouseEvent; nodes: Node[] }
  selectionDrag: { event: MouseEvent; nodes: Node[] }
  selectionDragStop: { event: MouseEvent; nodes: Node[] }
  selectionContextMenu: { event: MouseEvent; nodes: Node[] }
  paneScroll: WheelEvent | undefined
  paneClick: MouseEvent
  paneContextMenu: MouseEvent
  edgeUpdate: { edge: Edge; connection: Connection }
  edgeContextMenu: { event: MouseEvent; edge: Edge }
  edgeMouseEnter: { event: MouseEvent; edge: Edge }
  edgeMouseMove: { event: MouseEvent; edge: Edge }
  edgeMouseLeave: { event: MouseEvent; edge: Edge }
  edgeDoubleClick: { event: MouseEvent; edge: Edge }
  edgeClick: { event: MouseEvent; edge: Edge }
  edgeUpdateStart: { event: MouseEvent; edge: Edge }
  edgeUpdateEnd: { event: MouseEvent; edge: Edge }
}

export type FlowHooks = { [key in keyof FlowEvents]: FlowHook<FlowEvents[key]> }

export type EmitFunc<T extends FlowHooks = FlowHooks> = (name: keyof T, ...args: any[]) => void
