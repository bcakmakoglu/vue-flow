import { EffectScope } from 'vue'
import { FlowOptions, UseVueFlow } from '~/types'
import { VueFlow } from '~/context'
import { useStore } from '~/store'

export class Storage {
  public flows = new Map<string, UseVueFlow>()
  static instance: Storage

  public static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage()
    }

    return Storage.instance
  }

  public set(id: string, flow: UseVueFlow) {
    this.flows.set(id, flow)
  }

  public get(id: string) {
    return this.flows.get(id)
  }

  public remove(id: string) {
    this.flows.delete(id)
  }

  public create(id: string, options?: Partial<FlowOptions>) {
    const store = useStore(options)
    const flow = {
      id,
      store: reactive(store),
      ...toRefs(store.state),
      ...store.getters,
      ...store.actions,
      ...store.hooksOn,
    } as unknown as UseVueFlow
    this.set(id, flow)
    return flow
  }
}

let id = 0

type Scope = EffectScope & { vueFlowId: string }
export default <N = any, E = N>(options?: Partial<FlowOptions<N, E>>): UseVueFlow<N, E> => {
  const storage = Storage.getInstance()
  const scope = getCurrentScope() as Scope
  let vueFlow: UseVueFlow | null | undefined =
    typeof inject(VueFlow, undefined) !== 'undefined'
      ? inject(VueFlow, undefined)!
      : scope && scope.vueFlowId
      ? storage.get(scope.vueFlowId)
      : undefined
  if (!vueFlow || (vueFlow && options?.id && options.id !== vueFlow.id)) {
    const name = options?.id ?? `vue-flow-${id++}`

    vueFlow = storage.create(name, options)
    if (scope) {
      provide(VueFlow, storage.get(name))
      scope.vueFlowId = name
    }

    onScopeDispose(() => {
      storage.remove(name)
      vueFlow = null
    })
  } else {
    if (options) vueFlow.setState(options)
  }
  if (!vueFlow) throw new Error('vue flow store instance not found.')

  return vueFlow
}
