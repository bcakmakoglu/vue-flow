<script lang="ts" setup>
import { computed } from 'vue'
import { useVueFlow } from '../../composables/useVueFlow'
import type { BackgroundProps } from './types'
import { DefaultBgColors, DotPattern, LinePattern } from './patterns'

const props = withDefaults(defineProps<BackgroundProps>(), {
  variant: 'dots',
  gap: 20,
  size: 1,
  lineWidth: 1,
  x: 0,
  y: 0,
  offset: 2,
})

const { id: vueFlowId, viewport } = useVueFlow()

const background = computed(() => {
  const [gapX, gapY] = Array.isArray(props.gap) ? props.gap : [props.gap, props.gap]

  const scaledGap: [number, number] = [gapX * viewport.value.zoom || 1, gapY * viewport.value.zoom || 1]

  const scaledSize = props.size * viewport.value.zoom

  const patternOffset =
    props.variant === 'dots'
      ? [scaledSize / props.offset, scaledSize / props.offset]
      : [scaledGap[0] / props.offset, scaledGap[1] / props.offset]

  return {
    scaledGap,
    offset: patternOffset,
    size: scaledSize,
  }
})

// when there are multiple flows on a page we need to make sure that every background gets its own pattern.
const patternId = computed(() => `pattern-${vueFlowId}${props.id ? `-${props.id}` : ''}`)

const patternColor = computed(() => props.color || DefaultBgColors[props.variant || 'dots'])
</script>

<script lang="ts">
export default {
  name: 'Background',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <svg class="vue-flow__background vue-flow__container">
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
          <template v-if="variant === 'lines'">
            <LinePattern :size="lineWidth" :color="patternColor" :dimensions="background.scaledGap" />
          </template>

          <template v-else-if="variant === 'dots'">
            <DotPattern :color="patternColor" :radius="background.size / offset" />
          </template>
        </slot>
      </pattern>
    </slot>

    <rect :x="x" :y="y" width="100%" height="100%" :fill="`url(#${patternId})`" />

    <slot :id="patternId" />
  </svg>
</template>
