import { Position } from '../../../types'
import type { EdgePathParams } from './general'
import { getBezierEdgeCenter } from './general'

export interface GetSimpleBezierPathParams {
  sourceX: number
  sourceY: number
  sourcePosition?: Position
  targetX: number
  targetY: number
  targetPosition?: Position
}

interface GetControlParams {
  pos: Position
  x1: number
  y1: number
  x2: number
  y2: number
}

function getControl({ pos, x1, y1, x2, y2 }: GetControlParams): [number, number] {
  let ctX: number, ctY: number
  switch (pos) {
    case Position.Left:
    case Position.Right:
      ctX = 0.5 * (x1 + x2)
      ctY = y1
      break
    case Position.Top:
    case Position.Bottom:
      ctX = x1
      ctY = 0.5 * (y1 + y2)
      break
  }
  return [ctX, ctY]
}

/**
 * Get a simple bezier path from source to target handle (no curvature)
 * @public
 *
 * @param simpleBezierPathParams
 * @param simpleBezierPathParams.sourceX - The x position of the source handle
 * @param simpleBezierPathParams.sourceY - The y position of the source handle
 * @param simpleBezierPathParams.sourcePosition - The position of the source handle (default: Position.Bottom)
 * @param simpleBezierPathParams.targetX - The x position of the target handle
 * @param simpleBezierPathParams.targetY - The y position of the target handle
 * @param simpleBezierPathParams.targetPosition - The position of the target handle (default: Position.Top)
 * @returns A path string you can use in an SVG, the labelX and labelY position (center of path) and offsetX, offsetY between source handle and label
 */
export function getSimpleBezierPath(simpleBezierPathParams: GetSimpleBezierPathParams): EdgePathParams {
  const {
    sourceX,
    sourceY,
    sourcePosition = Position.Bottom,
    targetX,
    targetY,
    targetPosition = Position.Top,
  } = simpleBezierPathParams

  const [sourceControlX, sourceControlY] = getControl({
    pos: sourcePosition,
    x1: sourceX,
    y1: sourceY,
    x2: targetX,
    y2: targetY,
  })
  const [targetControlX, targetControlY] = getControl({
    pos: targetPosition,
    x1: targetX,
    y1: targetY,
    x2: sourceX,
    y2: sourceY,
  })

  const [centerX, centerY, offsetX, offsetY] = getBezierEdgeCenter({
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
    centerX,
    centerY,
    offsetX,
    offsetY,
  ]
}
