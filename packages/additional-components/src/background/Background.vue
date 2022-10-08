<script lang="ts" setup>
import { useVueFlow } from '@vue-flow/core'
import { BackgroundVariant } from './types'
import type { BackgroundProps } from './types'

const {
  variant = 'dots' as BackgroundVariant,
  gap = 10,
  size = 0.4,
  height = 100,
  width = 100,
  x = 0,
  y = 0,
  bgColor,
  patternColor: initialPatternColor,
} = defineProps<BackgroundProps>()

const defaultColors: Record<BackgroundVariant, string> = {
  [BackgroundVariant.Dots]: '#81818a',
  [BackgroundVariant.Lines]: '#eee',
}

const { viewport } = useVueFlow()

const background = $computed(() => {
  const scaledGap = gap && gap * viewport.value.zoom
  const xOffset = scaledGap && viewport.value.x % scaledGap
  const yOffset = scaledGap && viewport.value.y % scaledGap
  const bgSize = size * viewport.value.zoom

  return {
    scaledGap,
    xOffset,
    yOffset,
    size: bgSize,
  }
})

// when there are multiple flows on a page we need to make sure that every background gets its own pattern.
const patternId = `pattern-${Math.floor(Math.random() * 100000)}`

const patternColor = computed(() => initialPatternColor || defaultColors[variant || BackgroundVariant.Dots])

const d = computed(
  () => `M${background.scaledGap / 2} 0 V${background.scaledGap} M0 ${background.scaledGap / 2} H${background.scaledGap}`,
)
</script>

<script lang="ts">
export default {
  name: 'Background',
}
</script>

<template>
  <svg
    class="vue-flow__background"
    :style="{
      height: `${height > 100 ? 100 : height}%`,
      width: `${width > 100 ? 100 : width}%`,
    }"
  >
    <slot :id="patternId" name="pattern-container">
      <pattern
        :id="patternId"
        :x="background.xOffset"
        :y="background.yOffset"
        :width="background.scaledGap"
        :height="background.scaledGap"
        patternUnits="userSpaceOnUse"
      >
        <slot name="pattern">
          <template v-if="variant === BackgroundVariant.Lines">
            <path :stroke="patternColor" :stroke-width="size" :d="d" />
          </template>
          <template v-else-if="variant === BackgroundVariant.Dots">
            <circle :cx="background.size" :cy="background.size" :r="background.size" :fill="patternColor" />
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
