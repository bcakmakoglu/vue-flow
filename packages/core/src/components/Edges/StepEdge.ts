import type { FunctionalComponent } from 'vue'
import SmoothStepEdge from './SmoothStepEdge'
import type { EdgeProps } from '~/types'

const StepEdge: FunctionalComponent<EdgeProps> = function (props) {
  return h(SmoothStepEdge, { ...props, borderRadius: 0 })
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
  'style',
  'interactionWidth',
]

StepEdge.inheritAttrs = false

export default StepEdge
