<script lang="ts" setup>
import { CSSProperties, HTMLAttributes } from 'vue'

interface EdgeTextProps extends HTMLAttributes {
  x: number
  y: number
  label?:
    | string
    | {
        component: any
        props?: any
      }
  labelStyle?: CSSProperties
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
const { width, height, x, y } = useElementBounding(edgeRef)
const transform = computed(() => `translate(${props.x - width.value / 2 || 0} ${props.y - height.value / 2 || 0})`)
const bgPadding = computed(() => [props.labelBgPadding[0], props.labelBgPadding[1]])
</script>
<template>
  <g :transform="transform" class="vue-flow__edge-textwrapper">
    <rect
      v-if="props.labelShowBg"
      :width="width + 2 * bgPadding[0] + 'px'"
      :height="height + 2 * bgPadding[1] + 'px'"
      :x="-bgPadding[0]"
      :y="-bgPadding[1]"
      class="vue-flow__edge-textbg"
      :style="props.labelBgStyle"
      :rx="props.labelBgBorderRadius"
      :ry="props.labelBgBorderRadius"
    />
    <text ref="edge-text" class="vue-flow__edge-text" :y="height / 2" dy="0.3em" :style="props.labelStyle">
      <slot>
        <component
          :is="props.label?.component"
          v-if="typeof props.label !== 'string' && typeof props.label?.component !== 'undefined'"
          v-bind="{ ...props, ...props.label?.props, width, height, x, y }"
        />
        <template v-else v-html="props.label">
          {{ props.label }}
        </template>
      </slot>
    </text>
  </g>
</template>
