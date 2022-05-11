import type { FunctionalComponent } from 'vue'
import { getCenter, getSmoothStepPath } from './utils'
import BaseEdge from './BaseEdge'
import type { SmoothStepEdgeProps } from '~/types'
import { Position } from '~/types'

const SmoothStepEdge: FunctionalComponent<SmoothStepEdgeProps> = function ({
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
  borderRadius,
  style,
}) {
  const [centerX, centerY] = getCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  })

  const path = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius,
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

SmoothStepEdge.props = [
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
  'borderRadius',
  'markerEnd',
  'markerStart',
  'style',
]
SmoothStepEdge.inheritAttrs = false

export default SmoothStepEdge
