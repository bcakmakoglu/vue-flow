<script lang="ts" setup>
import type { PanelProps } from '../../types/panel'

const props = defineProps<PanelProps>()

const { userSelectionActive } = useVueFlow()

const positionClasses = computed(() => `${props.position}`.split('-'))
</script>

<script lang="ts">
export default {
  name: 'Panel',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <div class="vue-flow__panel" :class="positionClasses" :style="{ pointerEvents: userSelectionActive ? 'none' : 'all' }">
    <slot />
  </div>
</template>
