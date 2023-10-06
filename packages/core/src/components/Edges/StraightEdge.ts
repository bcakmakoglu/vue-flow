import { defineComponent, h } from 'vue'
import BaseEdge from './BaseEdge.vue'
import { getStraightPath } from './utils'
import type { StraightEdgeProps } from '~/types'

const StraightEdge = defineComponent<StraightEdgeProps>({
  name: 'StraightEdge',
  props: [
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
  ] as any,
  compatConfig: { MODE: 3 },
  setup(props, { attrs }) {
    return () => {
      const [path, labelX, labelY] = getStraightPath(props)

      return h(BaseEdge as any, {
        path,
        labelX,
        labelY,
        ...attrs,
        ...props,
      })
    }
  },
})

export default StraightEdge
