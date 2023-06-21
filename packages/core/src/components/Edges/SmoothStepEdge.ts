import type { FunctionalComponent } from 'vue'
import { h } from 'vue'
import BaseEdge from './BaseEdge'
import { getSmoothStepPath } from './utils'
import type { GraphNode, SmoothStepEdgeProps } from '~/types'
import { Position } from '~/types'

const SmoothStepEdge: FunctionalComponent<SmoothStepEdgeProps> = function (
  { sourcePosition = Position.Bottom, targetPosition = Position.Top, ...props },
  { attrs },
) {
  let centerX, centerY
  if (attrs.sourceNode === attrs.targetNode) {
    if (
      (sourcePosition === Position.Bottom && targetPosition === Position.Top) ||
      (sourcePosition === Position.Top && targetPosition === Position.Bottom)
    ) {
      const source = attrs.sourceNode as GraphNode
      centerX = props.sourceX - (props.offset ?? 40) - source.dimensions.width / 2
      centerY = (props.sourceY + props.targetY) / 2
    } else if (
      (sourcePosition === Position.Left && targetPosition === Position.Right) ||
      (sourcePosition === Position.Right && targetPosition === Position.Left)
    ) {
      const source = attrs.sourceNode as GraphNode
      centerX = (props.sourceX + props.targetX) / 2
      centerY = props.sourceY + (props.offset ?? 20) + source.dimensions.height / 2
    }
  }
  const [path, labelX, labelY] = getSmoothStepPath({
    sourcePosition,
    targetPosition,
    centerX,
    centerY,
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
SmoothStepEdge.compatConfig = { MODE: 3 }

export default SmoothStepEdge
