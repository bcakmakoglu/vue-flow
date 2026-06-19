<script setup>
import { getBezierPath, getSmoothStepPath, Position, useInternalNode } from '@vue-flow/core';
import { computed } from 'vue';

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
  source: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const sourceNode = useInternalNode(() => props.source);

const path = computed(() => {
  if (sourceNode.value) {
    if (props.data.pathType === 'bezier') {
      if (
        (props.sourcePosition === Position.Bottom && props.targetPosition === Position.Top)
        || (props.sourcePosition === Position.Top && props.targetPosition === Position.Bottom)
      ) {
        // for horizontal loopback edges
        const radiusX = 60;
        const radiusY = props.sourceY - props.targetY;

        return [`M ${props.sourceX} ${props.sourceY} A ${radiusX} ${radiusY} 0 1 0 ${props.targetX} ${props.targetY}`];
      }
      else if (
        (props.sourcePosition === Position.Left && props.targetPosition === Position.Right)
        || (props.sourcePosition === Position.Right && props.targetPosition === Position.Left)
      ) {
        // for vertical loopback edges
        const radiusX = (props.sourceX - props.targetX) * 0.6;
        const radiusY = 50;

        return [`M ${props.sourceX} ${props.sourceY} A ${radiusX} ${radiusY} 0 1 0 ${props.targetX} ${props.targetY}`];
      }
    }
    else if (props.data.pathType === 'smoothstep') {
      let centerX, centerY;
      if (props.source === props.target) {
        if (
          (props.sourcePosition === Position.Bottom && props.targetPosition === Position.Top)
          || (props.sourcePosition === Position.Top && props.targetPosition === Position.Bottom)
        ) {
          const source = sourceNode.value;
          centerX = props.sourceX - 40 - source.measured.width / 2;
          centerY = (props.sourceY + props.targetY) / 2;
        }
        else if (
          (props.sourcePosition === Position.Left && props.targetPosition === Position.Right)
          || (props.sourcePosition === Position.Right && props.targetPosition === Position.Left)
        ) {
          const source = sourceNode.value;
          centerX = (props.sourceX + props.targetX) / 2;
          centerY = props.sourceY + 40 + source.measured.height / 2;
        }
      }

      return getSmoothStepPath({
        sourcePosition: props.sourcePosition,
        targetPosition: props.targetPosition,
        centerX,
        centerY,
        ...props,
      });
    }
  }

  // default to bezier path
  return getBezierPath(props);
});
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<template>
  <path :d="path[0]" fill="none" stroke="black" />
</template>
