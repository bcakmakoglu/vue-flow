import { XYPosition } from '~/types'

export function getMousePosition(event: MouseEvent): XYPosition | void {
  const revueFlowNode = (event.target as Element).closest('.revue-flow')
  if (!revueFlowNode) {
    return
  }

  const containerBounds = revueFlowNode.getBoundingClientRect()

  return {
    x: event.clientX - containerBounds.left,
    y: event.clientY - containerBounds.top,
  }
}
