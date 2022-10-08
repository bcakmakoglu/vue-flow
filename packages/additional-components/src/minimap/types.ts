import type { Dimensions, GraphNode, XYPosition } from '@vue-flow/core'
import type { CSSProperties } from 'vue'

/** expects a node and returns a color value */
export type MiniMapNodeFunc = (node: GraphNode) => string
// hack for vue-type imports
type MiniMapNodeFunc2 = (node: GraphNode) => string
type MiniMapNodeFunc3 = (node: GraphNode) => string

export type ShapeRendering = CSSProperties['shapeRendering']

export interface MiniMapProps {
  /** Node color, can be either a string or a string func that receives the current node */
  nodeColor?: string | MiniMapNodeFunc
  /** Node stroke color, can be either a string or a string func that receives the current node */
  nodeStrokeColor?: string | MiniMapNodeFunc2
  /** Additional node class name, can be either a string or a string func that receives the current node */
  nodeClassName?: string | MiniMapNodeFunc3
  /** Node border radius */
  nodeBorderRadius?: number
  /** Node stroke width */
  nodeStrokeWidth?: number
  /** Background color of minimap */
  maskColor?: string

  width?: number
  height?: number
}

/** these props are passed to mini map node slots */
export interface MiniMapNodeProps {
  id: string
  parentNode?: string
  selected?: boolean
  dragging?: boolean
  position: XYPosition
  dimensions: Dimensions
  borderRadius?: number
  color?: string
  shapeRendering?: ShapeRendering
  strokeColor?: string
  strokeWidth?: number
}
