<script lang="ts" setup>
import { HTMLAttributes } from 'vue'
import { BackgroundVariant, RevueFlowStore } from '~/types'

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

const store = inject<RevueFlowStore>('store')!
const transform = computed(() => store.transform)
// when there are multiple flows on a page we need to make sure that every background gets its own pattern.
const patternId = `pattern-${Math.floor(Math.random() * 100000)}`

const bgClasses = ['revue-flow__background']
const scaledGap = computed(() => props.gap && props.gap * transform.value[2])
const xOffset = computed(() => scaledGap.value && transform.value[0] % scaledGap.value)
const yOffset = computed(() => scaledGap.value && transform.value[1] % scaledGap.value)

const isLines = computed(() => props.variant === BackgroundVariant.Lines)
const bgColor = computed(() => (props.color ? props.color : defaultColors[props.variant || BackgroundVariant.Dots]))
const size = computed(() => props.size || 0.4 * transform.value[2])
</script>
<template>
  <svg
    :class="bgClasses"
    :style="{
      width: '100%',
      height: '100%',
    }"
  >
    <pattern :id="patternId" :x="xOffset" :y="yOffset" :width="scaledGap" :height="scaledGap" patternUnits="userSpaceOnUse">
      <template v-if="isLines">
        <path
          :stroke="bgColor"
          :stroke-width="props.size"
          :d="`M${scaledGap / 2} 0 V${scaledGap} M0 ${scaledGap / 2} H${scaledGap}`"
        />
      </template>
      <template v-else>
        <circle :cx="size" :cy="size" :r="size" :fill="bgColor" />
      </template>
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" :fill="`url(#${patternId})`" />
  </svg>
</template>
