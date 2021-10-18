<script lang="ts" setup>
import { HTMLAttributes, ref, VNode, watchEffect } from 'vue'
import { Rect } from '~/types'

interface EdgeTextProps extends HTMLAttributes {
  x: number
  y: number
  label?: string | VNode
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
}

const props = withDefaults(defineProps<EdgeTextProps>(), {
  labelStyle: () => ({}),
  labelShowBg: true,
  labelBgStyle: () => ({}),
  labelBgPadding: () => [2, 4],
  labelBgBorderRadius: 2,
})

const edgeRef = templateRef<SVGTextElement>('edge-text', null)
const edgeTextBox = ref<Rect>({ x: 0, y: 0, width: 0, height: 0 })

watchEffect(() => {
  const textBbox = edgeRef.value?.getBBox()

  if (textBbox) {
    edgeTextBox.value = {
      x: textBbox.x,
      y: textBbox.y,
      width: textBbox.width,
      height: textBbox.height,
    }
  }
})
</script>
<template>
  <g
    :transform="`translate(${props.x - edgeTextBox.width / 2} ${props.y - edgeTextBox.height / 2})`"
    class="revue-flow__edge-textwrapper"
  >
    <rect
      v-if="props.labelShowBg"
      :width="edgeTextBox.width + 2 * props.labelBgPadding[0] + 'px'"
      :height="edgeTextBox.height + 2 * props.labelBgPadding[1] + 'px'"
      :x="-props.labelBgPadding[0]"
      :y="-props.labelBgPadding[1]"
      class="revue-flow__edge-textbg"
      :style="props.labelBgStyle"
      :rx="props.labelBgBorderRadius"
      :ry="props.labelBgBorderRadius"
    />
    <text ref="edge-text" class="revue-flow__edge-text" :y="edgeTextBox.height / 2" dy="0.3em" :style="props.labelStyle">
      {{ props.label }}
    </text>
    <slot></slot>
  </g>
</template>
