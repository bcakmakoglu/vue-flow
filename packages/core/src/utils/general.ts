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

export function isString(val: any): val is string {
  return typeof val === 'string'
}

export function isFunction(val: any): val is Function {
  return typeof val === 'function'
}

export function isBoolean(val: any): val is boolean {
  return typeof val === 'boolean'
}

export function isNumber(val: any): val is number {
  return typeof val === 'number'
}

export const isMacOs = () => typeof navigator !== 'undefined' && navigator?.userAgent?.indexOf('Mac') >= 0
