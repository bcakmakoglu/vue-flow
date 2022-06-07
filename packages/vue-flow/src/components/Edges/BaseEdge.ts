import type { FunctionalComponent } from 'vue'
import EdgeText from './EdgeText.vue'
import type { BaseEdgeProps } from '~/types'

/**
 * The base edge is a simple wrapper for svg path
 * You can use the base edge in your custom edges and just pass down the necessary props
 */
const BaseEdge: FunctionalComponent<BaseEdgeProps> = function ({
  path,
  centerX,
  centerY,
  label,
  labelBgBorderRadius,
  labelBgPadding,
  labelBgStyle,
  labelShowBg,
  labelStyle,
  markerStart,
  markerEnd,
  style,
}) {
  return [
    h('path', {
      'style': { ...style },
      'd': path,
      'class': 'vue-flow__edge-path',
      'marker-end': markerEnd,
      'marker-start': markerStart,
    }),
    label
      ? h(EdgeText, {
          x: centerX,
          y: centerY,
          label,
          labelStyle,
          labelShowBg,
          labelBgStyle,
          labelBgPadding,
          labelBgBorderRadius,
        })
      : null,
  ]
}

BaseEdge.props = [
  'path',
  'centerX',
  'centerY',
  'label',
  'labelBgBorderRadius',
  'labelBgPadding',
  'labelBgStyle',
  'labelShowBg',
  'labelStyle',
  'markerStart',
  'markerEnd',
  'style',
]
BaseEdge.inheritAttrs = false

export default BaseEdge
