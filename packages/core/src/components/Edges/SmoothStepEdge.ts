import type { FunctionalComponent } from 'vue'
import BaseEdge from './BaseEdge'
import type { BaseEdgeProps, EdgePositions, EdgeProps, SmoothStepPathOptions } from '~/types'
import { Position } from '~/types'

export type SmoothStepEdgeProps = EdgePositions &
  Omit<BaseEdgeProps, 'labelX' | 'labelY' | 'path'> &
  Pick<EdgeProps, 'sourcePosition' | 'targetPosition'> &
  SmoothStepPathOptions

const SmoothStepEdge: FunctionalComponent<SmoothStepEdgeProps> = function (
  { sourcePosition = Position.Bottom, targetPosition = Position.Top, ...props },
  { attrs },
) {
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
    ...attrs,
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
  'interactionWidth',
  'offset',
]

SmoothStepEdge.inheritAttrs = false

export default SmoothStepEdge
