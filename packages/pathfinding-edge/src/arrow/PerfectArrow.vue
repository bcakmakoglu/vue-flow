<script lang="ts" setup>
import { EdgeText, getSimpleBezierPath } from '@vue-flow/core'
import type { CSSProperties } from 'vue'
import { getArrow } from 'perfect-arrows'
import { computed, useAttrs } from 'vue'
import type { PerfectArrowProps } from '../types'

const props = withDefaults(defineProps<PerfectArrowProps>(), {
  options: () => ({
    padStart: 3,
    padEnd: 3,
    stretch: 0.2,
  }),
})

const centered = computed(() =>
  getSimpleBezierPath({
    ...props,
  }),
)

const arrow = computed(() => {
  return getArrow(props.sourceX, props.sourceY, props.targetX, props.targetY, {
    ...props.options,
  })
})

const attrs = useAttrs() as { style: CSSProperties }
</script>

<script lang="ts">
export default {
  name: 'PerfectArrow',
  compatConfig: { MODE: 3 },
  inheritAttrs: false,
}
</script>

<template>
  <path
    :style="{ ...style, ...attrs.style }"
    class="vue-flow__edge-path vue-flow__perfect-arrow"
    :d="`M${arrow[0]},${arrow[1]} Q${arrow[2]},${arrow[3]} ${arrow[4]},${arrow[5]}`"
    :marker-end="markerEnd"
    :marker-start="markerStart"
  />
  <EdgeText
    v-if="label"
    :x="centered[1]"
    :y="centered[2]"
    :label="label"
    :label-style="labelStyle"
    :label-show-bg="labelShowBg"
    :label-bg-style="labelBgStyle"
    :label-bg-padding="labelBgPadding"
    :label-bg-border-radius="labelBgBorderRadius"
  />
</template>
