import { FunctionalComponent, HTMLAttributes } from 'vue'
import { Position } from '~/types'

interface Props extends HTMLAttributes {
  position: Position
  centerX: number
  centerY: number
  radius?: number
}

const shiftX = (x: number, shift: number, position: Position): number => {
  if (position === Position.Left) return x - shift
  if (position === Position.Right) return x + shift
  return x
}

const shiftY = (y: number, shift: number, position: Position): number => {
  if (position === Position.Top) return y - shift
  if (position === Position.Bottom) return y + shift
  return y
}

const EdgeAnchor: FunctionalComponent<Props> = function ({ radius = 10, centerX = 0, centerY = 0, position = Position.Top }) {
  const cx = computed(() => {
    const val = shiftX(centerX, radius, position)
    if (isNaN(val)) return 0
    else return val
  })
  const cy = computed(() => {
    const val = shiftY(centerY, radius, position)
    if (isNaN(val)) return 0
    else return val
  })

  return h('circle', {
    class: 'vue-flow__edgeupdater',
    cx: cx.value,
    cy: cy.value,
    r: radius,
    stroke: 'transparent',
    fill: 'transparent',
  })
}

EdgeAnchor.props = ['radius', 'centerX', 'centerY', 'position']

export default EdgeAnchor
