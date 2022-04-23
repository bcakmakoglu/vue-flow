import { EffectScope } from 'vue'
import { MaybeRef } from '@vueuse/core'
import { FlowOptions, FlowProps, State, VueFlowStore } from '~/types'
import { VueFlow } from '~/context'
import useState from '~/store/state'
import useGetters from '~/store/getters'
import useActions from '~/store/actions'

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
    if (preloadedState) {
      if (preloadedState.modelValue) actions.setElements(preloadedState.modelValue)
      if (preloadedState.nodes) actions.setNodes(preloadedState.nodes)
      if (preloadedState.edges) actions.setEdges(preloadedState.edges)
    }

    const flow: VueFlowStore = {
      ...hooksOn,
      ...getters,
      ...actions,
      ...toRefs(reactiveState),
      emits,
      id,
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
type Options = { [key in keyof FlowProps]: MaybeRef<FlowProps[key]> }

export default (options?: Options): VueFlowStore => {
  const reactiveOptions = options ? reactive(options) : undefined

  const storage = Storage.getInstance()

  const scope = getCurrentScope() as Scope

  const id = reactiveOptions?.id
  const vueFlowId = scope?.vueFlowId || id

  let vueFlow: Injection

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

    vueFlow = storage.create(name, reactiveOptions)

    if (scope) {
      scope.vueFlowId = name

      // dispose of state values and storage entry
      onScopeDispose(() => {
        vueFlow?.$reset()
        storage.remove(name)
        vueFlow = null
      })

      if (reactiveOptions) {
        scope.run(() => {
          watch(reactiveOptions, (opts) => {
            vueFlow?.setState(opts)
          })
        })
      }
    }
  } else {
    // if composable was called with additional options after initialization, overwrite state with the options values
    if (reactiveOptions) vueFlow.setState(reactiveOptions)
  }

  /**
   * Vue flow wasn't able to find any store instance - we can't proceed
   */
  if (!vueFlow) throw new Error('[vueflow]: store instance not found.')

  // always provide a fresh instance into context on call
  if (scope) {
    provide(VueFlow, vueFlow)
  }

  return vueFlow
}
