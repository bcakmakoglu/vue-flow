import { defineComponent, h } from 'vue'
import SmoothStepEdge from './SmoothStepEdge'

const StepEdge = defineComponent({
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
