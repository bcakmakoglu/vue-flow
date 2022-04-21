import { FunctionalComponent } from 'vue'
import { getSimpleBezierCenter, getSimpleBezierPath } from './utils'
import BaseEdge from './BaseEdge'
import { Position } from '~/types'
import type { EdgeProps } from '~/types'

const SimpleBezierEdge: FunctionalComponent<EdgeProps> = function ({
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top,
  label,
  labelStyle = {},
  labelShowBg = true,
  labelBgStyle = {},
  labelBgPadding,
  labelBgBorderRadius,
  sourceY,
  sourceX,
  targetX,
  targetY,
  markerEnd,
  markerStart,
  style,
}) {
  const [centerX, centerY] = getSimpleBezierCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  })

  const path = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  })

  return h(BaseEdge, {
    path,
    centerX,
    centerY,
    label,
    labelStyle,
    labelShowBg,
    labelBgStyle,
    labelBgPadding,
    labelBgBorderRadius,
    style,
    markerEnd,
    markerStart,
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
  'style',
]
SimpleBezierEdge.inheritAttrs = false

export default SimpleBezierEdge
