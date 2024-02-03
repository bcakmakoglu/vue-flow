<script setup>
import { computed, ref } from 'vue'
import { TransitionPresets, useDebounceFn, useTransition, watchDebounced } from '@vueuse/core'
import { getBezierPath, useVueFlow } from '@vue-flow/core'

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
})

const curve = ref()

const dot = ref()

const transform = ref({ x: 0, y: 0 })

const showDot = ref(false)

const { onNodeDoubleClick, fitBounds, fitView } = useVueFlow()

const path = computed(() =>
  getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  }),
)

const debouncedFitBounds = useDebounceFn(fitBounds, 1, { maxWait: 1 })

onNodeDoubleClick(({ node }) => {
  const isSource = props.source === node.id
  const isTarget = props.target === node.id

  if (!showDot.value && (isSource || isTarget)) {
    showDot.value = true
    let totalLength = curve.value.getTotalLength()
    const initialPos = ref(isSource ? 0 : totalLength)
    let stopHandle

    const output = useTransition(initialPos, {
      duration: Math.floor(totalLength / 2 / 100) * 1000,
      transition: TransitionPresets.easeOutCubic,
      onFinished: () => {
        stopHandle?.()
        showDot.value = false
        fitView({
          nodes: [isSource ? props.target : props.source],
          duration: 500,
        })
      },
    })

    transform.value = curve.value.getPointAtLength(output.value)

    debouncedFitBounds(
      {
        width: 100,
        height: 200,
        x: transform.value.x - 100,
        y: transform.value.y - 100,
      },
      { duration: 500 },
    )

    setTimeout(() => {
      initialPos.value = isSource ? totalLength : 0

      stopHandle = watchDebounced(
        output,
        (next) => {
          if (!showDot.value) {
            return
          }

          const nextLength = curve.value.getTotalLength()

          if (totalLength !== nextLength) {
            totalLength = nextLength
            initialPos.value = isSource ? totalLength : 0
          }

          transform.value = curve.value.getPointAtLength(next)

          debouncedFitBounds({
            width: 100,
            height: 200,
            x: transform.value.x - 100,
            y: transform.value.y - 100,
          })
        },
        { debounce: 1 },
      )
    }, 500)
  }
})
</script>

<script>
export default {
  inheritAttrs: false,
}
</script>

<template>
  <path :id="id" ref="curve" :style="style" class="vue-flow__edge-path" :d="path[0]" :marker-end="markerEnd" />

  <Transition name="fade">
    <circle
      v-if="showDot"
      ref="dot"
      r="5"
      cy="0"
      cx="0"
      :transform="`translate(${transform.x}, ${transform.y})`"
      style="fill: #fdd023"
    />
  </Transition>
</template>
