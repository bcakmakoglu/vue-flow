<script lang="ts" setup>
import { ref, useAttrs } from 'vue'
import type { BaseEdgeProps } from '../../types'
import { isNumber } from '../../utils'
import EdgeText from './EdgeText.vue'

const { interactionWidth = 20, labelShowBg = true, ...props } = defineProps<BaseEdgeProps>()

const pathEl = ref<SVGPathElement | null>(null)

const interactionEl = ref<SVGPathElement | null>(null)

const labelEl = ref<SVGGElement | null>(null)

const attrs: any = useAttrs()

defineExpose({
  pathEl,
  interactionEl,
  labelEl,
})
</script>

<script lang="ts">
export default {
  name: 'BaseEdge',
  inheritAttrs: false,
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <path
    :id="id"
    ref="pathEl"
    :d="path"
    :style="props.style"
    class="vue-flow__edge-path"
    :class="attrs.class"
    :marker-end="markerEnd"
    :marker-start="markerStart"
  />

  <path
    v-if="interactionWidth"
    ref="interactionEl"
    fill="none"
    :d="path"
    :stroke-width="interactionWidth"
    :stroke-opacity="0"
    class="vue-flow__edge-interaction"
  />

  <EdgeText
    v-if="label && isNumber(labelX) && isNumber(labelY)"
    ref="labelEl"
    :x="labelX"
    :y="labelY"
    :label="label"
    :label-show-bg="labelShowBg"
    :label-bg-style="labelBgStyle"
    :label-bg-padding="labelBgPadding"
    :label-bg-border-radius="labelBgBorderRadius"
    :label-style="labelStyle"
  />
</template>
