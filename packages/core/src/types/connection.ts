import type { CSSProperties } from 'vue'
import type { Position } from './flow'
import type { GraphNode } from './node'
import type { HandleElement, HandleType } from './handle'
import type { Edge, EdgeMarkerType } from './edge'

/** Connection line types (same as default edge types */
export enum ConnectionLineType {
  Bezier = 'default',
  SimpleBezier = 'simple-bezier',
  Straight = 'straight',
  Step = 'step',
  SmoothStep = 'smoothstep',
}

export interface ConnectionLineOptions {
  type?: ConnectionLineType
  style?: CSSProperties
  class?: string
  markerEnd?: EdgeMarkerType
  markerStart?: EdgeMarkerType
}

/** Connection params that are passed when onConnect is called */
export interface Connection {
  /** Source node id */
  source: string
  /** Target node id */
  target: string
  /** Source handle id */
  sourceHandle: string | null
  /** Target handle id */
  targetHandle: string | null
}

export type Connector = (
  params: Connection,
) => Promise<(Connection & Partial<Edge>) | false> | ((Connection & Partial<Edge>) | false)

/** The source nodes params when connection is initiated */
export interface OnConnectStartParams {
  /** Source node id */
  nodeId?: string
  /** Source handle id */
  handleId: string | null
  /** Source handle type */
  handleType?: HandleType
}

/** Connection modes, when set to loose all handles are treated as source */
export enum ConnectionMode {
  Strict = 'strict',
  Loose = 'loose',
}

export interface ConnectionLineProps {
  /** Source X position of the connection line */
  sourceX: number
  /** Source Y position of the connection line */
  sourceY: number
  /** Source position of the connection line */
  sourcePosition: Position
  /** Target X position of the connection line */
  targetX: number
  /** Target Y position of the connection line */
  targetY: number
  /** Target position of the connection line */
  targetPosition: Position
  /** the shape of the connection line when active */
  connectionLineType: ConnectionLineType
  /** extra styles */
  connectionLineStyle: CSSProperties
  /** All currently stored nodes */
  nodes: GraphNode[]
  /** The source node of the connection line */
  sourceNode: GraphNode
  /** The source handle element of the connection line */
  sourceHandle: HandleElement
  /** marker url */
  markerStart: string
  /** marker url */
  markerEnd: string
}
