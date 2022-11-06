import type { FunctionalComponent } from 'vue'
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
  offset,
  style,
}) {
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius,
    offset,
  })

  return h(BaseEdge, {
    path,
    labelX,
    labelY,
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
  'offset',
  'markerEnd',
  'markerStart',
  'style',
]
SmoothStepEdge.inheritAttrs = false

export default SmoothStepEdge
