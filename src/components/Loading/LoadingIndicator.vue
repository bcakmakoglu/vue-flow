<script lang="ts" setup>
import { CSSProperties } from 'vue'

interface LoadingIndicatorProps {
  label?: string
  class?: string
  style?: CSSProperties
}

const props = withDefaults(defineProps<LoadingIndicatorProps>(), {
  label: 'Almost ready...',
})
</script>
<template>
  <div class="vue-flow__loading-indicator" :class="props.class" :style="props.style">
    <slot name="label"> {{ props.label }} </slot>
  </div>
</template>
