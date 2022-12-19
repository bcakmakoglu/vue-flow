import { isNumber } from '@vueuse/core'
import type { FunctionalComponent } from 'vue'
import EdgeText from './EdgeText.vue'
import type { BaseEdgeProps } from '~/types'

/**
 * The base edge is a simple wrapper for svg path
 * You can use the base edge in your custom edges and just pass down the necessary props
 */
const BaseEdge: FunctionalComponent<BaseEdgeProps> = function (
  {
    path,
    label,
    labelX,
    labelY,
    labelBgBorderRadius,
    labelBgPadding,
    labelBgStyle,
    labelShowBg = true,
    labelStyle,
    markerStart,
    markerEnd,
    interactionWidth = 20,
  },
  { attrs },
) {
  return [
    h('path', {
      'style': attrs.style,
      'class': ['vue-flow__edge-path', attrs.class].join(' '),
      'd': path,
      'marker-end': markerEnd,
      'marker-start': markerStart,
    }),
    interactionWidth
      ? h('path', {
          'd': path,
          'fill': 'none',
          'stroke-opacity': 0,
          'stroke-width': interactionWidth,
        })
      : null,
    label && isNumber(labelX) && isNumber(labelY)
      ? h(EdgeText, {
          x: labelX,
          y: labelY,
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
  'labelX',
  'labelY',
  'label',
  'labelBgBorderRadius',
  'labelBgPadding',
  'labelBgStyle',
  'labelShowBg',
  'labelStyle',
  'markerStart',
  'markerEnd',
  'interactionWidth',
]

BaseEdge.inheritAttrs = false

export default BaseEdge
