import type { CSSProperties } from 'vue'
import type { Connection, ConnectionLineType, ConnectionStatus, HandleElement, Position } from '@xyflow/system'
import type { GraphNode } from './node'
import type { Edge, EdgeMarkerType } from './edge'

export interface ConnectionLineOptions {
  type?: ConnectionLineType
  style?: CSSProperties
  class?: string
  markerEnd?: EdgeMarkerType
  markerStart?: EdgeMarkerType
}

export type Connector = (
  params: Connection,
) => Promise<(Connection & Partial<Edge>) | false> | ((Connection & Partial<Edge>) | false)

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
  /** The source node of the connection line */
  sourceNode: GraphNode
  /** The source handle element (not the DOM element) of the connection line */
  sourceHandle: HandleElement | null
  /** The target node of the connection line */
  targetNode: GraphNode | null
  /** The target handle element (not the DOM element) of the connection line */
  targetHandle: HandleElement | null
  /** marker url */
  markerStart: string
  /** marker url */
  markerEnd: string
  /** status of the connection (valid, invalid) */
  connectionStatus: ConnectionStatus | null
}
