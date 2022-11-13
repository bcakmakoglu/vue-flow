import type { FunctionalComponent } from 'vue'
import BaseEdge from './BaseEdge'
import { Position } from '~/types'
import type { EdgeProps } from '~/types'

const BezierEdge: FunctionalComponent<EdgeProps> = function ({
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top,
  ...props
}) {
  const [path, labelX, labelY] = getBezierPath({
    sourcePosition,
    targetPosition,
    ...props,
  })

  return h(BaseEdge, {
    path,
    labelX,
    labelY,
    ...props,
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
  'style',
  'interactionWidth',
  'ref',
]

BezierEdge.inheritAttrs = false

export default BezierEdge
