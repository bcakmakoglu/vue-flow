import type { CSSProperties, FunctionalComponent } from 'vue'
import EdgeText from './EdgeText.vue'

interface Props {
  centerX: number
  centerY: number
  path: string
  label?: any
  style?: CSSProperties
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  markerStart?: string
  markerEnd?: string
}

/**
 * The base edge is a simple wrapper for svg path
 * You can use the base edge in your custom edges and just pass down the necessary props
 */
const BaseEdge: FunctionalComponent<Props> = function ({
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
