<script lang="ts" setup>
import { HTMLAttributes } from 'vue'
import { Position } from '~/types'

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
})
</script>
<template>
  <circle
    class="vue-flow__edgeupdater"
    :cx="shiftX(props.centerX, props.radius, props.position)"
    :cy="shiftY(props.centerY, props.radius, props.position)"
    :r="props.radius"
    stroke="transparent"
    fill="transparent"
  />
</template>
