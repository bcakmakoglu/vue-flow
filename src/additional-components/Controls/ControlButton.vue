<script lang="ts" setup>
import { ButtonHTMLAttributes } from 'vue'

export interface ControlButtonProps extends ButtonHTMLAttributes {}

const props: any = defineProps<ControlButtonProps>()
</script>
<template>
  <button :class="['revue-flow__controls-button']" v-bind="props">
    <slot></slot>
  </button>
</template>
