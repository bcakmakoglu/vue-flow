import { CSSProperties } from 'vue'
import { Position, Element, ElementData } from './flow'
import { GraphNode } from './node'

/** Edge markers */
export enum MarkerType {
  Arrow = 'arrow',
  ArrowClosed = 'arrowclosed',
}

/** Edge marker definition */
export interface EdgeMarker {
  /** Unique marker id */
  id?: string
  /** Marker type */
  type: MarkerType
  /** Marker color */
  color?: string
  /** Marker width */
  width?: number
  /** Marker height */
  height?: number
  /** Marker units */
  markerUnits?: string
  /** Marker orientation */
  orient?: string
  /** Marker stroke width */
  strokeWidth?: number
}

export interface MarkerProps {
  id: string
  type: MarkerType | string
  color?: string
  width?: number
  height?: number
  markerUnits?: string
  orient?: string
  strokeWidth?: number
}

export type EdgeMarkerType = string | MarkerType | EdgeMarker

export interface Edge<Data = ElementData> extends Element<Data> {
  /** Source node id */
  source: string
  /** Target node id */
  target: string
  /** Source handle id */
  sourceHandle?: string | null
  /** Target handle id */
  targetHandle?: string | null
  /** Source position */
  sourcePosition?: Position
  /** Target position */
  targetPosition?: Position
  /** Label styles (CSSProperties) */
  labelStyle?: CSSProperties
  /** Show label bg */
  labelShowBg?: boolean
  /** Label Bg styles (CSSProperties) */
  labelBgStyle?: CSSProperties
  /** Label Bg padding */
  labelBgPadding?: [number, number]
  /** Label Bg border radius */
  labelBgBorderRadius?: number
  /** Animated edge */
  animated?: boolean
  /** EdgeMarker */
  markerStart?: EdgeMarkerType
  /** EdgeMarker */
  markerEnd?: EdgeMarkerType
  /** Disable/enable updating edge */
  updatable?: boolean
  /** Disable/enable selecting edge */
  selectable?: boolean
}

export type DefaultEdgeOptions = Omit<
  Edge,
  'id' | 'source' | 'target' | 'sourceHandle' | 'targetHandle' | 'sourceNode' | 'targetNode'
>

export interface EdgePositions {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}

/** Internal edge type */
export type GraphEdge<Data = ElementData, SourceNodeData = any, TargetNodeData = SourceNodeData> = Edge<Data> & {
  sourceNode: GraphNode<SourceNodeData>
  targetNode: GraphNode<TargetNodeData>
  selected?: boolean
  z?: number
} & EdgePositions

/** these props are passed to edge components */
export interface EdgeProps<Data = ElementData, SourceNodeData = any, TargetNodeData = SourceNodeData> {
  id: string
  sourceNode: GraphNode<SourceNodeData>
  targetNode: GraphNode<TargetNodeData>
  label?:
    | string
    | {
        props?: any
        component: any
      }
  type?: string
  data?: Data
  style?: CSSProperties
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  selected?: boolean
  sourcePosition: Position
  targetPosition: Position
  sourceHandleId?: string
  targetHandleId?: string
  source: string
  target: string
  labelStyle?: CSSProperties
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  animated?: boolean
  updatable?: boolean
  markerStart?: string
  markerEnd?: string
  curvature?: number
}

/** these props are passed to smooth step edges */
export interface SmoothStepEdgeProps<Data = ElementData, SourceNodeData = any, TargetNodeData = SourceNodeData>
  extends EdgeProps<Data> {
  id: string
  sourceNode: GraphNode<SourceNodeData>
  targetNode: GraphNode<TargetNodeData>
  label?:
    | string
    | {
        props?: any
        component: any
      }
  type?: string
  data?: Data
  style?: CSSProperties
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  selected?: boolean
  sourcePosition: Position
  targetPosition: Position
  sourceHandleId?: string
  targetHandleId?: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  animated?: boolean
  updatable?: boolean
  markerStart?: string
  markerEnd?: string
  borderRadius?: number
}
