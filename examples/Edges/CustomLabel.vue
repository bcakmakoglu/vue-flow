<script lang="ts" setup>
interface CustomLabelProps {
  text: string
}

const props = defineProps<CustomLabelProps>()
</script>
<template>
  <tspan dy="10" x="0">{{ props.text }}</tspan>
</template>
