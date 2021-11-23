import { ArrowHeadType, Position } from '~/types'

export const getMarkerEnd = (arrowHeadType?: ArrowHeadType, markerEndId?: string): string => {
  if (typeof markerEndId !== 'undefined' && markerEndId) {
    return `url(#${markerEndId})`
  }

  return typeof arrowHeadType !== 'undefined' ? `url(#vue-flow__${arrowHeadType})` : 'none'
}

export interface GetCenterParams {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition?: Position
  targetPosition?: Position
}

const LeftOrRight = [Position.Left, Position.Right]

export const getCenter = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top,
}: GetCenterParams): [number, number, number, number] => {
  const sourceIsLeftOrRight = LeftOrRight.includes(sourcePosition)
  const targetIsLeftOrRight = LeftOrRight.includes(targetPosition)

  // we expect flows to be horizontal or vertical (all handles left or right respectively top or bottom)
  // a mixed edge is when one the source is on the left and the target is on the top for example.
  const mixedEdge = (sourceIsLeftOrRight && !targetIsLeftOrRight) || (targetIsLeftOrRight && !sourceIsLeftOrRight)

  if (mixedEdge) {
    const xOffset = sourceIsLeftOrRight ? Math.abs(targetX - sourceX) : 0
    const centerX = sourceX > targetX ? sourceX - xOffset : sourceX + xOffset

    const yOffset = sourceIsLeftOrRight ? 0 : Math.abs(targetY - sourceY)
    const centerY = sourceY < targetY ? sourceY + yOffset : sourceY - yOffset

    return [centerX, centerY, xOffset, yOffset]
  }

  const xOffset = Math.abs(targetX - sourceX) / 2
  const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset

  const yOffset = Math.abs(targetY - sourceY) / 2
  const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset

  return [centerX, centerY, xOffset, yOffset]
}

interface GetBezierPathParams {
  sourceX: number
  sourceY: number
  sourcePosition?: Position
  targetX: number
  targetY: number
  targetPosition?: Position
  centerX?: number
  centerY?: number
}

export function getBezierPath({
  sourceX,
  sourceY,
  sourcePosition = Position.Bottom,
  targetX,
  targetY,
  targetPosition = Position.Top,
  centerX,
  centerY,
}: GetBezierPathParams): string {
  const [_centerX, _centerY] = getCenter({ sourceX, sourceY, targetX, targetY })
  const leftAndRight = [Position.Left, Position.Right]

  const cX = typeof centerX !== 'undefined' ? centerX : _centerX
  const cY = typeof centerY !== 'undefined' ? centerY : _centerY

  let path = `M${sourceX},${sourceY} C${sourceX},${cY} ${targetX},${cY} ${targetX},${targetY}`

  if (leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    path = `M${sourceX},${sourceY} C${cX},${sourceY} ${cX},${targetY} ${targetX},${targetY}`
  } else if (leftAndRight.includes(targetPosition)) {
    path = `M${sourceX},${sourceY} Q${sourceX},${targetY} ${sourceX},${targetY} ${targetX},${targetY}`
  } else if (leftAndRight.includes(sourcePosition)) {
    path = `M${sourceX},${sourceY} Q${targetX},${sourceY} ${targetX},${sourceY} ${targetX},${targetY}`
  }

  return path
}

// These are some helper methods for drawing the round corners
// The name indicates the direction of the path. "bottomLeftCorner" goes
// from bottom to the left and "leftBottomCorner" goes from left to the bottom.
// We have to consider the direction of the paths because of the animated lines.
export const bottomLeftCorner = (x: number, y: number, size: number): string => `L ${x},${y - size}Q ${x},${y} ${x + size},${y}`
export const leftBottomCorner = (x: number, y: number, size: number): string => `L ${x + size},${y}Q ${x},${y} ${x},${y - size}`
export const bottomRightCorner = (x: number, y: number, size: number): string => `L ${x},${y - size}Q ${x},${y} ${x - size},${y}`
export const rightBottomCorner = (x: number, y: number, size: number): string => `L ${x - size},${y}Q ${x},${y} ${x},${y - size}`
export const leftTopCorner = (x: number, y: number, size: number): string => `L ${x + size},${y}Q ${x},${y} ${x},${y + size}`
export const topLeftCorner = (x: number, y: number, size: number): string => `L ${x},${y + size}Q ${x},${y} ${x + size},${y}`
export const topRightCorner = (x: number, y: number, size: number): string => `L ${x},${y + size}Q ${x},${y} ${x - size},${y}`
export const rightTopCorner = (x: number, y: number, size: number): string => `L ${x - size},${y}Q ${x},${y} ${x},${y + size}`

export interface GetSmoothStepPathParams {
  sourceX: number
  sourceY: number
  sourcePosition?: Position
  targetX: number
  targetY: number
  targetPosition?: Position
  borderRadius?: number
  centerX?: number
  centerY?: number
}

export function getSmoothStepPath({
  sourceX,
  sourceY,
  sourcePosition = Position.Bottom,
  targetX,
  targetY,
  targetPosition = Position.Top,
  borderRadius = 5,
  centerX,
  centerY,
}: GetSmoothStepPathParams): string {
  const [_centerX, _centerY, offsetX, offsetY] = getCenter({ sourceX, sourceY, targetX, targetY })
  const cornerWidth = Math.min(borderRadius, Math.abs(targetX - sourceX))
  const cornerHeight = Math.min(borderRadius, Math.abs(targetY - sourceY))
  const cornerSize = Math.min(cornerWidth, cornerHeight, offsetX, offsetY)
  const leftAndRight = [Position.Left, Position.Right]
  const cX = typeof centerX !== 'undefined' ? centerX : _centerX
  const cY = typeof centerY !== 'undefined' ? centerY : _centerY

  let firstCornerPath
  let secondCornerPath

  if (sourceX <= targetX) {
    firstCornerPath = sourceY <= targetY ? bottomLeftCorner(sourceX, cY, cornerSize) : topLeftCorner(sourceX, cY, cornerSize)
    secondCornerPath = sourceY <= targetY ? rightTopCorner(targetX, cY, cornerSize) : rightBottomCorner(targetX, cY, cornerSize)
  } else {
    firstCornerPath = sourceY < targetY ? bottomRightCorner(sourceX, cY, cornerSize) : topRightCorner(sourceX, cY, cornerSize)
    secondCornerPath = sourceY < targetY ? leftTopCorner(targetX, cY, cornerSize) : leftBottomCorner(targetX, cY, cornerSize)
  }

  if (leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    if (sourceX <= targetX) {
      firstCornerPath = sourceY <= targetY ? rightTopCorner(cX, sourceY, cornerSize) : rightBottomCorner(cX, sourceY, cornerSize)
      secondCornerPath = sourceY <= targetY ? bottomLeftCorner(cX, targetY, cornerSize) : topLeftCorner(cX, targetY, cornerSize)
    } else if (sourcePosition === Position.Right && targetPosition === Position.Left) {
      // and sourceX > targetX
      firstCornerPath = sourceY <= targetY ? leftTopCorner(cX, sourceY, cornerSize) : leftBottomCorner(cX, sourceY, cornerSize)
      secondCornerPath = sourceY <= targetY ? bottomRightCorner(cX, targetY, cornerSize) : topRightCorner(cX, targetY, cornerSize)
    }
  } else if (leftAndRight.includes(sourcePosition) && !leftAndRight.includes(targetPosition)) {
    if (sourceX <= targetX) {
      firstCornerPath =
        sourceY <= targetY ? rightTopCorner(targetX, sourceY, cornerSize) : rightBottomCorner(targetX, sourceY, cornerSize)
    } else {
      firstCornerPath =
        sourceY <= targetY ? leftTopCorner(targetX, sourceY, cornerSize) : leftBottomCorner(targetX, sourceY, cornerSize)
    }
    secondCornerPath = ''
  } else if (!leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    if (sourceX <= targetX) {
      firstCornerPath =
        sourceY <= targetY ? bottomLeftCorner(sourceX, targetY, cornerSize) : topLeftCorner(sourceX, targetY, cornerSize)
    } else {
      firstCornerPath =
        sourceY <= targetY ? bottomRightCorner(sourceX, targetY, cornerSize) : topRightCorner(sourceX, targetY, cornerSize)
    }
    secondCornerPath = ''
  }

  return `M ${sourceX},${sourceY}${firstCornerPath}${secondCornerPath}L ${targetX},${targetY}`
}
