import { defineComponent, h } from 'vue'
import { Position, getBezierPath } from '@xyflow/system'
import BaseEdge from './BaseEdge.vue'
import type { BezierEdgeProps } from '~/types'

const BezierEdge = defineComponent<BezierEdgeProps>({
  name: 'BezierEdge',
  props: [
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
  ] as any,
  compatConfig: { MODE: 3 },
  setup(props, { attrs }) {
    return () => {
      const [path, labelX, labelY] = getBezierPath({
        ...props,
        sourcePosition: props.sourcePosition ?? Position.Bottom,
        targetPosition: props.targetPosition ?? Position.Top,
      })

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

export default BezierEdge
