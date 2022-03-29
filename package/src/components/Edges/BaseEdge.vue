<script lang="ts" setup>
import { CSSProperties } from 'vue'
import EdgeText from './EdgeText.vue'

interface Props {
  centerX: number
  centerY: number
  path: string
  label?:
    | string
    | {
        props?: any
        component: any
      }
  style?: CSSProperties
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  markerStart?: string
  markerEnd?: string
}
const props = defineProps<Props>()
</script>
<template>
  <path
    :style="props.style"
    :d="props.path"
    class="vue-flow__edge-path"
    :marker-end="props.markerEnd"
    :marker-start="props.markerStart"
  />
  <EdgeText
    v-if="props.label"
    :x="props.centerX"
    :y="props.centerY"
    :label="props.label"
    :label-style="props.labelStyle"
    :label-show-bg="props.labelShowBg"
    :label-bg-style="props.labelBgStyle"
    :label-bg-padding="props.labelBgPadding"
    :label-bg-border-radius="props.labelBgBorderRadius"
  />
</template>
