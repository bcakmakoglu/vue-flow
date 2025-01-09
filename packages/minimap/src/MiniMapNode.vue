<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { inject, toRef, useAttrs } from 'vue'
import type { MiniMapNodeEmits, MiniMapNodeProps } from './types'
import { Slots } from './types'

const props = defineProps<MiniMapNodeProps>()

const emits = defineEmits<MiniMapNodeEmits>()

const miniMapSlots = inject(Slots)!

const attrs = useAttrs()

const style = toRef(() => (attrs.style ?? {}) as CSSProperties)

function onClick(event: MouseEvent) {
  emits('click', event)
}

function onDblclick(event: MouseEvent) {
  emits('dblclick', event)
}

function onMouseEnter(event: MouseEvent) {
  emits('mouseenter', event)
}

function onMouseMove(event: MouseEvent) {
  emits('mousemove', event)
}

function onMouseLeave(event: MouseEvent) {
  emits('mouseleave', event)
}
</script>

<script lang="ts">
export default {
  name: 'MiniMapNode',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <template v-if="!hidden && dimensions.width !== 0 && dimensions.height !== 0">
    <component :is="miniMapSlots[`node-${props.type}`]" v-if="miniMapSlots[`node-${props.type}`]" v-bind="props" />

    <rect
      v-else
      :id="id"
      class="vue-flow__minimap-node"
      :class="{ selected, dragging }"
      :x="position.x"
      :y="position.y"
      :rx="borderRadius"
      :ry="borderRadius"
      :width="dimensions.width"
      :height="dimensions.height"
      :fill="color || (style.background as string) || style.backgroundColor"
      :stroke="strokeColor"
      :stroke-width="strokeWidth"
      :shape-rendering="shapeRendering"
      @click="onClick"
      @dblclick="onDblclick"
      @mouseenter="onMouseEnter"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    />
  </template>
</template>
