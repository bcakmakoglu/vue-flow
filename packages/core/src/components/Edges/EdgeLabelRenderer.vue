<script lang="ts" setup>
import { useVueFlow } from '../../composables'

const { viewportRef } = useVueFlow()

const teleportTarget = $computed(() => viewportRef.value?.getElementsByClassName('vue-flow__edge-labels')[0])
</script>

<script lang="ts">
export default {
  name: 'EdgeLabelRenderer',
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
