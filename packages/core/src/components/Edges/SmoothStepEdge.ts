import type { FunctionalComponent } from 'vue'
import BaseEdge from './BaseEdge'
import type { SmoothStepEdgeProps } from '~/types'
import { Position } from '~/types'

const SmoothStepEdge: FunctionalComponent<SmoothStepEdgeProps> = function ({
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top,
  ...props
}) {
  const [path, labelX, labelY] = getSmoothStepPath({
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
  'interactionWidth',
]

SmoothStepEdge.inheritAttrs = false

export default SmoothStepEdge
