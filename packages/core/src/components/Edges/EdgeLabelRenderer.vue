<script lang="ts" setup>
import { toRef } from '@vueuse/core'
import { useVueFlow } from '../../composables'

const { viewportRef } = useVueFlow()

const teleportTarget = toRef(() => viewportRef.value!.getElementsByClassName('vue-flow__edge-labels')[0])
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
      <Teleport :to="teleportTarget as any" :disabled="!teleportTarget">
        <slot />
      </Teleport>
    </foreignObject>
  </svg>
</template>
