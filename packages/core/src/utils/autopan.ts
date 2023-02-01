import type { Dimensions, XYPosition } from '~/types'

// returns a number between 0 and 1 that represents the velocity of the movement
// when the mouse is close to the edge of the canvas
const calcAutoPanVelocity = (value: number, min: number, max: number) => {
  if (value < min) {
    return clamp(Math.abs(value - min), 1, 50) / 50
  } else if (value > max) {
    return -clamp(Math.abs(value - max), 1, 50) / 50
  }

  return 0
}

export const calcAutoPan = (pos: XYPosition, bounds: Dimensions) => {
  const xMovement = calcAutoPanVelocity(pos.x, 35, bounds.width - 35) * 20
  const yMovement = calcAutoPanVelocity(pos.y, 35, bounds.height - 35) * 20

  return [xMovement, yMovement]
}
