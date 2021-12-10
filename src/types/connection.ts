import { Position } from './flow'
import { HandleType } from './components'

export enum ConnectionLineType {
  Bezier = 'default',
  Straight = 'straight',
  Step = 'step',
  SmoothStep = 'smoothstep',
}

export interface Connection {
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
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
  nodeId?: string
  handleId?: string
  handleType?: HandleType
}

export enum ConnectionMode {
  Strict = 'strict',
  Loose = 'loose',
}

export type SetConnectionId = {
  connectionNodeId: string | undefined
  connectionHandleId: string | undefined
  connectionHandleType: HandleType | undefined
}
