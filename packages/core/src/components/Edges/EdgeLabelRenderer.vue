<script lang="ts" setup>
import { computed, toRef } from 'vue'
import type { TeleportProps } from 'vue'
import { useVueFlow } from '../../composables'
import { getEdgeZIndex } from '../../utils'

const props = defineProps<{
  edgeId?: string
}>()
const { viewportRef, findNode, elevateEdgesOnSelect, findEdge } = useVueFlow()

const teleportTarget = toRef(() => viewportRef.value?.getElementsByClassName('vue-flow__edge-labels')[0] as TeleportProps['to'])

const edge = computed(() => findEdge(props.edgeId))
const z = computed(() => (edge.value ? getEdgeZIndex(edge.value, findNode, elevateEdgesOnSelect.value) : undefined))
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
        <slot :style="{ zIndex: z }" />
      </Teleport>
    </foreignObject>
  </svg>
</template>
