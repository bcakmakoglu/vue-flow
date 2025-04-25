<script lang="ts" setup>
import { inject } from 'vue'
import { useVueFlow } from '../../composables'
import { VueFlow } from '../../context'
import type { VueFlowProviderProps } from '../../types'

const props = defineProps<VueFlowProviderProps>()

const hasInjection = inject(VueFlow, null)

if (!hasInjection) {
  // createVueFlow() or setupVueFlow()
  useVueFlow({
    nodes: props.initialNodes,
    edges: props.initialEdges,
    fitViewOnInit: props.fitViewOnInit,
  })
}
</script>

<template>
  <slot />
</template>
