import { computed, defineComponent, h } from 'vue-demi'

import { transformForCompatibleAttrs } from '../utils'

interface DotPatternProps {
  radius: number
  color: string
}

const DotPattern = defineComponent({
  name: 'DotPattern',
  compatConfig: { MODE: 2 },
  props: {
    radius: {
      type: Number,
      default: () => 1,
      required: true,
    },
    color: {
      type: String,
      default: () => '#000',
      required: true,
    },
  },
  setup(props: DotPatternProps) {
    const radius = computed(() => props.radius)

    const color = computed(() => props.color)

    return () =>
      h(
        'circle',
        transformForCompatibleAttrs({
          cx: radius.value,
          cy: radius.value,
          r: radius.value,
          fill: color.value,
        }),
      )
  },
})

export default DotPattern
