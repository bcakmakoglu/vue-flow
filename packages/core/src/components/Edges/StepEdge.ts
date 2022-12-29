import type { FunctionalComponent } from 'vue'
import SmoothStepEdge from './SmoothStepEdge'
import type { BaseEdgeProps, EdgePositions, EdgeProps } from '~/types'

export type StepEdgeProps = EdgePositions &
  Omit<BaseEdgeProps, 'labelX' | 'labelY' | 'path'> &
  Pick<EdgeProps, 'sourcePosition' | 'targetPosition'>

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
