import type { CSSProperties } from 'vue'
import type { Position } from './flow'
import type { GraphNode } from './node'
import type { HandleElement, HandleType } from './handle'
import type { Edge, EdgeMarkerType } from './edge'

/** Connection line types (same as default edge types */
export enum ConnectionLineType {
  Bezier = 'default',
  SimpleBezier = 'simple',
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
  /** The source node of the connection line */
  fromNode: GraphNode
  /** The source handle element of the connection line */
  fromHandle: HandleElement
  /** Source X position of the connection line */
  fromX: number
  /** Source Y position of the connection line */
  fromY: number
  /** Target X position of the connection line */
  toX: number
  /** Target Y position of the connection line */
  toY: number
  /** Source position of the connection line */
  fromPosition: Position
  /** Target position of the connection line */
  toPosition: Position
  /** the shape of the connection line when active */
  connectionLineType: ConnectionLineType
  /** extra styles */
  connectionLineStyle: CSSProperties
  /** marker url */
  markerStart: string
  /** marker url */
  markerEnd: string

  /**
   * @deprecated use {@link fromX} instead
   * Source X position of the connection line
   */
  sourceX: number
  /**
   * @deprecated use {@link fromY} instead
   * Source Y position of the connection line
   */
  sourceY: number
  /**
   * @deprecated use {@link fromPosition} instead
   * Source position of the connection line
   */
  sourcePosition: Position
  /**
   * @deprecated use {@link toX} instead
   * Target X position of the connection line
   */
  targetX: number
  /**
   * @deprecated use {@link toY} instead
   * Target Y position of the connection line
   */
  targetY: number
  /**
   * @deprecated use {@link toPosition} instead
   * Target position of the connection line
   */
  targetPosition: Position

  /**
   * @deprecated use {@link fromNode} instead
   * The source node of the connection line
   */
  sourceNode: GraphNode
  /**
   * @deprecated use {@link fromHandle} instead
   * The source handle element of the connection line
   */
  sourceHandle: HandleElement
}
