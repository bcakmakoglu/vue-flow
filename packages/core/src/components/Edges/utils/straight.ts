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
}: GetStraightPathParams): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number] {
  const [centerX, centerY, offsetX, offsetY] = getSimpleEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  })

  return [`M ${sourceX},${sourceY}L ${targetX},${targetY}`, centerX, centerY, offsetX, offsetY]
}
