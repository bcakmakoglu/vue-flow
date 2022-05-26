<script lang="ts" setup>
import type { EdgeTextProps } from '../../types/components'
import type { Rect } from '../../types'

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

const edgeRef = templateRef<SVGTextElement>('el', null)

const { width, height } = $(useElementBounding(edgeRef))

const transform = computed(() => `translate(${x - width / 2} ${y - height / 2})`)
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
      :width="`${width + 2 * labelBgPadding[0]}px`"
      :height="`${height + 2 * labelBgPadding[1]}px`"
      :x="-labelBgPadding[0]"
      :y="-labelBgPadding[1]"
      :style="labelBgStyle"
      :rx="labelBgBorderRadius"
      :ry="labelBgBorderRadius"
    />
    <text v-bind="$attrs" ref="el" class="vue-flow__edge-text" :y="height / 2" dy="0.3em" :style="labelStyle">
      <slot>
        <component :is="label" v-if="typeof label !== 'string' && typeof label" />
        <template v-else v-html="label">
          {{ label }}
        </template>
      </slot>
    </text>
  </g>
</template>
