import type { FunctionalComponent } from 'vue'
import { h } from 'vue'
import BaseEdge from './BaseEdge'
import { getBezierPath } from './utils'
import type { BezierEdgeProps, GraphNode } from '~/types'
import { Position } from '~/types'

const BezierEdge: FunctionalComponent<BezierEdgeProps> = function (
  { sourcePosition = Position.Bottom, targetPosition = Position.Top, ...props },
  { attrs },
) {
  let controlOffsetX = 0
  let controlOffsetY = 0
  if (attrs.sourceNode === attrs.targetNode) {
    if (
      (sourcePosition === Position.Bottom && targetPosition === Position.Top) ||
      (sourcePosition === Position.Top && targetPosition === Position.Bottom)
    ) {
      const source = attrs.sourceNode as GraphNode
      controlOffsetX = ((-40 - source.dimensions.width / 2) * 4) / 3
      controlOffsetY = 0
    } else if (
      (sourcePosition === Position.Left && targetPosition === Position.Right) ||
      (sourcePosition === Position.Right && targetPosition === Position.Left)
    ) {
      const source = attrs.sourceNode as GraphNode
      controlOffsetX = 0
      controlOffsetY = ((20 + source.dimensions.height / 2) * 4) / 3
    }
  }
  const [path, labelX, labelY] = getBezierPath({
    sourcePosition,
    targetPosition,
    controlOffsetX,
    controlOffsetY,
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
