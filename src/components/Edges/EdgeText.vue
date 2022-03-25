<script lang="ts" setup>
import type { EdgeTextProps } from '../../types/components'
import { Rect } from '../../types'

const props = withDefaults(defineProps<EdgeTextProps>(), {
  labelStyle: () => ({}),
  labelShowBg: true,
  labelBgStyle: () => ({}),
  labelBgPadding: () => [2, 4],
  labelBgBorderRadius: 2,
})

const edgeRef = templateRef<SVGTextElement>('edge-text', null)

const edgeRefBbox = ref<Rect>({ x: 0, y: 0, width: 0, height: 0 })

onMounted(() => {
  edgeRefBbox.value = edgeRef.value.getBBox()
})
const transform = computed(() => `translate(${props.x - edgeRefBbox.value.width / 2} ${props.y - edgeRefBbox.value.height / 2})`)
</script>
<script lang="ts">
export default {
  name: 'EdgeText',
}
</script>
<template>
  <g :transform="transform" :class="props.class" class="vue-flow__edge-textwrapper">
    <rect
      v-if="props.labelShowBg"
      class="vue-flow__edge-textbg"
      :width="edgeRefBbox.width + 2 * props.labelBgPadding[0] + 'px'"
      :height="edgeRefBbox.height + 2 * props.labelBgPadding[1] + 'px'"
      :x="-props.labelBgPadding[0]"
      :y="-props.labelBgPadding[1]"
      :style="props.labelBgStyle"
      :rx="props.labelBgBorderRadius"
      :ry="props.labelBgBorderRadius"
    />
    <text ref="edge-text" class="vue-flow__edge-text" :y="edgeRefBbox.height / 2" dy="0.3em" :style="props.labelStyle">
      <slot v-bind="props">
        <component
          :is="props.label?.component"
          v-if="typeof props.label !== 'string' && typeof props.label?.component !== 'undefined'"
          v-bind="props.label?.props"
        />
        <template v-else v-html="props.label">
          {{ props.label }}
        </template>
      </slot>
    </text>
  </g>
</template>
