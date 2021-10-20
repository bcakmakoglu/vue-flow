import { EventHook } from '@vueuse/core'
import { Connection, Edge, Elements, FlowTransform, Node, OnConnectStartParams, OnLoadParams } from '../types'

export type FlowHook<T = any> = EventHook<T>

export interface FlowHooks {
  elementClick: FlowHook<{ event: MouseEvent; element: Node | Edge }>
  elementsRemove: FlowHook<Elements>
  nodeDoubleClick: FlowHook<{ event: MouseEvent; node: Node }>
  nodeClick: FlowHook<{ event: MouseEvent; node: Node }>
  nodeMouseEnter: FlowHook<{ event: MouseEvent; node: Node }>
  nodeMouseMove: FlowHook<{ event: MouseEvent; node: Node }>
  nodeMouseLeave: FlowHook<{ event: MouseEvent; node: Node }>
  nodeContextMenu: FlowHook<{ event: MouseEvent; node: Node }>
  nodeDragStart: FlowHook<{ event: MouseEvent; node: Node }>
  nodeDrag: FlowHook<{ event: MouseEvent; node: Node }>
  nodeDragStop: FlowHook<{ event: MouseEvent; node: Node }>
  connect: FlowHook<Connection>
  connectStart: FlowHook<{
    event: MouseEvent
    params: OnConnectStartParams
  }>
  connectStop: FlowHook<MouseEvent>
  connectEnd: FlowHook<MouseEvent>
  load: FlowHook<OnLoadParams>
  move: FlowHook<FlowTransform | undefined>
  moveStart: FlowHook<FlowTransform | undefined>
  moveEnd: FlowHook<FlowTransform | undefined>
  selectionChange: FlowHook<Elements | null>
  selectionDragStart: FlowHook<{ event: MouseEvent; nodes: Node[] }>
  selectionDrag: FlowHook<{ event: MouseEvent; nodes: Node[] }>
  selectionDragStop: FlowHook<{ event: MouseEvent; nodes: Node[] }>
  selectionContextMenu: FlowHook<{ event: MouseEvent; nodes: Node[] }>
  paneScroll: FlowHook<WheelEvent | undefined>
  paneClick: FlowHook<MouseEvent>
  paneContextMenu: FlowHook<MouseEvent>
  edgeUpdate: FlowHook<{ edge: Edge; connection: Connection }>
  edgeContextMenu: FlowHook<{ event: MouseEvent; edge: Edge }>
  edgeMouseEnter: FlowHook<{ event: MouseEvent; edge: Edge }>
  edgeMouseMove: FlowHook<{ event: MouseEvent; edge: Edge }>
  edgeMouseLeave: FlowHook<{ event: MouseEvent; edge: Edge }>
  edgeDoubleClick: FlowHook<{ event: MouseEvent; edge: Edge }>
  edgeClick: FlowHook<{ event: MouseEvent; edge: Edge }>
  edgeUpdateStart: FlowHook<{ event: MouseEvent; edge: Edge }>
  edgeUpdateEnd: FlowHook<{ event: MouseEvent; edge: Edge }>
}

export type EmitFunc<T extends FlowHooks = FlowHooks> = (name: keyof T, ...args: any[]) => void
