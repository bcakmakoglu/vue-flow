import type { FunctionalComponent } from 'vue'
import { h } from 'vue'
import BaseEdge from './BaseEdge.vue'
import { getStraightPath } from './utils'
import type { StraightEdgeProps } from '~/types'

const StraightEdge: FunctionalComponent<StraightEdgeProps> = function (props, { attrs }) {
  const [path, labelX, labelY] = getStraightPath(props)

  return h(BaseEdge as any, {
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
StraightEdge.compatConfig = { MODE: 3 }

export default StraightEdge
