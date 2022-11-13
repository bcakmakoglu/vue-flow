<script lang="ts" setup>
import { isString } from '@vueuse/core'
import type { EdgeTextProps } from '../../types/components'
import type { Rect as RectType } from '../../types'

const {
  x,
  y,
  label,
  labelStyle = {},
  labelShowBg = true,
  labelBgStyle = {},
  labelBgPadding = [2, 4],
  labelBgBorderRadius = 2,
} = defineProps<EdgeTextProps>()

let box = $ref<RectType>({ x: 0, y: 0, width: 0, height: 0 })

const el = $ref<SVGTextElement | null>(null)

const getBox = () => {
  if (!el) return

  const nextBox = el.getBBox()

  if (nextBox.width !== box.width || nextBox.height !== box.height) {
    box = nextBox
  }
}

onMounted(getBox)

watch([() => x, () => y, $$(el), () => label], getBox)

const transform = computed(() => `translate(${x - box.width / 2} ${y - box.height / 2})`)
</script>

<script lang="ts">
export default {
  name: 'EdgeText',
}
</script>

<template>
  <g :transform="transform" class="vue-flow__edge-textwrapper">
    <rect
      v-if="labelShowBg"
      class="vue-flow__edge-textbg"
      :width="`${box.width + 2 * labelBgPadding[0]}px`"
      :height="`${box.height + 2 * labelBgPadding[1]}px`"
      :x="-labelBgPadding[0]"
      :y="-labelBgPadding[1]"
      :style="labelBgStyle"
      :rx="labelBgBorderRadius"
      :ry="labelBgBorderRadius"
    />

    <text v-bind="$attrs" ref="el" class="vue-flow__edge-text" :y="box.height / 2" dy="0.3em" :style="labelStyle">
      <slot>
        <component :is="label" v-if="!isString(label)" />
        <template v-else> {{ label }} </template>
      </slot>
    </text>
  </g>
</template>
