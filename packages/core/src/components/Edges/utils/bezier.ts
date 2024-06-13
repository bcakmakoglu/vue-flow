import { Position } from '../../../types'
import type { EdgePathParams } from './general'
import { getBezierEdgeCenter } from './general'

export interface GetBezierPathParams {
  sourceX: number
  sourceY: number
  sourcePosition?: Position
  targetX: number
  targetY: number
  targetPosition?: Position
  curvature?: number
}

interface GetControlWithCurvatureParams {
  pos: Position
  x1: number
  y1: number
  x2: number
  y2: number
  c: number
}

function calculateControlOffset(distance: number, curvature: number) {
  if (distance >= 0) {
    return 0.5 * distance
  } else {
    return curvature * 25 * Math.sqrt(-distance)
  }
}

function getControlWithCurvature({ pos, x1, y1, x2, y2, c }: GetControlWithCurvatureParams): [number, number] {
  let ctX: number, ctY: number
  switch (pos) {
    case Position.Left:
      ctX = x1 - calculateControlOffset(x1 - x2, c)
      ctY = y1
      break
    case Position.Right:
      ctX = x1 + calculateControlOffset(x2 - x1, c)
      ctY = y1
      break
    case Position.Top:
      ctX = x1
      ctY = y1 - calculateControlOffset(y1 - y2, c)
      break
    case Position.Bottom:
      ctX = x1
      ctY = y1 + calculateControlOffset(y2 - y1, c)
      break
  }
  return [ctX, ctY]
}

/**
 * Get a bezier path from source to target handle
 * @public
 *
 * @param bezierPathParams
 * @param bezierPathParams.sourceX - The x position of the source handle
 * @param bezierPathParams.sourceY - The y position of the source handle
 * @param bezierPathParams.sourcePosition - The position of the source handle (default: Position.Bottom)
 * @param bezierPathParams.targetX - The x position of the target handle
 * @param bezierPathParams.targetY - The y position of the target handle
 * @param bezierPathParams.targetPosition - The position of the target handle (default: Position.Top)
 * @param bezierPathParams.curvature - The curvature of the edge (default: 0.25)
 * @returns A path string you can use in an SVG, the labelX and labelY position (center of path) and offsetX, offsetY between source handle and label
 */
export function getBezierPath(bezierPathParams: GetBezierPathParams): EdgePathParams {
  const {
    sourceX,
    sourceY,
    sourcePosition = Position.Bottom,
    targetX,
    targetY,
    targetPosition = Position.Top,
    curvature = 0.25,
  } = bezierPathParams

  const [sourceControlX, sourceControlY] = getControlWithCurvature({
    pos: sourcePosition,
    x1: sourceX,
    y1: sourceY,
    x2: targetX,
    y2: targetY,
    c: curvature,
  })
  const [targetControlX, targetControlY] = getControlWithCurvature({
    pos: targetPosition,
    x1: targetX,
    y1: targetY,
    x2: sourceX,
    y2: sourceY,
    c: curvature,
  })
  const [labelX, labelY, offsetX, offsetY] = getBezierEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourceControlX,
    sourceControlY,
    targetControlX,
    targetControlY,
  })

  return [
    `M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`,
    labelX,
    labelY,
    offsetX,
    offsetY,
  ]
}
