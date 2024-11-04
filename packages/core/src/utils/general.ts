import type { Dimensions, GraphNode, XYPosition } from '../types'
import { clampPosition } from './graph'

export function isMouseEvent(event: MouseEvent | TouchEvent): event is MouseEvent {
  return 'clientX' in event
}

export function getEventPosition(event: MouseEvent | TouchEvent, bounds?: DOMRect) {
  const isMouseTriggered = isMouseEvent(event)
  const evtX = isMouseTriggered ? event.clientX : event.touches?.[0].clientX
  const evtY = isMouseTriggered ? event.clientY : event.touches?.[0].clientY

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

export function clampPositionToParent(childPosition: XYPosition, childDimensions: Dimensions, parent: GraphNode) {
  const { width: parentWidth, height: parentHeight } = getNodeDimensions(parent)
  const { x: parentX, y: parentY } = parent.computedPosition

  return clampPosition(
    childPosition,
    [
      [parentX, parentY],
      [parentX + parentWidth, parentY + parentHeight],
    ],
    childDimensions,
  )
}
