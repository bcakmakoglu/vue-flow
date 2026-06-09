<script lang="ts" setup>
import { useCreateVueFlow } from '../../composables/useCreateVueFlow'

const props = defineProps<{
  /** Optional id for the created store (used for aria/debug — not a lookup key). */
  id?: string
}>()

/**
 * Owns a VueFlow store and `provide`s it to its subtree. Every descendant `<VueFlow>` and any
 * component that calls `useVueFlow()` below this point resolves the same store via `inject` — the
 * way to share one store across components (mirrors `<ReactFlowProvider>` / `<SvelteFlowProvider>`).
 * A descendant `<VueFlow>` reuses this provided store rather than creating its own.
 */
useCreateVueFlow({ id: props.id })
</script>

<script lang="ts">
export default {
  name: 'VueFlowProvider',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <slot />
</template>
