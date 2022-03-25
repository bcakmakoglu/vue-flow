import { GetBezierPathParams, GetCenterParams, GetControlWithCurvatureParams, GetSmoothStepPathParams, Position } from '~/types'

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

function calculateControlOffset(distance: number, curvature: number): number {
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

export function getBezierPath({
  sourceX,
  sourceY,
  sourcePosition = Position.Bottom,
  targetX,
  targetY,
  targetPosition = Position.Top,
  curvature = 0.25,
}: GetBezierPathParams): string {
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
  return `M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`
}

export function getBezierCenter({
  sourceX,
  sourceY,
  sourcePosition = Position.Bottom,
  targetX,
  targetY,
  targetPosition = Position.Top,
  curvature = 0.25,
}: GetBezierPathParams): [number, number, number, number] {
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
  // cubic bezier t=0.5 mid point, not the actual mid point, but easy to calculate
  // https://stackoverflow.com/questions/67516101/how-to-find-distance-mid-point-of-bezier-curve
  const centerX = sourceX * 0.125 + sourceControlX * 0.375 + targetControlX * 0.375 + targetX * 0.125
  const centerY = sourceY * 0.125 + sourceControlY * 0.375 + targetControlY * 0.375 + targetY * 0.125
  const xOffset = Math.abs(centerX - sourceX)
  const yOffset = Math.abs(centerY - sourceY)
  return [centerX, centerY, xOffset, yOffset]
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
