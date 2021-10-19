// global hooks
import { EventHook } from '@vueuse/core'
import { Connection, Edge, Elements, FlowTransform, Node, OnConnectStartParams, OnLoadParams } from '../types'

export interface FlowHooks {
  elementClick: EventHook<{ event: MouseEvent; element: Node | Edge }>
  elementsRemove: EventHook<Elements>
  nodeDoubleClick: EventHook<{ event: MouseEvent; node: Node }>
  nodeClick: EventHook<{ event: MouseEvent; node: Node }>
  nodeMouseEnter: EventHook<{ event: MouseEvent; node: Node }>
  nodeMouseMove: EventHook<{ event: MouseEvent; node: Node }>
  nodeMouseLeave: EventHook<{ event: MouseEvent; node: Node }>
  nodeContextMenu: EventHook<{ event: MouseEvent; node: Node }>
  nodeDragStart: EventHook<{ event: MouseEvent; node: Node }>
  nodeDrag: EventHook<{ event: MouseEvent; node: Node }>
  nodeDragStop: EventHook<{ event: MouseEvent; node: Node }>
  connect: EventHook<Connection>
  connectStart: EventHook<{
    event: MouseEvent
    params: OnConnectStartParams
  }>
  connectStop: EventHook<MouseEvent>
  connectEnd: EventHook<MouseEvent>
  load: EventHook<OnLoadParams>
  move: EventHook<FlowTransform | undefined>
  moveStart: EventHook<FlowTransform | undefined>
  moveEnd: EventHook<FlowTransform | undefined>
  selectionChange: EventHook<Elements | null>
  selectionDragStart: EventHook<{ event: MouseEvent; nodes: Node[] }>
  selectionDrag: EventHook<{ event: MouseEvent; nodes: Node[] }>
  selectionDragStop: EventHook<{ event: MouseEvent; nodes: Node[] }>
  selectionContextMenu: EventHook<{ event: MouseEvent; nodes: Node[] }>
  paneScroll: EventHook<WheelEvent | undefined>
  paneClick: EventHook<MouseEvent>
  paneContextMenu: EventHook<MouseEvent>
  edgeUpdate: EventHook<{ edge: Edge; connection: Connection }>
  edgeContextMenu: EventHook<{ event: MouseEvent; edge: Edge }>
  edgeMouseEnter: EventHook<{ event: MouseEvent; edge: Edge }>
  edgeMouseMove: EventHook<{ event: MouseEvent; edge: Edge }>
  edgeMouseLeave: EventHook<{ event: MouseEvent; edge: Edge }>
  edgeDoubleClick: EventHook<{ event: MouseEvent; edge: Edge }>
  edgeClick: EventHook<{ event: MouseEvent; edge: Edge }>
  edgeUpdateStart: EventHook<{ event: MouseEvent; edge: Edge }>
  edgeUpdateEnd: EventHook<{ event: MouseEvent; edge: Edge }>
}
