import { defineComponent, h } from 'vue'
import { Position } from '@xyflow/system'
import BaseEdge from './BaseEdge.vue'
import { getSimpleBezierPath } from './utils'
import type { SimpleBezierEdgeProps } from '~/types'

const SimpleBezierEdge = defineComponent<SimpleBezierEdgeProps>({
  name: 'SimpleBezierEdge',
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
    'markerEnd',
    'markerStart',
    'interactionWidth',
  ] as any,
  compatConfig: { MODE: 3 },
  setup(props, { attrs }) {
    return () => {
      const [path, labelX, labelY] = getSimpleBezierPath({
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

export default SimpleBezierEdge
