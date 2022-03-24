import { rectToBox } from './graph'
import { EdgePositions, GraphEdge, GraphNode, HandleElement, Position, Rect, Transform, XYPosition } from '~/types'

export const getHandlePosition = (position: Position, rect: Rect, handle?: HandleElement): XYPosition => {
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

export const getHandle = (bounds: HandleElement[] = [], handleId: string | null): HandleElement | undefined => {
  if (!bounds.length) return undefined

  // there is no handleId when there are no multiple handles/ handles with ids
  // so we just pick the first one
  let handle
  if (bounds.length === 1 ?? !handleId) handle = bounds[0]
  else if (handleId) handle = bounds.find((d) => d.id === handleId)

  return handle
}

export const getEdgePositions = (
  sourceNode: GraphNode,
  sourceHandle: HandleElement | undefined,
  sourcePosition: Position,
  targetNode: GraphNode,
  targetHandle: HandleElement | undefined,
  targetPosition: Position,
): EdgePositions => {
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
  transform: Transform
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
  transform,
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
    x: (0 - transform[0]) / transform[2],
    y: (0 - transform[1]) / transform[2],
    width: width / transform[2],
    height: height / transform[2],
  })

  const xOverlap = Math.max(0, Math.min(viewBox.x2, edgeBox.x2) - Math.max(viewBox.x, edgeBox.x))
  const yOverlap = Math.max(0, Math.min(viewBox.y2, edgeBox.y2) - Math.max(viewBox.y, edgeBox.y))
  const overlappingArea = Math.ceil(xOverlap * yOverlap)

  return overlappingArea > 0
}

export const groupEdgesByZLevel = (edges: GraphEdge[], nodes: GraphNode[]) => {
  let maxLevel = -1
  const nodeIds = nodes.map((n) => n.id)

  const levelLookup = edges.reduce<Record<string, GraphEdge[]>>((tree, edge) => {
    const z = edge.z
      ? edge.z
      : Math.max(
          nodes[nodeIds.indexOf(edge.source)]?.computedPosition.z || 0,
          nodes[nodeIds.indexOf(edge.target)]?.computedPosition.z || 0,
        )
    if (tree[z]) {
      tree[z].push(edge)
    } else {
      tree[z] = [edge]
    }

    maxLevel = z > maxLevel ? z : maxLevel

    return tree
  }, {})

  return Object.entries(Object.keys(levelLookup).length ? levelLookup : { 0: [] }).map(([key, edges]) => {
    const level = +key

    return {
      edges,
      level,
      isMaxLevel: level === maxLevel,
    }
  })
}
