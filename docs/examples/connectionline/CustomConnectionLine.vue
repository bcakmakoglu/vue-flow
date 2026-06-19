<script setup>
defineProps({
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
});
</script>

<template>
  <g>
    <path
      class="vue-flow__connection animated"
      fill="none"
      stroke="#6F3381"
      :stroke-width="2.5"
      :d="`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`"
    />

    <circle :cx="toX" :cy="toY" fill="#fff" :r="4" stroke="#6F3381" :stroke-width="1.5" />
  </g>
</template>
