<script lang="ts" setup>
import type { ButtonHTMLAttributes } from 'vue'

const props = defineProps<ButtonHTMLAttributes>()
</script>

<script lang="ts">
export default {
  name: 'ControlButton',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <button v-bind="props" class="vue-flow__controls-button">
    <slot />
  </button>
</template>
