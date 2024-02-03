<script lang="ts" setup>
import { toRef } from '@vueuse/core'
import type { TeleportProps } from 'vue'
import { useVueFlow } from '../../composables/useVueFlow'

const { viewportRef } = useVueFlow()

const teleportTarget = toRef(() => viewportRef.value?.getElementsByClassName('vue-flow__edge-labels')[0] as TeleportProps['to'])
</script>

<script lang="ts">
export default {
  name: 'EdgeLabelRenderer',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <svg>
    <foreignObject height="0" width="0">
      <Teleport :to="teleportTarget" :disabled="!teleportTarget">
        <slot />
      </Teleport>
    </foreignObject>
  </svg>
</template>
