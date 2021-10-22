<script lang="ts" setup>
import { SVGAttributes } from 'vue'
import { BackgroundVariant } from '~/types'
import { useStore } from '~/composables'

export interface BackgroundProps extends SVGAttributes {
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

const store = useStore()

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

// when there are multiple flows on a page we need to make sure that every background gets its own pattern.
const patternId = `pattern-${Math.floor(Math.random() * 100000)}`
const bgColor = computed(() => (props.color ? props.color : defaultColors[props.variant || BackgroundVariant.Dots]))
const d = computed(
  () =>
    `M${background.value.scaledGap / 2} 0 V${background.value.scaledGap} M0 ${background.value.scaledGap / 2} H${
      background.value.scaledGap
    }`,
)
</script>
<template>
  <svg class="vue-flow__background" style="width: 100%; height: 100%">
    <pattern
      :id="patternId"
      :x="background.xOffset"
      :y="background.yOffset"
      :width="background.scaledGap"
      :height="background.scaledGap"
      patternUnits="userSpaceOnUse"
    >
      <template v-if="props.variant === BackgroundVariant.Lines">
        <path :stroke="bgColor" :stroke-width="props.size" :d="d" />
      </template>
      <template v-else>
        <circle :cx="background.size" :cy="background.size" :r="background.size" :fill="bgColor" />
      </template>
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" :fill="`url(#${patternId})`" />
    <slot></slot>
  </svg>
</template>
