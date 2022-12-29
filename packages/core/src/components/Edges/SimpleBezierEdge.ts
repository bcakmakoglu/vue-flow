import type { FunctionalComponent } from 'vue'
import BaseEdge from './BaseEdge'
import type { SimpleBezierEdgeProps } from '~/types'
import { Position } from '~/types'

const SimpleBezierEdge: FunctionalComponent<SimpleBezierEdgeProps> = function (
  { sourcePosition = Position.Bottom, targetPosition = Position.Top, ...props },
  { attrs },
) {
  const [path, labelX, labelY] = getSimpleBezierPath({
    sourcePosition,
    targetPosition,
    ...props,
  })

  return h(BaseEdge, {
    path,
    labelX,
    labelY,
    ...props,
    ...attrs,
  })
}

SimpleBezierEdge.props = [
  'sourcePosition',
  'targetPosition',
  'label',
  'labelStyle',
  'labelShowBg',
  'labelBgStyle',
  'labelBgPadding',
  'labelBgBorderRadius',
  'sourceY',
  'sourceX',
  'targetX',
  'targetY',
  'markerEnd',
  'markerStart',
  'interactionWidth',
]

SimpleBezierEdge.inheritAttrs = false

export default SimpleBezierEdge
