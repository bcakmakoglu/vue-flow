<script lang="ts" setup>
interface CustomLabelProps {
  label: string
}

const props = defineProps<CustomLabelProps>()
</script>

<template>
  <tspan dy="10" x="0">{{ props.label }}</tspan>
</template>
