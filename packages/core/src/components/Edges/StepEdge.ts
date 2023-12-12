import { defineComponent, h } from 'vue'
import type { StepEdgeProps } from '../../types'
import SmoothStepEdge from './SmoothStepEdge'

const StepEdge = defineComponent<StepEdgeProps>({
  name: 'StepEdge',
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
  setup(props, { attrs }) {
    return () => h(SmoothStepEdge as any, { ...props, ...attrs, borderRadius: 0 })
  },
})

export default StepEdge
