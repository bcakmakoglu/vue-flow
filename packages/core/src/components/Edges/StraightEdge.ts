import type { FunctionalComponent } from 'vue'
import BaseEdge from './BaseEdge'
import type { EdgeProps } from '~/types'

const StraightEdge: FunctionalComponent<EdgeProps> = function (props, { attrs }) {
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
