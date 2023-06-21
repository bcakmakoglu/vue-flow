import type { FunctionalComponent } from 'vue'
import { h } from 'vue'
import BaseEdge from './BaseEdge'
import { getSimpleBezierPath } from './utils'
import type { GraphNode, SimpleBezierEdgeProps } from '~/types'
import { Position } from '~/types'

const SimpleBezierEdge: FunctionalComponent<SimpleBezierEdgeProps> = function (
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
  const [path, labelX, labelY] = getSimpleBezierPath({
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
SimpleBezierEdge.compatConfig = { MODE: 3 }

export default SimpleBezierEdge
