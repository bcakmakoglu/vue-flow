<script lang="ts" setup>
import { BackgroundVariant } from '../../types'
import { useVueFlow } from '../../composables'
import type { BackgroundProps } from '../../types/components'

const props = withDefaults(defineProps<BackgroundProps>(), {
  variant: 'dots' as BackgroundVariant,
  gap: 10,
  size: 0.4,
  height: 100,
  width: 100,
  x: 0,
  y: 0,
})

const defaultColors: Record<BackgroundVariant, string> = {
  [BackgroundVariant.Dots]: '#81818a',
  [BackgroundVariant.Lines]: '#eee',
}

const { store } = useVueFlow()

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
const patternColor = computed(() =>
  props.patternColor ? props.patternColor : defaultColors[props.variant || BackgroundVariant.Dots],
)
const d = computed(
  () =>
    `M${background.value.scaledGap / 2} 0 V${background.value.scaledGap} M0 ${background.value.scaledGap / 2} H${
      background.value.scaledGap
    }`,
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
      height: `${props.height > 100 ? 100 : props.height}%`,
      width: `${props.width > 100 ? 100 : props.width}%`,
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
      <template v-if="props.variant === BackgroundVariant.Lines">
        <path :stroke="patternColor" :stroke-width="props.size" :d="d" />
      </template>
      <template v-else-if="props.variant === BackgroundVariant.Dots">
        <circle :cx="background.size" :cy="background.size" :r="background.size" :fill="patternColor" />
      </template>
      <svg v-if="props.bgColor" height="100" width="100">
        <rect width="100%" height="100%" :fill="props.bgColor" />
      </svg>
    </pattern>
    <rect :x="props.x" :y="props.y" width="100%" height="100%" :fill="`url(#${patternId})`" />
    <slot></slot>
  </svg>
</template>
