<script lang="ts" setup>
const { userSelectionRect } = useVueFlow()
</script>

<template>
  <div
    class="vue-flow__selection react-flow__container"
    :style="{
      width: `${userSelectionRect?.width}px`,
      height: `${userSelectionRect?.height}px`,
      transform: `translate(${userSelectionRect?.x}px, ${userSelectionRect?.y}px)`,
    }"
  />
</template>
