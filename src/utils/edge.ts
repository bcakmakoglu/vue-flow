import { isGraphNode, rectToBox } from './graph'
import { Edge, EdgePositions, GraphNode, HandleElement, Position, Transform, XYPosition, FlowElements, GraphEdge } from '~/types'

export function getHandlePosition(position: Position, node: GraphNode, handle?: HandleElement): XYPosition {
  const x = (handle?.x ?? 0) + node.position.x
  const y = (handle?.y ?? 0) + node.position.y
  const width = handle?.width ?? node.width
  const height = handle?.height ?? node.height

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

export function getHandle(bounds: HandleElement[], handleId?: string): HandleElement | undefined {
  if (!bounds) return undefined

  // there is no handleId when there are no multiple handles/ handles with ids
  // so we just pick the first one
  let handle
  if (bounds.length === 1 ?? !handleId) {
    handle = bounds[0]
  } else if (handleId) {
    handle = bounds.find((d) => d.id === handleId)
  }

  return !handle ? undefined : handle
}

export const getEdgePositions = (
  sourceNode: GraphNode,
  sourceHandle: HandleElement | undefined,
  sourcePosition: Position,
  targetNode: GraphNode,
  targetHandle: HandleElement | undefined,
  targetPosition: Position,
): EdgePositions => {
  const sourceHandlePos = getHandlePosition(sourcePosition, sourceNode, sourceHandle)
  const targetHandlePos = getHandlePosition(targetPosition, targetNode, targetHandle)

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
  width: number
  height: number
  transform: Transform
}

export function isEdgeVisible({ sourcePos, targetPos, width, height, transform }: IsEdgeVisibleParams): boolean {
  const edgeBox = {
    x: Math.min(sourcePos.x, targetPos.x),
    y: Math.min(sourcePos.y, targetPos.y),
    x2: Math.max(sourcePos.x, targetPos.x),
    y2: Math.max(sourcePos.y, targetPos.y),
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

export const getSourceTargetNodes = (edge: GraphEdge | Edge, elements: FlowElements) => {
  const nodes: GraphNode[] = []
  for (const el of elements) {
    if (!nodes[0] || !nodes[1]) {
      if (isGraphNode(el)) {
        if (el.id === edge.source) nodes[0] = el
        if (el.id === edge.target) nodes[1] = el
      }
    } else {
      break
    }
  }
  return { sourceNode: nodes[0], targetNode: nodes[1] }
}
