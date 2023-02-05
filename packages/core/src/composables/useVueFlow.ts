import type { EffectScope } from 'vue'
import type { FlowOptions, FlowProps, State, VueFlowStore } from '~/types'

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

    const getters = useGetters(reactiveState)

    const actions = useActions(reactiveState, getters)

    const hooksOn = <any>{}
    Object.entries(reactiveState.hooks).forEach(([n, h]) => {
      const name = `on${n.charAt(0).toUpperCase() + n.slice(1)}`
      hooksOn[name] = h.on
    })

    const emits = <any>{}
    Object.entries(reactiveState.hooks).forEach(([n, h]) => {
      emits[n] = h.trigger
    })

    actions.setState(reactiveState)

    const flow: VueFlowStore = {
      ...hooksOn,
      ...getters,
      ...actions,
      ...toRefs(reactiveState),
      emits,
      id,
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

export default (options?: FlowProps): VueFlowStore => {
  const storage = Storage.getInstance()

  const scope = getCurrentScope() as Scope

  const id = options?.id
  const vueFlowId = scope?.vueFlowId || id

  let vueFlow: Injection

  let isParentScope = false

  /**
   * check if we can get a store instance through injections
   * this should be the regular way after initialization
   */
  if (scope) {
    const injection = inject(VueFlow, null)
    if (typeof injection !== 'undefined' && injection !== null) vueFlow = injection
  }

  /**
   * check if we can get a store instance through storage
   * this requires options id or an id on the current scope
   */
  if (!vueFlow) {
    if (vueFlowId) vueFlow = storage.get(vueFlowId)
  }

  /**
   * If we cannot find any store instance in the previous steps
   * _or_ if the store instance we found does not match up with provided ids
   * create a new store instance and register it in storage
   */
  if (!vueFlow || (vueFlow && id && id !== vueFlow.id)) {
    const name = id ?? storage.getId()

    vueFlow = storage.create(name, options)

    if (scope) {
      isParentScope = true
    }
  } else {
    // if composable was called with additional options after initialization, overwrite state with the options values
    if (options) vueFlow.setState(options)
  }

  /**
   * Vue flow wasn't able to find any store instance - we can't proceed
   */
  if (!vueFlow) throw new VueFlowError('Store instance not found.', 'useVueFlow')

  // always provide a fresh instance into context on call
  if (scope) {
    provide(VueFlow, vueFlow)

    scope.vueFlowId = vueFlow.id

    if (isParentScope) {
      // dispose of state values and storage entry
      tryOnScopeDispose(() => {
        if (storage.get(vueFlow!.id)) {
          vueFlow!.$destroy()
        }

        vueFlow = null
      })
    }
  }

  return vueFlow
}
