import { type PropType, computed, defineComponent, h } from 'vue-demi'

import { transformForCompatibleAttrs } from '../utils'

interface LinePatternProps {
  dimensions: [number, number]
  size?: number
  color: string
}

const LinePattern = defineComponent({
  name: 'LinePattern',
  compatConfig: { MODE: 2 },
  props: {
    color: {
      type: String,
      required: true,
    },
    dimensions: {
      type: Object as PropType<[number, number]>,
      required: true,
    },
    size: {
      type: Number,
      default: () => 1,
      required: false,
    },
  },
  setup(props: LinePatternProps) {
    const color = computed(() => props.color)

    const dimensions = computed(() => props.dimensions)

    const size = computed(() => props.size)

    return () =>
      h(
        'path',
        transformForCompatibleAttrs({
          'stroke': color.value,
          'stroke-width': size.value ? size.value : 1,
          'd': `M${dimensions.value[0] / 2} 0 V${dimensions.value[1]} M0 ${dimensions.value[1] / 2} H${dimensions.value[0]}`,
        }),
      )
  },
})

export default LinePattern
