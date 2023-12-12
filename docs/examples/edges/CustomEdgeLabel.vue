<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <tspan dy="10" x="0">{{ props.label }}</tspan>
</template>
