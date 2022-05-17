<script lang="ts" setup>
import type { MoveableEvents } from 'vue3-moveable'
import Moveable from 'vue3-moveable'
import type { Position } from '@braks/vue-flow'
import { Handle, useVueFlow } from '@braks/vue-flow'

const props = defineProps<{
  id: string
  label: string
  targetPosition: Position
  sourcePosition: Position
  nodeElement: HTMLDivElement
  data: any
}>()

const { viewport, updateNodeDimensions } = useVueFlow()

const el = ref()
const visible = ref(false)

const frame = ref({
  translate: [0, 0],
  rotate: 0,
})

const onResizeStart = (e: MoveableEvents['resizeStart']) => {
  e.setOrigin(['%', '%'])
  e.dragStart && e.dragStart.set(frame.value.translate)
}

const onResize = (e: MoveableEvents['resize']) => {
  const beforeTranslate = e.drag.beforeTranslate

  frame.value.translate = beforeTranslate
  e.target.style.width = `${e.width}px`
  e.target.style.height = `${e.height}px`

  let nextTranslation = String(e.target.style.transform)
  const translateX = `translateX(${beforeTranslate[0]}px)`
  const translateY = `translateY(${beforeTranslate[1]}px)`

  const hasTranslateX = nextTranslation.match(/translateX\((-?\d+\.\d+?(?:px))\)/)
  const hasTranslateY = nextTranslation.match(/translateY\((-?\d+\.\d+?(?:px))\)/)

  if (!nextTranslation) return (e.target.style.transform = `${translateX} ${translateY}`)

  if (hasTranslateX) {
    nextTranslation = nextTranslation.replace(hasTranslateX[0], translateX)
  } else {
    nextTranslation += ` ${translateX}`
  }

  if (hasTranslateY) {
    nextTranslation = nextTranslation.replace(hasTranslateY[0], translateY)
  } else {
    nextTranslation += ` ${translateY}`
  }

  e.target.style.transform = nextTranslation
}

const onRotateStart = (e: MoveableEvents['rotateStart']) => {
  e.set(frame.value.rotate)
}

const onRotate = (e: MoveableEvents['rotate']) => {
  frame.value.rotate = e.beforeRotate

  const rotation = ` rotate(${e.beforeRotate}deg)`

  if (!e.target.style.transform) {
    e.target.style.transform = rotation
  } else {
    const hasRotation = e.target.style.transform.match(/rotate\(\d+\.\d+?deg\)/)
    if (hasRotation) {
      e.target.style.transform = e.target.style.transform.replace(hasRotation[0], rotation)
    } else {
      e.target.style.transform += ` ${rotation}`
    }
  }
  updateNodeDimensions([{ id: props.id, nodeElement: props.nodeElement, forceUpdate: true }])
}

const onClick = () => {
  visible.value = true
}

onClickOutside(el, () => {
  visible.value = false
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div :data-moveable-id="props.id" :style="data.style" @click="onClick">
    <Handle type="target" :position="props.targetPosition" />
    <slot>
      {{ props.label }}
    </slot>
    <Handle type="source" :position="props.sourcePosition" />
  </div>
  <Moveable
    ref="el"
    class-name="nodrag"
    :style="visible ? '' : 'display: none !important'"
    :target="[`[data-moveable-id='${props.id}']`]"
    :resizable="true"
    :rotatable="true"
    :throttle-rotate="0"
    rotation-position="top"
    :padding="{ left: 0, top: 0, right: 0, bottom: 0 }"
    :origin="false"
    :edge="true"
    :throttle-resize="1"
    :render-directions="['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']"
    :zoom="1"
    @resize-start="onResizeStart"
    @resize="onResize"
    @rotate-start="onRotateStart"
    @rotate="onRotate"
  />
</template>
