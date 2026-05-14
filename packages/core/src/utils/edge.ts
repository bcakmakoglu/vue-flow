import type { Actions, GraphEdge, GraphNode, HandleElement, XYPosition } from '../types'
import { Position } from '../types'
import { getNodeDimensions } from '.'

export function getHandlePosition(
  node: GraphNode,
  handle: HandleElement | null,
  fallbackPosition: Position = Position.Left,
  center = false,
): XYPosition {
  const x = (handle?.x ?? 0) + node.internals.positionAbsolute.x
  const y = (handle?.y ?? 0) + node.internals.positionAbsolute.y
  const { width, height } = handle ?? getNodeDimensions(node)

  if (center) {
    return { x: x + width / 2, y: y + height / 2 }
  }

  const position = handle?.position ?? fallbackPosition

  switch (position) {
    case Position.Top:
      return { x: x + width / 2, y }
    case Position.Right:
      return { x: x + width, y: y + height / 2 }
    case Position.Bottom:
      return { x: x + width / 2, y: y + height }
    case Position.Left:
      return { x, y: y + height / 2 }
  }
}

export function getEdgeHandle(bounds: HandleElement[] | null, handleId?: string | null): HandleElement | null {
  if (!bounds) {
    return null
  }

  // if no handleId is given, we use the first handle, otherwise we check for the id
  return (!handleId ? bounds[0] : bounds.find((d) => d.id === handleId)) || null
}

export { isEdgeVisible } from '@xyflow/system'

export function getEdgeZIndex(edge: GraphEdge, findNode: Actions['findNode'], elevateEdgesOnSelect = false) {
  const hasZIndex = typeof edge.zIndex === 'number'
  let z = hasZIndex ? edge.zIndex! : 0

  const source = findNode(edge.source)
  const target = findNode(edge.target)

  if (!source || !target) {
    return 0
  }

  if (elevateEdgesOnSelect) {
    z = hasZIndex ? edge.zIndex! : Math.max(source.internals.z || 0, target.internals.z || 0)
  }

  return z
}
