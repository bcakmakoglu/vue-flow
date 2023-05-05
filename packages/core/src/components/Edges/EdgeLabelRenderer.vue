<script lang="ts" setup>
import { useVueFlow } from '../../composables'

const { viewportRef } = useVueFlow()
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
      <Teleport :to="viewportRef!.getElementsByClassName('vue-flow__edge-labels')[0] as any" :disabled="!teleportTarget">
        <slot />
      </Teleport>
    </foreignObject>
  </svg>
</template>
