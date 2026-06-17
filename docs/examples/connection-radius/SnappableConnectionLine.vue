<script setup>
import { connectionExists, getBezierPath, storeToRefs, useStore, useVueFlow } from '@vue-flow/core';
import { computed, reactive, ref, watch } from 'vue';

const props = defineProps({
  fromX: {
    type: Number,
    required: true,
  },
  fromY: {
    type: Number,
    required: true,
  },
  toX: {
    type: Number,
    required: true,
  },
  toY: {
    type: Number,
    required: true,
  },
  fromPosition: {
    type: String,
    required: true,
  },
  toPosition: {
    type: String,
    required: true,
  },
});

const { getNodes, getEdges, getInternalNode, onConnectEnd, addEdges } = useVueFlow();

const { connectionStartHandle } = storeToRefs(useStore());

const closest = reactive({
  node: null,
  handle: null,
  startHandle: connectionStartHandle.value,
});

const canSnap = ref(false);

const HIGHLIGHT_COLOR = '#f59e0b';

const SNAP_HIGHLIGHT_COLOR = '#10b981';

const MIN_DISTANCE = 75;

const SNAP_DISTANCE = 30;

watch([() => props.toY, () => props.toX], (_, __, onCleanup) => {
  const closestNode = getNodes.value.reduce(
    (res, n) => {
      if (n.id !== connectionStartHandle.value?.nodeId) {
        const internalNode = getInternalNode(n.id);
        const dx = props.toX - (internalNode.internals.positionAbsolute.x + internalNode.measured.width / 2);
        const dy = props.toY - (internalNode.internals.positionAbsolute.y + internalNode.measured.height / 2);
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < res.distance && d < MIN_DISTANCE) {
          res.distance = d;
          res.node = internalNode;
        }
      }

      return res;
    },
    {
      distance: Number.MAX_VALUE,
      node: null,
    },
  );

  if (!closestNode.node) {
    return;
  }

  canSnap.value = closestNode.distance < SNAP_DISTANCE;

  const type = connectionStartHandle.value.type === 'source' ? 'target' : 'source';

  const closestHandle = closestNode.node.internals.handleBounds[type]?.reduce((prev, curr) => {
    const prevDistance = Math.sqrt((prev.x - props.toX) ** 2 + (prev.y - props.toY) ** 2);
    const currDistance = Math.sqrt((curr.x - props.toX) ** 2 + (curr.y - props.toY) ** 2);

    return prevDistance < currDistance ? prev : curr;
  });

  if (
    connectionExists(
      {
        source: connectionStartHandle.value.nodeId,
        sourceHandle: connectionStartHandle.value.handleId,
        target: closestNode.node.id,
        targetHandle: closestHandle.id,
      },
      getEdges.value,
    )
  ) {
    return;
  }

  if (closestHandle) {
    const el = document.querySelector(`[data-nodeid='${closestNode.node.id}']`);

    const prevStyle = el.style.backgroundColor;
    el.style.backgroundColor = canSnap.value ? SNAP_HIGHLIGHT_COLOR : HIGHLIGHT_COLOR;
    closest.node = closestNode.node;
    closest.handle = closestHandle;

    onCleanup(() => {
      el.style.backgroundColor = prevStyle;
      closest.node = null;
      closest.handle = null;
    });
  }
});

const path = computed(() =>
  getBezierPath({
    sourceX: props.fromX,
    sourceY: props.fromY,
    sourcePosition: props.fromPosition,
    targetX: props.toX,
    targetY: props.toY,
    targetPosition: props.toPosition,
  }),
);

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
      ]);
    }
  }
});

const strokeColor = computed(() => {
  if (canSnap.value) {
    return SNAP_HIGHLIGHT_COLOR;
  }

  if (closest.node) {
    return HIGHLIGHT_COLOR;
  }

  return '#222';
});
</script>

<template>
  <g>
    <path :d="path[0]" class="vue-flow__connection-path" />
    <circle :cx="toX" :cy="toY" fill="#fff" :stroke="strokeColor" :r="3" :stroke-width="1.5" />
  </g>
</template>
