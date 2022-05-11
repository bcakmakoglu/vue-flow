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
}) {
  const centerY = computed(() => {
    const yOffset = Math.abs(targetY - sourceY) / 2
    return targetY < sourceY ? targetY + yOffset : targetY - yOffset
  })
  const centerX = computed(() => {
    const xOffset = Math.abs(targetX - sourceX) / 2
    return targetX < sourceX ? targetX + xOffset : targetX - xOffset
  })

  return h(BaseEdge, {
    path: `M ${sourceX},${sourceY}L ${targetX},${targetY}`,
    centerX: centerX.value,
    centerY: centerY.value,
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
