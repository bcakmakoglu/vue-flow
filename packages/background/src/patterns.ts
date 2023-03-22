import type { FunctionalComponent } from 'vue'
import { BackgroundVariant } from './types'

interface LinePatternProps {
  dimensions: [number, number]
  size?: number
  color: string
}

export const LinePattern: FunctionalComponent<LinePatternProps> = function ({ dimensions, size, color }) {
  return h('path', {
    'stroke': color,
    'stroke-width': size,
    'd': `M${dimensions[0] / 2} 0 V${dimensions[1]} M0 ${dimensions[1] / 2} H${dimensions[0]}`,
  })
}

interface DotPatternProps {
  radius: number
  color: string
}

export const DotPattern: FunctionalComponent<DotPatternProps> = function ({ radius, color }) {
  return h('circle', { cx: radius, cy: radius, r: radius, fill: color })
}

export const Patterns = {
  [BackgroundVariant.Lines]: LinePattern,
  [BackgroundVariant.Dots]: DotPattern,
}
