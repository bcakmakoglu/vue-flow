import { XYPosition } from '../../types'

export function getMousePosition(event: MouseEvent): XYPosition | void {
  const flowNode = (event.target as Element).closest('.vue-flow')
  if (!flowNode) return

  const containerBounds = flowNode.getBoundingClientRect()

  return {
    x: event.clientX - containerBounds.left,
    y: event.clientY - containerBounds.top,
  }
}
