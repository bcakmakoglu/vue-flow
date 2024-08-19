<script setup>
import { computed, ref, toRef, watch } from 'vue'
import { BaseEdge, EdgeLabelRenderer, Position, getSmoothStepPath, useNodesData, useVueFlow } from '@vue-flow/core'

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

const { updateEdgeData } = useVueFlow()

const nodesData = useNodesData([props.target, props.source])

const labelRef = ref()

const edgeRef = ref()

const targetNodeData = computed(() => nodesData.value[0].data)

const sourceNodeData = computed(() => nodesData.value[1].data)

const isFinished = toRef(() => sourceNodeData.value.isFinished)

const isCancelled = toRef(() => targetNodeData.value.isCancelled)

const isAnimating = ref(false)

let animation = null

const path = computed(() => getSmoothStepPath(props))

const edgeColor = computed(() => {
  if (targetNodeData.value.hasError) {
    return '#f87171'
  }

  if (targetNodeData.value.isFinished) {
    return '#42B983'
  }

  if (targetNodeData.value.isCancelled || targetNodeData.value.isSkipped) {
    return '#fbbf24'
  }

  if (targetNodeData.value.isRunning || isAnimating.value) {
    return '#2563eb'
  }

  return '#6b7280'
})

watch(isCancelled, (isCancelled) => {
  if (isCancelled) {
    animation?.cancel()
  }
})

watch(isAnimating, (isAnimating) => {
  updateEdgeData(props.id, { isAnimating })
})

watch(isFinished, (isFinished) => {
  if (isFinished) {
    runAnimation()
  }
})

function runAnimation() {
  const pathEl = edgeRef.value?.pathEl

  if (!pathEl) {
    return
  }

  const totalLength = pathEl.getTotalLength()

  isAnimating.value = true

  const keyframes = [{ offsetDistance: '0%' }, { offsetDistance: '100%' }]

  // use path length as a possible measure for the animation duration
  const pathLengthDuration = totalLength * 10

  animation = labelRef.value.animate(keyframes, {
    duration: Math.min(Math.max(pathLengthDuration, 1500), 3000), // clamp duration between 1.5s and 3s
    direction: 'normal',
    easing: 'ease-in-out',
    iterations: 1,
  })

  animation.onfinish = handleAnimationEnd
  animation.oncancel = handleAnimationEnd
}

function handleAnimationEnd() {
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
  <BaseEdge :id="id" ref="edgeRef" :path="path[0]" :style="{ stroke: edgeColor }" />

  <EdgeLabelRenderer>
    <div
      ref="labelRef"
      :style="{
        visibility: isAnimating ? 'visible' : 'hidden',
        position: 'absolute',
        zIndex: 1,
        offsetPath: `path('${path[0]}')`,
        offsetRotate: '0deg',
        offsetAnchor: 'center',
      }"
      class="animated-edge-label"
    >
      <span class="truck">
        <span class="box">📦</span>
        🚚
      </span>
    </div>
  </EdgeLabelRenderer>
</template>

<style scoped>
.truck {
  position: relative;
  display: inline-block;
  transform: scaleX(-1);
}

.box {
  position: absolute;
  top: -10px;
}
</style>
