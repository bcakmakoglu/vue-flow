import type { FunctionalComponent } from 'vue'
import { h } from 'vue'
import BaseEdge from './BaseEdge.vue'
import { getBezierPath } from './utils'
import type { BezierEdgeProps } from '~/types'
import { Position } from '~/types'

const BezierEdge: FunctionalComponent<BezierEdgeProps> = function (
  { sourcePosition = Position.Bottom, targetPosition = Position.Top, ...props },
  { attrs },
) {
  const [path, labelX, labelY] = getBezierPath({
    sourcePosition,
    targetPosition,
    ...props,
  })

  return h(BaseEdge as any, {
    path,
    labelX,
    labelY,
    ...props,
    ...attrs,
  })
}

BezierEdge.props = [
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
  'curvature',
  'markerEnd',
  'markerStart',
  'interactionWidth',
]

BezierEdge.inheritAttrs = false
BezierEdge.compatConfig = { MODE: 3 }

export default BezierEdge
