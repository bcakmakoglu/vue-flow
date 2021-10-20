<script lang="ts" setup>
import { HTMLAttributes, VNode } from 'vue'

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
// @ts-ignore
const { width = 0, height = 0, x = 0, y = 0 } = useElementBounding(edgeRef)
</script>
<template>
  <g :transform="`translate(${props.x - width / 2} ${props.y - height / 2})`" class="revue-flow__edge-textwrapper">
    <rect
      v-if="props.labelShowBg"
      :width="width + 2 * props.labelBgPadding[0] + 'px'"
      :height="height + 2 * props.labelBgPadding[1] + 'px'"
      :x="-props.labelBgPadding[0]"
      :y="-props.labelBgPadding[1]"
      class="revue-flow__edge-textbg"
      :style="props.labelBgStyle"
      :rx="props.labelBgBorderRadius"
      :ry="props.labelBgBorderRadius"
    />
    <text ref="edge-text" class="revue-flow__edge-text" :y="height / 2" dy="0.3em" :style="props.labelStyle">
      <component :is="props.label" v-if="typeof props.label !== 'string'" />
      <template v-else>
        {{ props.label }}
      </template>
    </text>
    <slot></slot>
  </g>
</template>
