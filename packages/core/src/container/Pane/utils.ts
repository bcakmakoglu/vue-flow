import type { XYPosition } from '~/types'

export function getMousePosition(event: MouseEvent, containerBounds: DOMRect): XYPosition {
  return {
    x: event.clientX - containerBounds.left,
    y: event.clientY - containerBounds.top,
  }
}
