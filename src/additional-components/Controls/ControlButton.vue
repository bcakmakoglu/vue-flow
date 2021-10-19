<script lang="ts" setup>
export type ControlButtonProps = HTMLButtonElement

const props = defineProps<ControlButtonProps>()
</script>
<template>
  <button :class="['revue-flow__controls-button']" v-bind="props">
    <slot></slot>
  </button>
</template>
