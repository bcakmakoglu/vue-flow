<script lang="ts" setup>
import type { EdgeTextProps } from '../../types/components'
import { useVueFlow } from '../../composables'

const props = withDefaults(defineProps<EdgeTextProps>(), {
  labelStyle: () => ({}),
  labelShowBg: true,
  labelBgStyle: () => ({}),
  labelBgPadding: () => [2, 4],
  labelBgBorderRadius: 2,
})

const { transform: paneTransform } = useVueFlow()
const edgeRef = templateRef<SVGTextElement>('edge-text', null)
const { width, height } = useElementBounding(edgeRef)
const transform = computed(() => `translate(${props.x - width.value / paneTransform.value[2] / 2} ${props.y - height.value / 2})`)
</script>
<script lang="ts">
export default {
  name: 'EdgeText',
}
</script>
<template>
  <g :transform="transform" class="vue-flow__edge-textwrapper">
    <rect
      v-if="props.labelShowBg"
      class="vue-flow__edge-textbg"
      :width="width / paneTransform[2] + 2 * props.labelBgPadding[0] + 'px'"
      :height="height + 2 * props.labelBgPadding[1] + 'px'"
      :x="-props.labelBgPadding[0]"
      :y="-props.labelBgPadding[1]"
      :style="props.labelBgStyle"
      :rx="props.labelBgBorderRadius"
      :ry="props.labelBgBorderRadius"
    />
    <text ref="edge-text" class="vue-flow__edge-text" :y="height / 2" dy="0.3em" :style="props.labelStyle">
      <slot v-bind="props">
        <component
          :is="props.label?.component"
          v-if="typeof props.label !== 'string' && typeof props.label?.component !== 'undefined'"
          v-bind="{ ...props, ...props.label?.props, width, height }"
        />
        <template v-else v-html="props.label">
          {{ props.label }}
        </template>
      </slot>
    </text>
  </g>
</template>
