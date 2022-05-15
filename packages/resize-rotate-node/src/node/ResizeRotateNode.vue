<script lang="ts" setup>
import type { MoveableEvents } from 'vue3-moveable'
import Moveable from 'vue3-moveable'

const props = defineProps<{
  id: string
  label: string
}>()

const el = ref()
const initialDimensions = ref()
const translateX = ref(0)
const translateY = ref(0)

const isRight = (i: number[]) => i[0] === 1
const isLeft = (i: number[]) => i[0] === -1
const isBottom = (i: number[]) => i[1] === 1
const isTop = (i: number[]) => i[1] === -1

onMounted(() => {
  nextTick(() => {
    initialDimensions.value = el.value.getBoundingClientRect()
  })
})

const onResize = ({ direction, width, height, target }: MoveableEvents['resize']) => {
  if (isLeft(direction)) {
    translateX.value = initialDimensions.value.width - width
  }
  if (isTop(direction)) {
    translateY.value = initialDimensions.value.height - height
  }

  if (isRight(direction) || isLeft(direction)) target.style.width = `${width}px`
  if (isBottom(direction) || isTop(direction)) target.style.height = `${height}px`
}

const onRotate = (e: MoveableEvents['rotate']) => {
  console.log('rotate')
}
</script>

<template>
  <div
    ref="el"
    :data-moveable-id="props.id"
    :style="{
      transform: `translateX(${translateX || 0}px) translateY(${translateY || 0}px)`,
      background: 'rgb(255, 0, 114) none repeat scroll 0% 0%',
      padding: '20px',
      borderRadius: '20px',
    }"
  >
    <slot>
      {{ label }}
    </slot>
  </div>
  <Moveable
    class-name="nodrag"
    :target="[`[data-moveable-id='${id}']`]"
    :resizable="true"
    :keep-ratio="true"
    :rotatable="true"
    :throttle-resize="1"
    :render-directions="['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']"
    :zoom="1"
    @resize="onResize"
    @rotate="onRotate"
  />
</template>
