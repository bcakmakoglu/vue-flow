import type { FunctionalComponent } from 'vue'
import SmoothStepEdge from './SmoothStepEdge'
import type { StepEdgeProps } from '~/types'

const StepEdge: FunctionalComponent<StepEdgeProps> = function (props, { attrs }) {
  return h(SmoothStepEdge, { ...props, ...attrs, borderRadius: 0 })
}

StepEdge.props = [
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
]

StepEdge.inheritAttrs = false

export default StepEdge
