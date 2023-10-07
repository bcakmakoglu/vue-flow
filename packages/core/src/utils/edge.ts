import type { EdgePosition, HandleElement, Rect, XYPosition } from '@xyflow/system'
import { Position, rectToBox } from '@xyflow/system'
import type { Actions, GraphEdge, GraphNode, ViewportTransform } from '~/types'

export function getHandlePosition(position: Position, rect: Rect, handle: HandleElement | null): XYPosition {
  const x = (handle?.x ?? 0) + rect.x
  const y = (handle?.y ?? 0) + rect.y
  const width = handle?.width ?? rect.width
  const height = handle?.height ?? rect.height

  switch (position) {
    case Position.Top:
      return {
        x: x + width / 2,
        y,
      }
    case Position.Right:
      return {
        x: x + width,
        y: y + height / 2,
      }
    case Position.Bottom:
      return {
        x: x + width / 2,
        y: y + height,
      }
    case Position.Left:
      return {
        x,
        y: y + height / 2,
      }
  }
}

export function getHandle(bounds: HandleElement[] | null, handleId?: string | null): HandleElement | null {
  if (!bounds?.length) {
    return null
  }

  if (!handleId || bounds.length === 1) {
    return bounds[0]
  } else if (handleId) {
    return bounds.find((d) => d.id === handleId) || null
  }

  return null
}

export function getEdgePositions(
  sourceNode: GraphNode,
  sourceHandle: HandleElement | null,
  sourcePosition: Position,
  targetNode: GraphNode,
  targetHandle: HandleElement | null,
  targetPosition: Position,
): EdgePosition {
  const sourceHandlePos = getHandlePosition(
    sourcePosition,
    {
      ...sourceNode.dimensions,
      ...sourceNode.computedPosition,
    },
    sourceHandle,
  )
  const targetHandlePos = getHandlePosition(
    targetPosition,
    {
      ...targetNode.dimensions,
      ...targetNode.computedPosition,
    },
    targetHandle,
  )

  return {
    sourceX: sourceHandlePos.x,
    sourceY: sourceHandlePos.y,
    targetX: targetHandlePos.x,
    targetY: targetHandlePos.y,
    sourcePosition,
    targetPosition,
  }
}

interface IsEdgeVisibleParams {
  sourcePos: XYPosition
  targetPos: XYPosition
  sourceWidth: number
  sourceHeight: number
  targetWidth: number
  targetHeight: number
  width: number
  height: number
  viewport: ViewportTransform
}

export function isEdgeVisible({
  sourcePos,
  targetPos,
  sourceWidth,
  sourceHeight,
  targetWidth,
  targetHeight,
  width,
  height,
  viewport,
}: IsEdgeVisibleParams): boolean {
  const edgeBox = {
    x: Math.min(sourcePos.x, targetPos.x),
    y: Math.min(sourcePos.y, targetPos.y),
    x2: Math.max(sourcePos.x + sourceWidth, targetPos.x + targetWidth),
    y2: Math.max(sourcePos.y + sourceHeight, targetPos.y + targetHeight),
  }

  if (edgeBox.x === edgeBox.x2) {
    edgeBox.x2 += 1
  }

  if (edgeBox.y === edgeBox.y2) {
    edgeBox.y2 += 1
  }

  const viewBox = rectToBox({
    x: (0 - viewport.x) / viewport.zoom,
    y: (0 - viewport.y) / viewport.zoom,
    width: width / viewport.zoom,
    height: height / viewport.zoom,
  })

  const xOverlap = Math.max(0, Math.min(viewBox.x2, edgeBox.x2) - Math.max(viewBox.x, edgeBox.x))
  const yOverlap = Math.max(0, Math.min(viewBox.y2, edgeBox.y2) - Math.max(viewBox.y, edgeBox.y))
  const overlappingArea = Math.ceil(xOverlap * yOverlap)

  return overlappingArea > 0
}

export function getEdgeZIndex(edge: GraphEdge, findNode: Actions['findNode'], elevateEdgesOnSelect = false) {
  const hasZIndex = typeof edge.zIndex === 'number'
  let z = hasZIndex ? edge.zIndex! : 0

  const source = findNode(edge.source)
  const target = findNode(edge.target)

  if (!source || !target) {
    return 0
  }

  if (elevateEdgesOnSelect) {
    z = hasZIndex ? edge.zIndex! : Math.max(source.computedPosition.z || 0, target.computedPosition.z || 0)
  }

  return z
}
