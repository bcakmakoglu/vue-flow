<script lang="ts" setup>
import { useVueFlow } from '@vue-flow/core'
import { BackgroundVariant } from './types'
import type { BackgroundProps } from './types'
import { DotPattern, LinePattern } from './patterns'

const {
  id,
  variant = 'dots' as BackgroundVariant,
  gap = 10,
  size = 1,
  lineWidth = 1,
  height = 100,
  width = 100,
  x = 0,
  y = 0,
  bgColor,
  patternColor: initialPatternColor,
  offset = 2,
} = defineProps<BackgroundProps>()

const defaultColors: Record<BackgroundVariant, string> = {
  [BackgroundVariant.Dots]: '#81818a',
  [BackgroundVariant.Lines]: '#eee',
}

const { id: vueFlowId, viewport } = useVueFlow()

const gapXY = computed(() => (Array.isArray(gap) ? gap : [gap, gap]))

const background = computed(() => {
  const scaledGap: [number, number] = [gapXY.value[0] * viewport.value.zoom || 1, gapXY.value[1] * viewport.value.zoom || 1]

  const scaledSize = size * viewport.value.zoom

  const patternOffset =
    variant === BackgroundVariant.Dots
      ? [scaledSize / offset, scaledSize / offset]
      : [scaledGap[0] / offset, scaledGap[1] / offset]

  return {
    scaledGap,
    offset: patternOffset,
    size: scaledSize,
  }
})

// when there are multiple flows on a page we need to make sure that every background gets its own pattern.
const patternId = computed(() => `pattern-${vueFlowId}${id ? `-${id}` : ''}`)

const patternColor = computed(() => initialPatternColor || defaultColors[variant || BackgroundVariant.Dots])
</script>

<script lang="ts">
export default {
  name: 'Background',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <svg
    class="vue-flow__background vue-flow__container"
    :style="{
      height: `${height > 100 ? 100 : height}%`,
      width: `${width > 100 ? 100 : width}%`,
    }"
  >
    <slot :id="patternId" name="pattern-container">
      <pattern
        :id="patternId"
        :x="viewport.x % background.scaledGap[0]"
        :y="viewport.y % background.scaledGap[1]"
        :width="background.scaledGap[0]"
        :height="background.scaledGap[1]"
        :patternTransform="`translate(-${background.offset[0]},-${background.offset[1]})`"
        patternUnits="userSpaceOnUse"
      >
        <slot name="pattern">
          <template v-if="variant === BackgroundVariant.Lines">
            <LinePattern :size="lineWidth" :color="patternColor" :dimensions="background.scaledGap" />
          </template>

          <template v-else-if="variant === BackgroundVariant.Dots">
            <DotPattern :color="patternColor" :radius="background.size / offset" />
          </template>

          <svg v-if="bgColor" height="100" width="100">
            <rect width="100%" height="100%" :fill="bgColor" />
          </svg>
        </slot>
      </pattern>
    </slot>

    <rect :x="x" :y="y" width="100%" height="100%" :fill="`url(#${patternId})`" />

    <slot :id="patternId" />
  </svg>
</template>
