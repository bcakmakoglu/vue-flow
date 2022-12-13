<script lang="ts" setup>
import type { PanelProps } from '../../types'

const props = defineProps<PanelProps>()

const { userSelectionActive } = useVueFlow()
const positionClasses = computed(() => `${props.position}`.split('-'))
</script>

<template>
  <div class="vue-flow__panel" :class="positionClasses" :style="{ pointerEvents: userSelectionActive ? 'none' : 'all' }">
    <slot />
  </div>
</template>
