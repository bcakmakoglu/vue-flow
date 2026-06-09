import { inject } from 'vue'
import type { Node, VueFlowStore } from '../types'
import { VueFlow } from '../context'
import { ErrorCode, VueFlowError } from '../utils/errors'

/**
 * Access the VueFlow store for the surrounding flow.
 *
 * Pure context consumer — resolves the store provided by the nearest `<VueFlow>` / `<VueFlowProvider>`
 * ancestor (same model as `useReactFlow` / `useSvelteFlow`). It takes **no arguments**: there is no
 * global registry, no lookup-by-id, and no store creation here. To create/own a store, render a
 * `<VueFlowProvider>` (or `<VueFlow>`, which provides its own); to share one across components, wrap
 * them in a common `<VueFlowProvider>`.
 *
 * Throws if called outside a provider (or outside a component `setup`, where `inject` is unavailable).
 *
 * @public
 * @returns the VueFlow store instance for the current context
 */
export function useVueFlow<NodeType extends Node = Node>(): VueFlowStore<NodeType> {
  const store = inject(VueFlow, null) as VueFlowStore<NodeType> | null

  if (!store) {
    throw new VueFlowError(ErrorCode.USE_VUE_FLOW_OUTSIDE_PROVIDER)
  }

  return store
}
