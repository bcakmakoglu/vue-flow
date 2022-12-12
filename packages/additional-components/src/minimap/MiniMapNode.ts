import type { CSSProperties, Slots } from 'vue'
import type { MiniMapNodeProps } from './types'
import { MiniMapSlots } from './types'

export default defineComponent({
  name: 'MiniMapNode',
  props: [
    'id',
    'position',
    'dimensions',
    'strokeWidth',
    'strokeColor',
    'borderRadius',
    'color',
    'shapeRendering',
    'type',
    'selected',
    'dragging',
  ],
  emits: ['click', 'dblclick', 'mouseenter', 'mousemove', 'mouseleave'],
  setup(props: MiniMapNodeProps, { attrs, emit }) {
    const miniMapSlots: Slots = inject(MiniMapSlots)!

    return () => {
      const style = (attrs.style ?? {}) as CSSProperties
      const slot = miniMapSlots[`node-${props.type}`]

      if (slot) return slot!(props)

      return h('rect', {
        id: props.id,
        class: ['vue-flow__minimap-node', attrs.class].join(' '),
        style,
        x: props.position.x,
        y: props.position.y,
        rx: props.borderRadius,
        ry: props.borderRadius,
        width: props.dimensions.width,
        height: props.dimensions.height,
        fill: props.color || (style.background as string) || style.backgroundColor,
        stroke: props.strokeColor,
        strokeWidth: props.strokeWidth,
        shapeRendering: props.shapeRendering,
        onClick: (e: MouseEvent) => emit('click', e),
        onDblClick: (e: MouseEvent) => emit('dblclick', e),
        onMouseenter: (e: MouseEvent) => emit('mouseenter', e),
        onMousemove: (e: MouseEvent) => emit('mousemove', e),
        onMouseleave: (e: MouseEvent) => emit('mouseleave', e),
      })
    }
  },
})
