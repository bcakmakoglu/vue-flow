import type { FunctionalComponent } from 'vue'
import BaseEdge from './BaseEdge'
import { Position } from '~/types'
import type { BaseEdgeProps, EdgePositions, EdgeProps } from '~/types'

export type SimpleBezierEdgeProps = EdgePositions &
  Omit<BaseEdgeProps, 'labelX' | 'labelY' | 'path'> &
  Pick<EdgeProps, 'sourcePosition' | 'targetPosition'>

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
