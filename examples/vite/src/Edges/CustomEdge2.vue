<script lang="ts" setup>
import type { EdgeProps, Position } from '@vue-flow/core'
import { EdgeText, getBezierPath, getMarkerId } from '@vue-flow/core'

interface CustomData {
  text: string
}

interface CustomEdgeProps<T = CustomData> extends EdgeProps<T> {
  source: string
  target: string
  sourceHandleId?: string
  targetHandleId?: string
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  markerEnd?: string
  data: T
}

const props = defineProps<CustomEdgeProps>()

const path = $computed(() => getBezierPath(props))
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <path :id="id" class="vue-flow__edge-path" :d="path[0]" :marker-end="markerEnd" />

  <EdgeText
    :x="path[1]"
    :y="path[2]"
    :label="data.text"
    :label-style="{ fill: 'white' }"
    :label-show-bg="true"
    :label-bg-style="{ fill: 'red' }"
    :label-bg-padding="[2, 4]"
    :label-bg-border-radius="2"
  />
</template>
