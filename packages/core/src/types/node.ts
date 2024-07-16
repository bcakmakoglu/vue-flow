import type { NodeBase } from '@xyflow/system'
import type { ElementData, Styles, XYPosition } from './flow'
import type { HandleConnectable, HandleElement } from './handle'

/** Defined as [[x-from, y-from], [x-to, y-to]] */
export type CoordinateExtent = [extentFrom: [fromX: number, fromY: number], extentTo: [toX: number, toY: number]]

export interface CoordinateExtentRange {
  range: 'parent' | CoordinateExtent
  /** Values are top, right, bottom, left, you can use these the same as CSS padding */
  padding:
    | number
    | [padding: number]
    | [paddingY: number, paddingX: number]
    | [paddingTop: number, paddingX: number, paddingBottom: number]
    | [paddingTop: number, paddingRight: number, paddingBottom: number, paddingLeft: number]
}

export interface NodeHandleBounds {
  source?: HandleElement[]
  target?: HandleElement[]
}

export type NodeBounds = XYPosition & {
  width: number | null
  height: number | null
}

/**
 * The node data structure that gets used for the nodes prop.
 * @public
 */
export interface Node<NodeData extends ElementData = ElementData, NodeType extends string = string>
  extends Omit<NodeBase<NodeData, NodeType>, 'connectable' | 'extent' | 'origin'> {
  /** Disable/enable connecting node */
  connectable?: HandleConnectable
  /** define node extent, i.e. area in which node can be moved */
  extent?: CoordinateExtent | CoordinateExtentRange | 'parent'
  /** Additional class names, can be a string or a callback returning a string (receives current flow element) */
  class?: string | string[] | Record<string, any>
  /** Additional styles, can be an object or a callback returning an object (receives current flow element) */
  style?: Styles
}

export type GraphNode<NodeType extends Node = Node> = NodeType & {
  measured: {
    width?: number
    height?: number
  }
  internals: {
    positionAbsolute: XYPosition
    z: number
    /**
     * Holds a reference to the original node object provided by the user.
     * Used as an optimization to avoid certain operations.
     */
    userNode: NodeType
    handleBounds?: NodeHandleBounds
    bounds?: NodeBounds
  }
}

export type NodeProps<NodeType extends Node = Node> = Pick<
  NodeType,
  | 'id'
  | 'data'
  | 'width'
  | 'height'
  | 'sourcePosition'
  | 'targetPosition'
  | 'selected'
  | 'dragHandle'
  | 'selectable'
  | 'deletable'
  | 'draggable'
  | 'parentId'
> &
  Required<Pick<NodeType, 'type' | 'dragging' | 'zIndex'>> & {
    /** whether a node is connectable or not */
    isConnectable: HandleConnectable
    /** position absolute x value */
    positionAbsoluteX: number
    /** position absolute x value */
    positionAbsoluteY: number
  }
