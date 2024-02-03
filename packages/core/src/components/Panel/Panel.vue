<script lang="ts" setup>
import { computed } from 'vue'
import type { PanelProps } from '../../types'
import { useVueFlow } from '../../composables/useVueFlow'

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
