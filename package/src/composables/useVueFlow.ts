import { EffectScope } from 'vue'
import { FlowOptions, UseVueFlow } from '~/types'
import { VueFlow } from '~/context'
import { useStore } from '~/store'

export class Storage {
  public currentId = 0
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
    const flow: UseVueFlow = {
      ...(store as any),
      ...toRefs(store.state),
      id,
      store,
    }
    this.set(id, flow)
    return flow
  }

  public getId() {
    return `vue-flow-${this.currentId++}`
  }
}

type Injection = UseVueFlow | null | undefined
type Scope = (EffectScope & { vueFlowId: string }) | undefined

export default <N = any, E = N>(options?: Partial<FlowOptions<N, E>>): UseVueFlow<N, E> => {
  const storage = Storage.getInstance()
  const scope = getCurrentScope() as Scope
  const vueFlowId = scope?.vueFlowId || options?.id

  let vueFlow: Injection

  if (scope) {
    const injection = inject(VueFlow, null)
    if (typeof injection !== 'undefined' && injection !== null) vueFlow = injection
  }

  if (!vueFlow) {
    if (vueFlowId) vueFlow = storage.get(vueFlowId)
  }

  if (!vueFlow || (vueFlow && options?.id && options.id !== vueFlow.id)) {
    const name = options?.id ?? storage.getId()

    vueFlow = storage.create(name, options)

    if (scope) {
      provide(VueFlow, storage.get(name))
      scope.vueFlowId = name

      onScopeDispose(() => {
        storage.remove(name)
        vueFlow = null
      })
    }
  } else {
    if (options) vueFlow.setState(options)
  }

  if (!vueFlow) throw new Error('vue flow store instance not found.')

  return vueFlow
}
