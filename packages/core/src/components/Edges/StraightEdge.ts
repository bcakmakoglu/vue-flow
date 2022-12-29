import type { FunctionalComponent } from 'vue'
import BaseEdge from './BaseEdge'
import type { BaseEdgeProps, EdgePositions } from '~/types'

export type StraightEdgeProps = EdgePositions & Omit<BaseEdgeProps, 'labelX' | 'labelY' | 'path'>

const StraightEdge: FunctionalComponent<StraightEdgeProps> = function (props, { attrs }) {
  const [path, labelX, labelY] = getStraightPath(props)

  return h(BaseEdge, {
    path,
    labelX,
    labelY,
    ...props,
    ...attrs,
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
  'interactionWidth',
]

StraightEdge.inheritAttrs = false

export default StraightEdge
