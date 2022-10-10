<script lang="ts" setup>
import { useVueFlow } from '@vue-flow/core'
import type { PanelProps } from './types'

const props = defineProps<PanelProps>()

const pointerEvents = useVueFlow()
const positionClasses = computed(() => `${props.position}`.split('-'))
</script>

<template>
  <div class="vue-flow__panel" :class="positionClasses" :style="{ pointerEvents }">
    <slot />
  </div>
</template>
