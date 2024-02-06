<script setup>
import { computed, ref, toRef, watch } from 'vue'
import { BaseEdge, getSmoothStepPath, useNodesData, useVueFlow } from '@vue-flow/core'
import { TransitionPresets, executeTransition } from '@vueuse/core'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String,
    required: true,
  },
  targetPosition: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: false,
  },
  markerEnd: {
    type: String,
    required: false,
  },
  style: {
    type: Object,
    required: false,
  },
  sourceHandleId: {
    type: String,
    required: false,
  },
  targetHandleId: {
    type: String,
    required: false,
  },
})

const { onNodeDrag } = useVueFlow()

const edgePoint = ref(0)

const sourceNodeData = useNodesData(() => props.source)

const isSourceNodeRunning = toRef(() => sourceNodeData.value?.isRunning)

const edgeColor = toRef(() => {
  if (sourceNodeData.value?.hasError) {
    return '#f87171'
  }

  if (sourceNodeData.value?.isFinished) {
    return '#10b981'
  }

  if (isSourceNodeRunning.value) {
    return '#6b7280'
  }

  if (sourceNodeData.value?.isSkipped) {
    return '#FFCC99'
  }

  return '#1a192b'
})

const edgeRef = ref()

const circlePosition = ref({ x: 0, y: 0 })

const currentLength = ref(0)

const path = computed(() => getSmoothStepPath(props))

watch(edgePoint, (point) => {
  const pathEl = edgeRef.value?.pathEl

  if (!pathEl || point === 0) {
    return
  }

  const currLength = pathEl.getTotalLength()

  if (currentLength.value !== currLength) {
    runAnimation(point)
    return
  }

  circlePosition.value = pathEl.getPointAtLength(point)
})

watch(isSourceNodeRunning, (isRunning, _, onCleanup) => {
  if (isRunning) {
    runAnimation()

    onCleanup(() => {
      edgePoint.value = 0
      currentLength.value = 0
      circlePosition.value = { x: 0, y: 0 }
    })
  }
})

function runAnimation(from = 0) {
  const pathEl = edgeRef.value?.pathEl

  if (!pathEl) {
    return
  }

  edgePoint.value = 0

  const totalLength = pathEl.getTotalLength()

  if (currentLength.value !== totalLength) {
    currentLength.value = totalLength
  }

  executeTransition(edgePoint, from, totalLength, {
    transition: TransitionPresets.easeInOutCubic,
  })
}
</script>

<script>
export default {
  name: 'AnimationEdge',
  inheritAttrs: false,
}
</script>

<template>
  <BaseEdge v-bind="$attrs" :id="id" ref="edgeRef" :path="path[0]" :marker-end="markerEnd" :style="{ stroke: edgeColor }" />

  <circle
    v-if="isSourceNodeRunning"
    r="4"
    cy="0"
    cx="0"
    :transform="`translate(${circlePosition.x}, ${circlePosition.y})`"
    style="fill: #f59e0b"
  />
</template>
