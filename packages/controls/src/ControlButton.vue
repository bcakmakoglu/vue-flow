<script lang="ts">
export default {
  name: 'ControlButton',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <button class="vue-flow__controls-button">
    <slot></slot>
  </button>
</template>
