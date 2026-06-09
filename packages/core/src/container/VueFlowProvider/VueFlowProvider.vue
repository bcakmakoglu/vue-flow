<script lang="ts" setup>
import { useVueFlow } from '../../composables/useVueFlow'

const props = defineProps<{
  /**
   * Optional id to pin the provided store. When omitted, a fresh store id is generated.
   * Use the same id with `useVueFlow(id)` elsewhere to address this store explicitly.
   */
  id?: string
}>()

/**
 * Creating + providing the store from this component makes it an ANCESTOR provide, so every
 * descendant `<VueFlow>` instance and any sibling component that calls `useVueFlow()` resolves the
 * same store via `inject(VueFlow)` — mirroring `<ReactFlowProvider>` / `<SvelteFlowProvider>`.
 *
 * `useVueFlow` itself performs the create-and-provide (see composables/useVueFlow.ts); we just invoke
 * it at this position in the tree so the store is owned here rather than inside a single `<VueFlow>`.
 * This lets multiple `<VueFlow>` instances — or components rendered as siblings of `<VueFlow>` — share
 * one store without the global `Storage` lookup-by-id dance.
 */
useVueFlow(props.id)
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
