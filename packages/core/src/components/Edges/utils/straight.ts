import type { EdgePathParams } from './general'
import { getSimpleEdgeCenter } from './general'

export interface GetStraightPathParams {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}

/**
 * Get a simple bezier path from source to target handle (no curvature)
 * @public
 *
 * @param straightEdgeParams
 * @param straightEdgeParams.sourceX - The x position of the source handle
 * @param straightEdgeParams.sourceY - The y position of the source handle
 * @param straightEdgeParams.sourcePosition - The position of the source handle (default: Position.Bottom)
 * @param straightEdgeParams.targetX - The x position of the target handle
 * @param straightEdgeParams.targetY - The y position of the target handle
 * @param straightEdgeParams.targetPosition - The position of the target handle (default: Position.Top)
 * @returns A path string you can use in an SVG, the labelX and labelY position (center of path) and offsetX, offsetY between source handle and label
 */
export function getStraightPath(straightEdgeParams: GetStraightPathParams): EdgePathParams {
  const { sourceX, sourceY, targetX, targetY } = straightEdgeParams

  const [centerX, centerY, offsetX, offsetY] = getSimpleEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  })

  return [`M ${sourceX},${sourceY}L ${targetX},${targetY}`, centerX, centerY, offsetX, offsetY]
}
