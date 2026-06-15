import type { CSSProperties } from 'vue';
import type { Edge, EdgeMarkerType } from './edge';
import type { ClassValue, Position, XYPosition } from './flow';
import type { ConnectingHandle, HandleElement, HandleType } from './handle';
import type { GraphNode, Node } from './node';

/** Connection line types (same as default edge types */
export enum ConnectionLineType {
  Bezier = 'default',
  SimpleBezier = 'simple-bezier',
  Straight = 'straight',
  Step = 'step',
  SmoothStep = 'smoothstep',
}

export interface ConnectionLineOptions {
  type?: ConnectionLineType;
  style?: CSSProperties;
  class?: ClassValue;
  markerEnd?: EdgeMarkerType;
  markerStart?: EdgeMarkerType;
}

/** Connection params that are passed when onConnect is called */
export interface Connection {
  /** Source node id */
  source: string;
  /** Target node id */
  target: string;
  /** Source handle id (null when the connection isn't tied to a specific handle) */
  sourceHandle: string | null;
  /** Target handle id (null when the connection isn't tied to a specific handle) */
  targetHandle: string | null;
}

export type NodeConnection = Connection & {
  edgeId: string;
};

export type Connector = (
  params: Connection,
) => Promise<(Connection & Partial<Edge>) | false> | ((Connection & Partial<Edge>) | false);

export type ConnectionStatus = 'valid' | 'invalid';

/**
 * An ongoing connection, mirroring xyflow/react's `ConnectionState` (returned by `useConnection`).
 * Handles are vue-flow `ConnectingHandle`s and nodes are `GraphNode`s (the resolved `InternalNode`s).
 */
export interface ConnectionInProgress<NodeType extends Node = Node> {
  inProgress: true;
  /** `true`/`false` when over a handle or inside the connection radius, otherwise `null` */
  isValid: boolean | null;
  /** xy start position of the connection */
  from: XYPosition;
  /** the handle the connection started from */
  fromHandle: ConnectingHandle;
  /** the side of the start handle */
  fromPosition: Position;
  /** the node the connection started from */
  fromNode: GraphNode<NodeType>;
  /** xy end position of the connection (the current pointer position) */
  to: XYPosition;
  /** the handle the connection currently ends on, or `null` */
  toHandle: ConnectingHandle | null;
  /** the side of the end handle, or `null` */
  toPosition: Position | null;
  /** the node the connection currently ends on, or `null` */
  toNode: GraphNode<NodeType> | null;
  /** the current pointer position */
  pointer: XYPosition;
}

/** No connection in progress — the resting `ConnectionState`. */
export interface NoConnection {
  inProgress: false;
  isValid: null;
  from: null;
  fromHandle: null;
  fromPosition: null;
  fromNode: null;
  to: null;
  toHandle: null;
  toPosition: null;
  toNode: null;
  pointer: null;
}

/**
 * The full connection state bundled for `useConnection`, mirroring xyflow/react's `ConnectionState`.
 */
export type ConnectionState<NodeType extends Node = Node> = ConnectionInProgress<NodeType> | NoConnection;

/** The source nodes params when connection is initiated */
export interface OnConnectStartParams {
  /** Source node id */
  nodeId?: string;
  /** Source handle id */
  handleId: string | null;
  /** Source handle type */
  handleType?: HandleType;
}

/** Connection modes, when set to loose all handles are treated as source */
export enum ConnectionMode {
  Strict = 'strict',
  Loose = 'loose',
}

export interface ConnectionLineProps {
  /** Source X position of the connection line */
  sourceX: number;
  /** Source Y position of the connection line */
  sourceY: number;
  /** Source position of the connection line */
  sourcePosition: Position;
  /** Target X position of the connection line */
  targetX: number;
  /** Target Y position of the connection line */
  targetY: number;
  /** Target position of the connection line */
  targetPosition: Position;
  /** The source node of the connection line */
  sourceNode: GraphNode;
  /** The source handle element (not the DOM element) of the connection line */
  sourceHandle: HandleElement | null;
  /** The target node of the connection line */
  targetNode: GraphNode | null;
  /** The target handle element (not the DOM element) of the connection line */
  targetHandle: HandleElement | null;
  /** marker url */
  markerStart: string;
  /** marker url */
  markerEnd: string;
  /** status of the connection (valid, invalid) */
  connectionStatus: ConnectionStatus | null;
}

export type ConnectionLookup = Map<string, Map<string, NodeConnection>>;
