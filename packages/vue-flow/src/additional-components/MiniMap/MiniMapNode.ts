import type { CSSProperties, FunctionalComponent } from 'vue'
import type { MiniMapNodeProps } from '~/types'

const MiniMapNode: FunctionalComponent<MiniMapNodeProps> = function (
  {
    position: { x, y },
    dimensions: { height, width },
    strokeWidth,
    strokeColor,
    borderRadius,
    color,
    shapeRendering = 'geometricPrecision',
  },
  { attrs, emit, slots },
) {
  const style = (attrs.style ?? {}) as CSSProperties

  return [
    h('rect', {
      class: ['vue-flow__minimap-node', attrs.class].join(' '),
      style,
      x,
      y,
      rx: borderRadius,
      ry: borderRadius,
      width,
      height,
      fill: color || (style.background as string) || style.backgroundColor,
      stroke: strokeColor,
      strokeWidth,
      shapeRendering,
      onClick: (e: MouseEvent) => emit('click', e),
      onDblClick: (e: MouseEvent) => emit('dblclick', e),
    }),
    slots?.default?.(),
  ]
}

MiniMapNode.props = ['position', 'dimensions', 'strokeWidth', 'strokeColor', 'borderRadius', 'color', 'shapeRendering']

// @todo add mouseover events
MiniMapNode.emits = ['click', 'dblclick']

export default MiniMapNode
