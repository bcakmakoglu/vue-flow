<script setup>
import { connectionExists, getBezierPath, useVueFlow } from '@vue-flow/core'
import { computed, reactive, ref, watch } from 'vue'

const props = defineProps({
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
  targetPosition: {
    type: String,
    required: true,
  },
  sourcePosition: {
    type: String,
    required: true,
  },
})

const { getNodes, connectionStartHandle, onConnectEnd, addEdges, edges } = useVueFlow()

const closest = reactive({
  node: null,
  handle: null,
  startHandle: connectionStartHandle.value,
})

const canSnap = ref(false)

const HIGHLIGHT_COLOR = '#f59e0b'

const SNAP_HIGHLIGHT_COLOR = '#10b981'

const MIN_DISTANCE = 75

const SNAP_DISTANCE = 30

watch([() => props.targetY, () => props.targetX], (_, __, onCleanup) => {
  const closestNode = getNodes.value.reduce(
    (res, n) => {
      if (n.id !== connectionStartHandle.value?.nodeId) {
        const dx = props.targetX - (n.computedPosition.x + n.dimensions.width / 2)
        const dy = props.targetY - (n.computedPosition.y + n.dimensions.height / 2)
        const d = Math.sqrt(dx * dx + dy * dy)

        if (d < res.distance && d < MIN_DISTANCE) {
          res.distance = d
          res.node = n
        }
      }

      return res
    },
    {
      distance: Number.MAX_VALUE,
      node: null,
    },
  )

  if (!closestNode.node) {
    return
  }

  canSnap.value = closestNode.distance < SNAP_DISTANCE

  const type = connectionStartHandle.value.type === 'source' ? 'target' : 'source'

  const closestHandle = closestNode.node.handleBounds[type]?.reduce((prev, curr) => {
    const prevDistance = Math.sqrt((prev.x - props.targetX) ** 2 + (prev.y - props.targetY) ** 2)
    const currDistance = Math.sqrt((curr.x - props.targetX) ** 2 + (curr.y - props.targetY) ** 2)

    return prevDistance < currDistance ? prev : curr
  })

  if (
    connectionExists(
      {
        source: connectionStartHandle.value.nodeId,
        sourceHandle: connectionStartHandle.value.handleId,
        target: closestNode.node.id,
        targetHandle: closestHandle.id,
      },
      edges.value,
    )
  ) {
    return
  }

  if (closestHandle) {
    const el = document.querySelector(`[data-nodeid='${closestNode.node.id}']`)

    const prevStyle = el.style.backgroundColor
    el.style.backgroundColor = canSnap.value ? SNAP_HIGHLIGHT_COLOR : HIGHLIGHT_COLOR
    closest.node = closestNode.node
    closest.handle = closestHandle

    onCleanup(() => {
      el.style.backgroundColor = prevStyle
      closest.node = null
      closest.handle = null
    })
  }
})

const path = computed(() => getBezierPath(props))

onConnectEnd(() => {
  if (closest.startHandle && closest.handle && closest.node) {
    if (canSnap.value) {
      addEdges([
        {
          sourceHandle: closest.startHandle.handleId,
          source: closest.startHandle.nodeId,
          target: closest.node.id,
          targetHandle: closest.handle.id,
        },
      ])
    }
  }
})

const strokeColor = computed(() => {
  if (canSnap.value) {
    return SNAP_HIGHLIGHT_COLOR
  }

  if (closest.node) {
    return HIGHLIGHT_COLOR
  }

  return '#222'
})
</script>

<template>
  <g>
    <path :d="path[0]" class="vue-flow__connection-path" />
    <circle :cx="targetX" :cy="targetY" fill="#fff" :stroke="strokeColor" :r="3" :stroke-width="1.5" />
  </g>
</template>
