import { defineComponent, h } from 'vue'
import type { StepEdgeProps } from '../../types'
import SmoothStepEdge from './SmoothStepEdge'

const StepEdge = defineComponent<StepEdgeProps>({
  name: 'StepEdge',
  // see StraightEdge: keep undeclared attrs from auto-applying to the SmoothStepEdge root
  inheritAttrs: false,
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
