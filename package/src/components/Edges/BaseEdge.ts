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

export default (function BaseEdge(props: Props, { attrs }) {
  return [
    h('path', {
      style: attrs.style,
      d: props.path,
      class: 'vue-flow__edge-path',
      markerEnd: props.markerEnd,
      markerStart: props.markerStart,
    }),
    props.label
      ? h(EdgeText, {
          x: props.centerX,
          y: props.centerY,
          label: props.label,
          labelStyle: props.labelStyle,
          labelShowBg: props.labelShowBg,
          labelBgStyle: props.labelBgStyle,
          labelBgPadding: props.labelBgPadding,
          labelBgBorderRadius: props.labelBgBorderRadius,
        })
      : null,
  ]
} as FunctionalComponent)
