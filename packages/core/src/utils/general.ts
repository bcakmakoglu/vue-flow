import type { GraphNode, SnapGrid, XYPosition } from '../types'
import type { UseDragEvent } from '../composables'

export function isMouseEvent(event: MouseEvent | TouchEvent): event is MouseEvent {
  return 'clientX' in event
}

export function isUseDragEvent(event: any): event is UseDragEvent {
  return 'sourceEvent' in event
}

export function getEventPosition(event: MouseEvent | TouchEvent, bounds?: DOMRect) {
  const isMouse = isMouseEvent(event)

  let evtX: number
  let evtY: number

  if (isMouse) {
    evtX = event.clientX
    evtY = event.clientY
  } else if ('touches' in event && event.touches.length > 0) {
    evtX = event.touches[0].clientX
    evtY = event.touches[0].clientY
  } else if ('changedTouches' in event && event.changedTouches.length > 0) {
    evtX = event.changedTouches[0].clientX
    evtY = event.changedTouches[0].clientY
  } else {
    // fallback for other cases
    evtX = 0
    evtY = 0
  }

  return {
    x: evtX - (bounds?.left ?? 0),
    y: evtY - (bounds?.top ?? 0),
  }
}

export const isMacOs = () => typeof navigator !== 'undefined' && navigator?.userAgent?.indexOf('Mac') >= 0

export function getNodeDimensions(node: GraphNode): { width: number; height: number } {
  return {
    width: node.dimensions?.width ?? node.width ?? 0,
    height: node.dimensions?.height ?? node.height ?? 0,
  }
}

export function snapPosition(position: XYPosition, snapGrid: SnapGrid = [1, 1]): XYPosition {
  return {
    x: snapGrid[0] * Math.round(position.x / snapGrid[0]),
    y: snapGrid[1] * Math.round(position.y / snapGrid[1]),
  }
}
