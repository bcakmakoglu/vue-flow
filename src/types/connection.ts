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
