<script lang="ts" setup>
import { toRef } from '@vueuse/core'
import type { PanelProps } from '../../types/panel'
import { useVueFlow } from '../../composables'

const props = defineProps<PanelProps>()

const { userSelectionActive } = useVueFlow()

const positionClasses = toRef(() => `${props.position}`.split('-'))
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
