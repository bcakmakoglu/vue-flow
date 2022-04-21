import { CSSProperties, FunctionalComponent } from 'vue'
import { MiniMapNodeProps } from '~/types'

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
      onClick: emit('click'),
      onDblClick: emit('dbl-click'),
    }),
    slots?.default?.(),
  ]
}

MiniMapNode.props = ['position', 'dimensions', 'strokeWidth', 'strokeColor', 'borderRadius', 'color', 'shapeRendering']
MiniMapNode.emits = ['click', 'dbl-click']

export default MiniMapNode
