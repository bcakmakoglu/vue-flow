<script lang="ts" setup>
import { HTMLAttributes } from 'vue'
import { BackgroundVariant } from '~/types'
import { Store } from '~/context'

export interface BackgroundProps extends HTMLAttributes {
  variant?: BackgroundVariant
  gap?: number
  color?: string
  size?: number
}

const props = withDefaults(defineProps<BackgroundProps>(), {
  variant: BackgroundVariant.Dots,
  gap: 10,
  size: 0.4,
})

const defaultColors: Record<BackgroundVariant, string> = {
  [BackgroundVariant.Dots]: '#81818a',
  [BackgroundVariant.Lines]: '#eee',
}

const store = inject(Store)!
// when there are multiple flows on a page we need to make sure that every background gets its own pattern.

const bgClasses = ['revue-flow__background']
const background = computed(() => {
  const scaledGap = props.gap && props.gap * store.transform[2]
  const xOffset = scaledGap && store.transform[0] % scaledGap
  const yOffset = scaledGap && store.transform[1] % scaledGap
  const size = props.size || 0.4 * store.transform[2]

  return {
    scaledGap,
    xOffset,
    yOffset,
    size,
  }
})

const isLines = props.variant === BackgroundVariant.Lines
const bgColor = props.color ? props.color : defaultColors[props.variant || BackgroundVariant.Dots]
const patternId = `pattern-${Math.floor(Math.random() * 100000)}`
</script>
<template>
  <svg
    :class="bgClasses"
    :style="{
      width: '100%',
      height: '100%',
    }"
  >
    <pattern
      :id="patternId"
      :x="background.xOffset"
      :y="background.yOffset"
      :width="background.scaledGap"
      :height="background.scaledGap"
      patternUnits="userSpaceOnUse"
    >
      <template v-if="isLines">
        <path
          :stroke="bgColor"
          :stroke-width="props.size"
          :d="`M${background.scaledGap / 2} 0 V${background.scaledGap} M0 ${background.scaledGap / 2} H${background.scaledGap}`"
        />
      </template>
      <template v-else>
        <circle :cx="background.size" :cy="background.size" :r="background.size" :fill="bgColor" />
      </template>
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" :fill="`url(#${patternId})`" />
    <slot></slot>
  </svg>
</template>
