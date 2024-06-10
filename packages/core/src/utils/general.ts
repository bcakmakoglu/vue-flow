import type { MouseTouchEvent } from '../types'

export function isMouseEvent(event: MouseTouchEvent): event is MouseEvent {
  return 'clientX' in event
}

export function getEventPosition(event: MouseTouchEvent, bounds?: DOMRect) {
  const isMouseTriggered = isMouseEvent(event)

  const evtX = isMouseTriggered ? event.clientX : (event as TouchEvent).touches?.[0].clientX
  const evtY = isMouseTriggered ? event.clientY : (event as TouchEvent).touches?.[0].clientY

  return {
    x: evtX - (bounds?.left ?? 0),
    y: evtY - (bounds?.top ?? 0),
  }
}

export const isMacOs = () => typeof navigator !== 'undefined' && navigator?.userAgent?.indexOf('Mac') >= 0
