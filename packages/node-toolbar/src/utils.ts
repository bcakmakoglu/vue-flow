import type { Rect, Viewport } from '@vue-flow/core'
import { Position } from '@vue-flow/core'
import type { Align } from './types'

export function getTransform(nodeRect: Rect, transform: Viewport, position: Position, offset: number, align: Align): string {
  let alignmentOffset = 0.5

  if (align === 'start') {
    alignmentOffset = 0
  } else if (align === 'end') {
    alignmentOffset = 1
  }

  // position === Position.Top
  // we set the x any y position of the toolbar based on the nodes position
  let pos = [
    (nodeRect.x + nodeRect.width * alignmentOffset) * transform.zoom + transform.x,
    nodeRect.y * transform.zoom + transform.y - offset,
  ]
  // and then shift it based on the alignment. The shift values are in %.
  let shift = [-100 * alignmentOffset, -100]

  switch (position) {
    case Position.Right:
      pos = [
        (nodeRect.x + nodeRect.width) * transform.zoom + transform.x + offset,
        (nodeRect.y + nodeRect.height * alignmentOffset) * transform.zoom + transform.y,
      ]
      shift = [0, -100 * alignmentOffset]
      break
    case Position.Bottom:
      pos[1] = (nodeRect.y + nodeRect.height) * transform.zoom + transform.y + offset
      shift[1] = 0
      break
    case Position.Left:
      pos = [
        nodeRect.x * transform.zoom + transform.x - offset,
        (nodeRect.y + nodeRect.height * alignmentOffset) * transform.zoom + transform.y,
      ]
      shift = [-100, -100 * alignmentOffset]
      break
  }

  return `translate(${pos[0]}px, ${pos[1]}px) translate(${shift[0]}%, ${shift[1]}%)`
}
