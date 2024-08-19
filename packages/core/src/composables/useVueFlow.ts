import { tryOnScopeDispose } from '@vueuse/core'
import type { EffectScope } from 'vue'
import { effectScope, getCurrentScope, inject, provide, watch } from 'vue'
import type { EdgeChange, NodeChange, VueFlowStore } from '../types'
import { warn } from '../utils'
import { VueFlow } from '../context'
import { Storage } from '../utils/storage'

type Injection = VueFlowStore | null | undefined
type Scope = (EffectScope & { vueFlowId: string }) | undefined

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
export function useVueFlow(id?: string): VueFlowStore {
  const storage = Storage.getInstance()

  const scope = getCurrentScope() as Scope

  const vueFlowId = scope?.vueFlowId || id

  let vueFlow: Injection

  /**
   * check if we can get a store instance through injections
   * this should be the regular way after initialization
   */
  if (scope) {
    const injection = inject(VueFlow, null)
    if (typeof injection !== 'undefined' && injection !== null) {
      vueFlow = injection
    }
  }

  /**
   * check if we can get a store instance through storage
   * this requires options id or an id on the current scope
   */
  if (!vueFlow) {
    if (vueFlowId) {
      vueFlow = storage.get(vueFlowId)
    }
  }

  /**
   * If we cannot find any store instance in the previous steps
   * _or_ if the store instance we found does not match up with provided ids
   * create a new store instance and register it in storage
   */
  if (!vueFlow || (vueFlow && id && id !== vueFlow.id)) {
    const name = id ?? storage.getId()

    const state = storage.create(name)

    vueFlow = state

    const vfScope = scope ?? effectScope(true)
    vfScope.run(() => {
      /**
       * We have to watch the applyDefault option here,
       * because we need to register the default hooks before the `VueFlow` component is actually mounted and props passed
       * Otherwise calling `addNodes` while the component is not mounted will not trigger any changes unless change handlers are explicitly bound
       */
      watch(
        state.applyDefault,
        (shouldApplyDefault, __, onCleanup) => {
          const nodesChangeHandler = (changes: NodeChange[]) => {
            state.applyNodeChanges(changes)
          }

          const edgesChangeHandler = (changes: EdgeChange[]) => {
            state.applyEdgeChanges(changes)
          }

          if (shouldApplyDefault) {
            state.onNodesChange(nodesChangeHandler)
            state.onEdgesChange(edgesChangeHandler)
          } else {
            state.hooks.value.nodesChange.off(nodesChangeHandler)
            state.hooks.value.edgesChange.off(edgesChangeHandler)
          }

          // Release handlers on cleanup
          onCleanup(() => {
            state.hooks.value.nodesChange.off(nodesChangeHandler)
            state.hooks.value.edgesChange.off(edgesChangeHandler)
          })
        },
        { immediate: true },
      )

      // Destroy store instance on scope dispose
      tryOnScopeDispose(() => {
        if (vueFlow) {
          const storedInstance = storage.get(vueFlow.id)

          if (storedInstance) {
            storedInstance.$destroy()
          } else {
            warn(`No store instance found for id ${vueFlow.id} in storage.`)
          }
        }
      })
    })
  }

  // Provide a fresh instance into context if we are in a scope
  if (scope) {
    provide(VueFlow, vueFlow)

    scope.vueFlowId = vueFlow.id
  }

  return vueFlow
}
