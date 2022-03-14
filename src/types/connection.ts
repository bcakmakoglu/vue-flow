import { HandleType } from './components'

/** Connection line types (same as default edge types */
export enum ConnectionLineType {
  Bezier = 'default',
  Straight = 'straight',
  Step = 'step',
  SmoothStep = 'smoothstep',
}

/** Connection params that are passed when onConnect is called */
export interface Connection {
  /** Source node id */
  source: string
  /** Target node id */
  target: string
  /** Source handle id */
  sourceHandle?: string
  /** Target handle id */
  targetHandle?: string
}

/** The source nodes params when connection is initiated */
export type OnConnectStartParams = {
  /** Source node id */
  nodeId?: string
  /** Source handle id */
  handleId?: string
  /** Source handle type */
  handleType?: HandleType
}

/** Connection modes, when set to loose all handles are treated as source */
export enum ConnectionMode {
  Strict = 'strict',
  Loose = 'loose',
}

export type SetConnectionId = {
  connectionNodeId: string | undefined
  connectionHandleId: string | undefined
  connectionHandleType: HandleType | undefined
}
