import type { FunctionalComponent } from 'vue'
import BaseEdge from './BaseEdge'
import type { EdgeProps } from '~/types'

const StraightEdge: FunctionalComponent<EdgeProps> = function ({
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
  interactionWidth,
}) {
  const [path, labelX, labelY] = getStraightPath({ sourceX, sourceY, targetX, targetY })

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
    interactionWidth,
  })
}

StraightEdge.props = [
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
  'interactionWidth',
]
StraightEdge.inheritAttrs = false

export default StraightEdge
