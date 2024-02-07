<script setup>
import { computed, nextTick, ref, toRef, watch } from 'vue'
import { BaseEdge, EdgeLabelRenderer, Position, getSmoothStepPath, useNodesData } from '@vue-flow/core'
import { TransitionPresets, executeTransition } from '@vueuse/core'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  target: {
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
    default: Position.Right,
  },
  targetPosition: {
    type: String,
    default: Position.Left,
  },
})

const nodesData = useNodesData([props.target, props.source])

const edgePoint = ref(0)

const edgeRef = ref()

const labelPosition = ref({ x: 0, y: 0 })

const currentLength = ref(0)

const targetNodeData = toRef(() => nodesData.value[0])

const sourceNodeData = toRef(() => nodesData.value[1])

const isFinished = toRef(() => sourceNodeData.value.isFinished)

const isAnimating = ref(false)

const edgeColor = toRef(() => {
  if (targetNodeData.value.hasError) {
    return '#f87171'
  }

  if (targetNodeData.value.isFinished) {
    return '#10b981'
  }

  if (targetNodeData.value.isCancelled || targetNodeData.value.isSkipped) {
    return '#fbbf24'
  }

  if (targetNodeData.value.isRunning) {
    return '#2563eb'
  }

  return '#6b7280'
})

const path = computed(() => getSmoothStepPath(props))

watch(edgePoint, (point) => {
  const pathEl = edgeRef.value?.pathEl

  if (!pathEl || point === 0) {
    return
  }

  const currLength = pathEl.getTotalLength()

  if (currentLength.value !== currLength) {
    return runAnimation()
  }

  labelPosition.value = pathEl.getPointAtLength(point)
})

watch(isFinished, async (isFinished) => {
  if (isFinished) {
    await runAnimation()

    nextTick(() => {
      edgePoint.value = 0
      currentLength.value = 0
      labelPosition.value = { x: 0, y: 0 }
    })
  }
})

async function runAnimation() {
  const pathEl = edgeRef.value?.pathEl

  if (!pathEl) {
    return
  }

  nextTick(() => {
    isAnimating.value = true
  })

  const totalLength = pathEl.getTotalLength()

  const from = edgePoint.value || 0

  if (currentLength.value !== totalLength) {
    currentLength.value = totalLength
  }

  await executeTransition(edgePoint, from, totalLength, {
    transition: TransitionPresets.easeInOutCubic,
  })

  isAnimating.value = false
}
</script>

<script>
export default {
  name: 'AnimationEdge',
  inheritAttrs: false,
}
</script>

<template>
  <BaseEdge v-bind="$attrs" :id="id" ref="edgeRef" :path="path[0]" :style="{ stroke: edgeColor }" />

  <EdgeLabelRenderer v-if="isAnimating">
    <div
      :style="{
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${labelPosition.x}px,${labelPosition.y}px)`,
        pointerEvents: 'all',
      }"
      class="nodrag nopan"
    >
      📦
    </div>
  </EdgeLabelRenderer>
</template>
