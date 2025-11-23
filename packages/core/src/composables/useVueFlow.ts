import { getCurrentScope, inject, provide } from 'vue'
import type { Node, VueFlowStore } from '../types'
import { VueFlow } from '../context'
import { Storage } from '../utils/storage'

// todo: maybe replace the storage with a context based solution; This would break calling useVueFlow outside a setup function though, which should be fine
/**
 * Composable that provides access to a store instance
 *
 * If no id is provided, the store instance is injected from context
 *
 * If no store instance is found in context, a new store instance is created and registered in storage
 *
 * @public
 * @returns a vue flow store instance
 * @param id - id of the store instance or options to create a new store instance
 */
export function useVueFlow<NodeType extends Node = Node>(id?: string): VueFlowStore<NodeType> {
  const storage = Storage.getInstance()

  const scope = getCurrentScope()

  let vueFlow: VueFlowStore<NodeType> | null | undefined

  /**
   * check if we can get a store instance through injections
   * this should be the regular way after initialization
   */
  if (scope) {
    const injectedState = inject(VueFlow, null) as VueFlowStore<NodeType> | null
    if (typeof injectedState !== 'undefined' && injectedState !== null && (!vueFlowId || injectedState.id === vueFlowId)) {
      vueFlow = injectedState
    }
  }

  /**
   * check if we can get a store instance through storage
   * this requires options id or an id on the current scope
   */
  if (!vueFlow && id) {
    vueFlow = storage.get(id) as unknown as VueFlowStore<NodeType>
  }

  /**
   * If we cannot find any store instance in the previous steps
   * _or_ if the store instance we found does not match up with provided ids
   * create a new store instance and register it in storage
   */
  if (!vueFlow || (id && vueFlow.id !== id)) {
    const name = id ?? storage.getId()

    vueFlow = storage.create(name) as unknown as VueFlowStore<NodeType>
  }

  // Provide a fresh instance into context if we are in a scope
  if (scope) {
    provide(VueFlow, vueFlow as unknown as VueFlowStore)
  }

  return vueFlow as VueFlowStore<NodeType>
}
