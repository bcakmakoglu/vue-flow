import type { FunctionalComponent } from 'vue'
import BaseEdge from './BaseEdge'
import type { EdgeProps } from '~/types'

const StraightEdge: FunctionalComponent<EdgeProps> = function (props) {
  const [path, labelX, labelY] = getStraightPath(props)

  return h(BaseEdge, {
    path,
    labelX,
    labelY,
    ...props,
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
