<script setup lang="ts">
import type { EdgeProps, Node } from '@vue-flow/core'
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, useNodesData } from '@vue-flow/core'
import type { ProcessNodeData } from './types'

const props = defineProps<EdgeProps>()

const labelRef = ref<HTMLDivElement>()

const sourceNodeData = useNodesData<Node<ProcessNodeData>>(() => props.source)

const isFinished = toRef(() => sourceNodeData.value?.data.isFinished)

const isAnimating = ref(false)

const edgeColor = toRef(() => {
  if (sourceNodeData.value?.data.hasError) {
    return '#f87171'
  }

  if (sourceNodeData.value?.data.isFinished) {
    return '#10b981'
  }

  if (sourceNodeData.value?.data.isCancelled) {
    return '#fbbf24'
  }

  if (sourceNodeData.value?.data.isSkipped) {
    return '#f59e0b'
  }

  return '#6b7280'
})

const path = computed(() => getSmoothStepPath(props))

watch(
  isFinished,
  (isFinished) => {
    if (isFinished) {
      runAnimation()
    }
  },
  { immediate: true },
)

function runAnimation() {
  isAnimating.value = true

  // defer to next tick so the labelRef is available
  nextTick(() => {
    const keyframes = [{ offsetDistance: '0%' }, { offsetDistance: '100%' }]

    const animation = labelRef.value?.animate(keyframes, {
      duration: 1500,
      direction: 'normal',
      iterations: 1,
    })

    if (animation) {
      animation.onfinish = () => {
        isAnimating.value = false
      }
    }
  })
}
</script>

<script lang="ts">
export default {
  name: 'AnimationEdge',
  inheritAttrs: false,
}
</script>

<template>
  <BaseEdge v-bind="$attrs" :id="id" :path="path[0]" :marker-end="markerEnd" :style="{ stroke: edgeColor }" />

  <EdgeLabelRenderer v-if="isAnimating">
    <div
      ref="labelRef"
      :style="{
        position: 'absolute',
        offsetPath: `path('${path[0]}')`,
        offsetRotate: '0deg',
        offsetAnchor: 'center',
      }"
    >
      📦
    </div>
  </EdgeLabelRenderer>
</template>
