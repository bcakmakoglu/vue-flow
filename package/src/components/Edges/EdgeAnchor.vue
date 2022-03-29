<script lang="ts" setup>
import { HTMLAttributes } from 'vue'
import { Position } from '../../types'

const shiftX = (x: number, shift: number, position: Position): number => {
  if (position === Position.Left) return x - shift
  if (position === Position.Right) return x + shift
  return x
}

const shiftY = (y: number, shift: number, position: Position): number => {
  if (position === Position.Top) return y - shift
  if (position === Position.Bottom) return y + shift
  return y
}

interface EdgeAnchorProps extends HTMLAttributes {
  position: Position
  centerX: number
  centerY: number
  radius?: number
}

const props = withDefaults(defineProps<EdgeAnchorProps>(), {
  radius: 10,
  centerX: 0,
  centerY: 0,
  position: Position.Top,
})

const cx = computed(() => {
  const val = shiftX(props.centerX, props.radius, props.position)
  if (isNaN(val)) return 0
  else return val
})
const cy = computed(() => {
  const val = shiftY(props.centerY, props.radius, props.position)
  if (isNaN(val)) return 0
  else return val
})
</script>
<script lang="ts">
export default {
  name: 'EdgeAnchor',
}
</script>
<template>
  <circle class="vue-flow__edgeupdater" :cx="cx" :cy="cy" :r="props.radius" stroke="transparent" fill="transparent" />
</template>
