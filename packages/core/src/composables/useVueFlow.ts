import { toRefs, tryOnScopeDispose } from '@vueuse/core'
import type { EffectScope } from 'vue'
import { computed, effectScope, getCurrentScope, inject, provide, reactive, watch } from 'vue'
import { useActions, useGetters, useState } from '~/store'
import type { EdgeChange, FlowOptions, FlowProps, NodeChange, State, VueFlowStore } from '~/types'
import { VueFlow } from '~/context'
import { warn } from '~/utils'

/**
 * Stores all currently created store instances
 */
export class Storage {
  public currentId = 0
  public flows = new Map<string, VueFlowStore>()
  static instance: Storage

  public static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage()
    }

    return Storage.instance
  }

  public set(id: string, flow: VueFlowStore) {
    return this.flows.set(id, flow)
  }

  public get(id: string) {
    return this.flows.get(id)
  }

  public remove(id: string) {
    return this.flows.delete(id)
  }

  public create(id: string, preloadedState?: FlowOptions): VueFlowStore {
    const state: State = useState(preloadedState)

    const reactiveState = reactive(state)

    const hooksOn = <any>{}
    Object.entries(reactiveState.hooks).forEach(([n, h]) => {
      const name = `on${n.charAt(0).toUpperCase() + n.slice(1)}`
      hooksOn[name] = h.on
    })

    const emits = <any>{}
    Object.entries(reactiveState.hooks).forEach(([n, h]) => {
      emits[n] = h.trigger
    })

    const nodeIds = computed(() => reactiveState.nodes.map((n) => n.id))
    const edgeIds = computed(() => reactiveState.edges.map((e) => e.id))

    const getters = useGetters(reactiveState, nodeIds, edgeIds)

    const actions = useActions(id, emits, hooksOn, reactiveState, getters, nodeIds, edgeIds)

    actions.setState(reactiveState)

    const flow: VueFlowStore = {
      ...hooksOn,
      ...getters,
      ...actions,
      ...toRefs(reactiveState),
      emits,
      id,
      vueFlowVersion: typeof __VUE_FLOW_VERSION__ !== 'undefined' ? __VUE_FLOW_VERSION__ : 'UNKNOWN',
      $destroy: () => {
        this.remove(id)
      },
    }

    this.set(id, flow)

    return flow
  }

  public getId() {
    return `vue-flow-${this.currentId++}`
  }
}

type Injection = VueFlowStore | null | undefined
type Scope = (EffectScope & { vueFlowId: string }) | undefined

// todo: maybe replace the storage with a context based solution; This would break calling useVueFlow outside a setup function though, which should be fine
export function useVueFlow(options?: FlowProps): VueFlowStore {
  const storage = Storage.getInstance()

  const scope = getCurrentScope() as Scope

  const id = options?.id
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

    const state = storage.create(name, options)

    vueFlow = state

    const detachedScope = effectScope()

    detachedScope.run(() => {
      watch(
        state.applyDefault,
        (shouldApplyDefault) => {
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
        },
        { immediate: true },
      )

      // dispose of state values and storage entry
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
  } else {
    // if composable was called with additional options after initialization, overwrite state with the options values
    if (options) {
      vueFlow.setState(options)
    }
  }

  // always provide a fresh instance into context on call
  if (scope) {
    provide(VueFlow, vueFlow)

    scope.vueFlowId = vueFlow.id
  }

  return vueFlow
}
