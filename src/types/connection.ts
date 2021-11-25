import { ElementId, Position } from './flow'
import { HandleType } from './components'

export enum ConnectionLineType {
  Bezier = 'default',
  Straight = 'straight',
  Step = 'step',
  SmoothStep = 'smoothstep',
}

export interface Connection {
  source: ElementId
  target: ElementId
  sourceHandle?: ElementId
  targetHandle?: ElementId
}

export type ConnectionLineProps = {
  sourceX: number
  sourceY: number
  sourcePosition?: Position
  targetX: number
  targetY: number
  targetPosition?: Position
  connectionLineStyle?: any
  connectionLineType: ConnectionLineType
}

export type OnConnectFunc = (connection: Connection) => void
export type OnConnectStartParams = {
  nodeId?: ElementId
  handleId?: ElementId
  handleType?: HandleType
}
export type OnConnectStartFunc = (event: MouseEvent, params: OnConnectStartParams) => void
export type OnConnectStopFunc = (event: MouseEvent) => void
export type OnConnectEndFunc = (event: MouseEvent) => void

export enum ConnectionMode {
  Strict = 'strict',
  Loose = 'loose',
}

export type SetConnectionId = {
  connectionNodeId: ElementId | undefined
  connectionHandleId: ElementId | undefined
  connectionHandleType: HandleType | undefined
}
