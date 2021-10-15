import { ComponentPublicInstance } from 'vue'
import { ElementId, HandleType, Position } from './types'

export enum ConnectionLineType {
  Bezier = 'default',
  Straight = 'straight',
  Step = 'step',
  SmoothStep = 'smoothstep',
}

export interface Connection {
  source: ElementId | null
  target: ElementId | null
  sourceHandle: ElementId | null
  targetHandle: ElementId | null
}

export type ConnectionLineComponentProps = {
  sourceX: number
  sourceY: number
  sourcePosition?: Position
  targetX: number
  targetY: number
  targetPosition?: Position
  connectionLineStyle?: any
  connectionLineType: ConnectionLineType
}

export type ConnectionLineComponent = ComponentPublicInstance<ConnectionLineComponentProps>

export type OnConnectFunc = (connection: Connection) => void
export type OnConnectStartParams = {
  nodeId: ElementId | null
  handleId: ElementId | null
  handleType: HandleType | null
}
export type OnConnectStartFunc = (event: MouseEvent, params: OnConnectStartParams) => void
export type OnConnectStopFunc = (event: MouseEvent) => void
export type OnConnectEndFunc = (event: MouseEvent) => void

export enum ConnectionMode {
  Strict = 'strict',
  Loose = 'loose',
}

export type SetConnectionId = {
  connectionNodeId: ElementId | null
  connectionHandleId: ElementId | null
  connectionHandleType: HandleType | null
}
