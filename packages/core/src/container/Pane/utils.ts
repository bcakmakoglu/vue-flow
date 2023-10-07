import type { XYPosition } from '@xyflow/system'

export function getMousePosition(event: MouseEvent, containerBounds: DOMRect): XYPosition {
  return {
    x: event.clientX - containerBounds.left,
    y: event.clientY - containerBounds.top,
  }
}
