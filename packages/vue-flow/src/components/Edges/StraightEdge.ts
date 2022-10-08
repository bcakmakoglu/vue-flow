import type { FunctionalComponent } from 'vue'
import BaseEdge from './BaseEdge'
import { getStraightPath } from './utils'
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
]
StraightEdge.inheritAttrs = false

export default StraightEdge
