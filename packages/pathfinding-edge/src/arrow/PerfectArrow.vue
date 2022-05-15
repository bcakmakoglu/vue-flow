<script lang="ts" setup>
import type { EdgeTextProps, Position } from '@braks/vue-flow'
import { EdgeText, getEdgeCenter } from '@braks/vue-flow'
import type { CSSProperties, DefineComponent } from 'vue'
import type { ArrowOptions } from 'perfect-arrows'
import { getArrow } from 'perfect-arrows'

const props = withDefaults(
  defineProps<{
    id: string
    source: string
    target: string
    sourceX: number
    sourceY: number
    targetX: number
    targetY: number
    selected?: boolean
    animated?: boolean
    sourcePosition: Position
    targetPosition: Position
    label?:
      | string
      | {
          component: DefineComponent<EdgeTextProps>
          props?: EdgeTextProps
        }
    labelStyle?: any
    labelShowBg?: boolean
    labelBgStyle?: any
    labelBgPadding?: [number, number]
    labelBgBorderRadius?: number
    style?: CSSProperties
    markerEnd?: string
    markerStart?: string
    data?: any
    sourceHandleId?: string
    targetHandleId?: string
    options?: ArrowOptions
  }>(),
  {
    options: () => ({
      padStart: 3,
      padEnd: 3,
      stretch: 0.2,
    }),
  },
)

const centered = computed(() =>
  getEdgeCenter({
    ...props,
  }),
)

const arrow = computed(() => {
  return getArrow(props.sourceX, props.sourceY, props.targetX, props.targetY, {
    ...props.options,
  })
})

const attrs = useAttrs() as { style: CSSProperties }
</script>

<script lang="ts">
export default {
  name: 'PerfectArrow',
  inheritAttrs: false,
}
</script>

<template>
  <path
    :style="{ ...props.style, ...attrs.style }"
    class="vue-flow__edge-path vue-flow__perfect-arrow"
    :d="`M${arrow[0]},${arrow[1]} Q${arrow[2]},${arrow[3]} ${arrow[4]},${arrow[5]}`"
    :marker-end="props.markerEnd"
    :marker-start="props.markerStart"
  />
  <EdgeText
    v-if="props.label"
    :x="centered[0]"
    :y="centered[1]"
    :label="props.label"
    :label-style="props.labelStyle"
    :label-show-bg="props.labelShowBg"
    :label-bg-style="props.labelBgStyle"
    :label-bg-padding="props.labelBgPadding"
    :label-bg-border-radius="props.labelBgBorderRadius"
  />
</template>
