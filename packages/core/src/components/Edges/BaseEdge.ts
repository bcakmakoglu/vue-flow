import type { Component, FunctionalComponent } from 'vue'
import { h } from 'vue'
import EdgeText from './EdgeText.vue'
import type { BaseEdgeProps } from '~/types'
import { isNumber } from '~/utils'

/**
 * The base edge is a simple wrapper for svg path
 * You can use the base edge in your custom edges and just pass down the necessary props
 */
const BaseEdge: FunctionalComponent<BaseEdgeProps> = function (
  {
    id,
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
      'id': id,
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
          'class': 'vue-flow__edge-interaction',
        })
      : null,
    label && isNumber(labelX) && isNumber(labelY)
      ? h(EdgeText as Component, {
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
  'id',
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
BaseEdge.compatConfig = { MODE: 3 }

export default BaseEdge
