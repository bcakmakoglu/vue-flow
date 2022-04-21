import { CSSProperties, FunctionalComponent } from 'vue'
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
      style: { ...style },
      d: path,
      class: 'vue-flow__edge-path',
      markerEnd,
      markerStart,
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

export default BaseEdge
