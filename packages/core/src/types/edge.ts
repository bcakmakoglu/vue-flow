import type { EdgeBase } from '@xyflow/system'
import type { CSSProperties, Component, SVGAttributes, VNode } from 'vue'
import type { ElementData, Position, Styles } from './flow'
import type { EdgeComponent, EdgeTextProps } from './components'

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

export type EdgeReconnectable = boolean | 'target' | 'source'

export interface EdgeLabelOptions {
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
}

/**
 * User-facing edge type — reuses `@xyflow/system`'s `EdgeBase` (id, source/target(+handles), type,
 * animated, markers, data, deletable/selectable/selected, hidden, zIndex, ariaLabel, interactionWidth)
 * plus vue-flow-specific fields, mirroring how xyflow/react does `Edge = EdgeBase & EdgeLabelOptions & {…}`.
 */
export interface DefaultEdge<Data extends Record<string, unknown> = ElementData, Type extends string = string>
  extends EdgeBase<Data, Type>,
    EdgeLabelOptions {
  /** An edge label */
  label?: string | VNode | Component<EdgeTextProps>
  /** EdgeMarker — vue-flow's `EdgeMarkerType` (own `MarkerType` enum + `EdgeMarker`), overriding `EdgeBase`'s */
  markerStart?: EdgeMarkerType
  /** EdgeMarker */
  markerEnd?: EdgeMarkerType
  /** Disable/enable updating edge */
  reconnectable?: EdgeReconnectable
  /** Disable/enable focusing edge (a11y) */
  focusable?: boolean
  /** Additional class names, can be a string or a callback returning a string (receives current flow element) */
  class?: string | string[] | Record<string, any>
  /** Additional styles, can be an object or a callback returning an object (receives current flow element) */
  style?: Styles
  /** Overwrites current edge type */
  template?: EdgeComponent
  /**
   * General escape hatch for adding custom attributes to the edge's DOM element.
   */
  domAttributes?: Omit<
    SVGAttributes,
    | 'id'
    | 'style'
    | 'className'
    | 'role'
    | 'aria-label'
    | 'onClick'
    | 'onMouseenter'
    | 'onMousemove'
    | 'onMouseleave'
    | 'onContextmenu'
    | 'onDblclick'
    | 'onKeyDown'
  >
}

export interface SmoothStepPathOptions {
  offset?: number
  borderRadius?: number
}

export type SmoothStepEdgeType<Data extends Record<string, unknown> = ElementData> = DefaultEdge<Data> & {
  type: 'smoothstep'
  pathOptions?: SmoothStepPathOptions
}

export interface BezierPathOptions {
  curvature?: number
}

export type BezierEdgeType<Data extends Record<string, unknown> = ElementData> = DefaultEdge<Data> & {
  type: 'default'
  pathOptions?: BezierPathOptions
}

export type Edge<Data extends Record<string, unknown> = ElementData, Type extends string = string> =
  | DefaultEdge<Data, Type>
  | SmoothStepEdgeType<Data>
  | BezierEdgeType<Data>

export type DefaultEdgeOptions = Omit<Edge, 'id' | 'source' | 'target' | 'sourceHandle' | 'targetHandle' | 'selected'>

/**
 * The computed positions an edge renders with — a render-OUTPUT type (xyflow's `EdgePosition`),
 * computed per render from the source/target `InternalNode`s. Never stored on an edge.
 */
export interface EdgePositions {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}

/**
 * these props are passed to edge components
 *
 * Mirrors xyflow/react's `EdgeProps` (no `sourceNode`/`targetNode` — resolve via `useInternalNode`;
 * handles exposed as `sourceHandleId`/`targetHandleId`; markers pre-resolved to url strings).
 * Parameterized on an `EdgeType`, matching the xyflow/react convention.
 */
export interface EdgeProps<EdgeType extends Edge = Edge> extends EdgeLabelOptions, EdgePositions {
  id: string
  source: string
  target: string
  // optional, matching the verbatim model + RF's Pick: defaults are no longer stamped onto stored edges,
  // so `type`/`data` are genuinely undefined at runtime when the user didn't set them
  type?: EdgeType['type']
  label?: string | VNode | Component<EdgeTextProps> | object
  style?: CSSProperties
  selected?: boolean
  selectable?: boolean
  deletable?: boolean
  sourcePosition: Position
  targetPosition: Position
  sourceHandleId?: string | null
  targetHandleId?: string | null
  animated?: boolean
  reconnectable?: EdgeReconnectable
  markerStart: string
  markerEnd: string
  curvature?: number
  interactionWidth?: number
  data?: EdgeType['data']
}

export interface BaseEdgeProps extends EdgeLabelOptions {
  id?: string
  labelX?: number
  labelY?: number
  path: string
  label?: any
  markerStart?: string
  markerEnd?: string
  interactionWidth?: number
}

export type BezierEdgeProps = EdgePositions &
  BezierPathOptions &
  Omit<BaseEdgeProps, 'labelX' | 'labelY' | 'path'> &
  Pick<EdgeProps, 'sourcePosition' | 'targetPosition'>

export type SimpleBezierEdgeProps = EdgePositions &
  Omit<BaseEdgeProps, 'labelX' | 'labelY' | 'path'> &
  Pick<EdgeProps, 'sourcePosition' | 'targetPosition'>

export type StraightEdgeProps = EdgePositions & Omit<BaseEdgeProps, 'labelX' | 'labelY' | 'path'>

export type StepEdgeProps = EdgePositions &
  Omit<BaseEdgeProps, 'labelX' | 'labelY' | 'path'> &
  Pick<EdgeProps, 'sourcePosition' | 'targetPosition'>

export type SmoothStepEdgeProps = EdgePositions &
  Omit<BaseEdgeProps, 'labelX' | 'labelY' | 'path'> &
  Pick<EdgeProps, 'sourcePosition' | 'targetPosition'> &
  SmoothStepPathOptions
