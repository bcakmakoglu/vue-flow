<script lang="ts" setup>
import type { MoveableEvents } from 'vue3-moveable'
import Moveable from 'vue3-moveable'
import type { Dimensions } from '@braks/vue-flow'

const props = defineProps<{
  id: string
  label: string
  dimensions: Dimensions
}>()

const el = ref()

const onScale = ({ scale, transform, target }: MoveableEvents['scale']) => {}

const onRotate = () => {}
</script>

<template>
  <div ref="el" class="vue-flow__node-default">
    {{ label }}
  </div>
  <Moveable :target="[`[data-id='${id}']`]" :scalable="true" :rotatable="true" @scale="onScale" @rotate="onRotate" />
</template>
