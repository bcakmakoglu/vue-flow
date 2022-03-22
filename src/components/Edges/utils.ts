import { GetBezierPathParams, GetCenterParams, GetSmoothStepPathParams, Position } from '~/types'

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

export function getBezierPath({
  sourceX,
  sourceY,
  sourcePosition = Position.Bottom,
  targetX,
  targetY,
  targetPosition = Position.Top,
  curvature = 0.25,
  centerX,
  centerY,
}: GetBezierPathParams): string {
  const leftAndRight = [Position.Left, Position.Right]
  const hasCurvature = curvature > 0
  const [_centerX, _centerY] = getCenter({ sourceX, sourceY, targetX, targetY })

  if (leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    const cX = typeof centerX !== 'undefined' ? centerX : _centerX
    const distanceX = targetX - sourceX
    const absDistanceX = Math.abs(distanceX)
    const amtX = (Math.sqrt(absDistanceX) / 2) * (50 * curvature)

    let hx1 = cX
    let hx2 = cX

    if (hasCurvature) {
      const sourceAndTargetRight = sourcePosition === Position.Right && targetPosition === Position.Right
      const sourceAndTargetLeft = sourcePosition === Position.Left && targetPosition === Position.Left

      hx1 = sourceX + amtX
      hx2 = targetX - amtX

      if (sourceAndTargetLeft) {
        hx1 = sourceX - amtX
      } else if (sourceAndTargetRight) {
        hx2 = targetX + amtX
      } else if (sourcePosition === Position.Left && targetX <= sourceX) {
        hx1 = cX
        hx2 = cX
      } else if (sourcePosition === Position.Left && targetX > sourceX) {
        hx1 = sourceX - amtX
        hx2 = targetX + amtX
      }
    }

    return `M${sourceX},${sourceY} C${hx1},${sourceY} ${hx2},${targetY}, ${targetX},${targetY}`
  } else if (leftAndRight.includes(targetPosition)) {
    return `M${sourceX},${sourceY} Q${sourceX},${targetY} ${targetX},${targetY}`
  } else if (leftAndRight.includes(sourcePosition)) {
    return `M${sourceX},${sourceY} Q${targetX},${sourceY} ${targetX},${targetY}`
  }

  const cY = typeof centerY !== 'undefined' ? centerY : _centerY
  const distanceY = targetY - sourceY
  const absDistanceY = Math.abs(distanceY)
  const amtY = (Math.sqrt(absDistanceY) / 2) * (50 * curvature)

  let hy1 = cY
  let hy2 = cY

  if (hasCurvature) {
    hy1 = sourceY + amtY
    hy2 = targetY - amtY

    const sourceAndTargetTop = sourcePosition === Position.Top && targetPosition === Position.Top
    const sourceAndTargetBottom = sourcePosition === Position.Bottom && targetPosition === Position.Bottom

    if (sourceAndTargetTop) {
      hy1 = targetY - amtY
    } else if (sourceAndTargetBottom) {
      hy2 = targetY + amtY
    } else if (sourcePosition === Position.Top && targetY <= sourceY) {
      hy1 = cY
      hy2 = cY
    } else if (sourcePosition === Position.Top && targetY > sourceY) {
      hy1 = sourceY - amtY
      hy2 = targetY + amtY
    }
  }

  return `M${sourceX},${sourceY} C${sourceX},${hy1} ${targetX},${hy2} ${targetX},${targetY}`
}

// These are some helper methods for drawing the round corners
// The name indicates the direction of the path. "bottomLeftCorner" goes
// from bottom to the left and "leftBottomCorner" goes from left to the bottom.
// We have to consider the direction of the paths because of the animated lines.
const bottomLeftCorner = (x: number, y: number, size: number): string => `L ${x},${y - size}Q ${x},${y} ${x + size},${y}`
const leftBottomCorner = (x: number, y: number, size: number): string => `L ${x + size},${y}Q ${x},${y} ${x},${y - size}`
const bottomRightCorner = (x: number, y: number, size: number): string => `L ${x},${y - size}Q ${x},${y} ${x - size},${y}`
const rightBottomCorner = (x: number, y: number, size: number): string => `L ${x - size},${y}Q ${x},${y} ${x},${y - size}`
const leftTopCorner = (x: number, y: number, size: number): string => `L ${x + size},${y}Q ${x},${y} ${x},${y + size}`
const topLeftCorner = (x: number, y: number, size: number): string => `L ${x},${y + size}Q ${x},${y} ${x + size},${y}`
const topRightCorner = (x: number, y: number, size: number): string => `L ${x},${y + size}Q ${x},${y} ${x - size},${y}`
const rightTopCorner = (x: number, y: number, size: number): string => `L ${x - size},${y}Q ${x},${y} ${x},${y + size}`

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
    } else if (
      (sourcePosition === Position.Right && targetPosition === Position.Left) ||
      (sourcePosition === Position.Left && targetPosition === Position.Right) ||
      (sourcePosition === Position.Left && targetPosition === Position.Left)
    ) {
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
