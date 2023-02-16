import { getSimpleEdgeCenter } from './general'

export interface GetStraightPathParams {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}

export function getStraightPath({
  sourceX,
  sourceY,
  targetX,
  targetY,
}: GetStraightPathParams): [string, number, number, number, number] {
  const [centerX, centerY, offsetX, offsetY] = getSimpleEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  })

  return [`M ${sourceX},${sourceY}L ${targetX},${targetY}`, centerX, centerY, offsetX, offsetY]
}
