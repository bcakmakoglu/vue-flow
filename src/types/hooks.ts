import { EventHook } from '@vueuse/core'
import { MouseTouchEvent } from '@braks/revue-draggable'
import { FlowInstance, Dimensions, XYPosition, XYZPosition } from './flow'
import { GraphEdge } from './edge'
import { GraphNode, HandleBounds } from './node'
import { Connection, OnConnectStartParams } from './connection'
import { FlowTransform } from './zoom'

export type NodeDimensionChange = {
  id: string
  type: 'dimensions'
  dimensions?: Dimensions
  position?: XYPosition
  handleBounds?: HandleBounds
  computedPosition?: XYZPosition
  dragging?: boolean
}

export type NodeSelectionChange = {
  id: string
  type: 'select'
  selected: boolean
}

export type NodeRemoveChange = {
  id: string
  type: 'remove'
}

export type NodeChange = NodeDimensionChange | NodeSelectionChange | NodeRemoveChange

export type EdgeSelectionChange = NodeSelectionChange
export type EdgeRemoveChange = NodeRemoveChange
export type EdgeChange = EdgeSelectionChange | EdgeRemoveChange

export interface FlowEvents {
  nodesChange: NodeChange[]
  edgesChange: EdgeChange[]
  elementClick: { event: MouseTouchEvent; element: GraphNode | GraphEdge }
  nodeDoubleClick: { event: MouseTouchEvent; node: GraphNode }
  nodeClick: { event: MouseTouchEvent; node: GraphNode }
  nodeMouseEnter: { event: MouseEvent; node: GraphNode }
  nodeMouseMove: { event: MouseEvent; node: GraphNode }
  nodeMouseLeave: { event: MouseEvent; node: GraphNode }
  nodeContextMenu: { event: MouseEvent; node: GraphNode }
  nodeDragStart: { event: MouseTouchEvent; node: GraphNode }
  nodeDrag: { event: MouseTouchEvent; node: GraphNode }
  nodeDragStop: { event: MouseTouchEvent; node: GraphNode }
  connect: Connection
  connectStart: {
    event: MouseEvent
  } & { [key in keyof OnConnectStartParams]: OnConnectStartParams[key] }
  connectStop: MouseEvent
  connectEnd: MouseEvent
  paneReady: FlowInstance
  move: FlowTransform | undefined
  moveStart: FlowTransform | undefined
  moveEnd: FlowTransform | undefined
  selectionChange: { nodes?: GraphNode[]; edges?: GraphEdge[] }
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

export type FlowHook<T = any> = EventHook<T>

export type FlowHooks = { [key in keyof FlowEvents]: FlowHook<FlowEvents[key]> }
export type FlowHooksOn = { [key in keyof FlowEvents as `On${Capitalize<key>}`]: FlowHook<FlowEvents[key]>['on'] }

export type EmitFunc<T extends FlowHooks = FlowHooks> = (name: keyof T, ...args: any[]) => void
