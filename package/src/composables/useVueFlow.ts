import { EffectScope } from 'vue'
import { ElementData, FlowHooksOn, FlowOptions, State, UseVueFlow } from '~/types'
import { VueFlow } from '~/context'
import useState from '~/store/state'
import useGetters from '~/store/getters'
import useActions from '~/store/actions'

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

  public create(id: string, preloadedState?: Partial<FlowOptions>): UseVueFlow {
    const state: State = useState(preloadedState)
    const reactiveState = reactive(state)
    const getters = useGetters(reactiveState)
    const actions = useActions(reactiveState, getters)
    const hooksOn: FlowHooksOn = <any>{}
    Object.entries(reactiveState.hooks).forEach(([n, h]) => {
      const name = `on${n.charAt(0).toUpperCase() + n.slice(1)}` as keyof FlowHooksOn
      hooksOn[name] = h.on as any
    })
    actions.setState(reactiveState)
    if (preloadedState) {
      if (preloadedState.modelValue) actions.setElements(preloadedState.modelValue)
      if (preloadedState.nodes) actions.setNodes(preloadedState.nodes)
      if (preloadedState.edges) actions.setEdges(preloadedState.edges)
    }

    const store = reactive({
      ...hooksOn,
      ...toRefs(reactiveState),
      ...getters,
      ...actions,
    })

    const flow: UseVueFlow = {
      ...hooksOn,
      ...getters,
      ...actions,
      ...toRefs(reactiveState),
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

type Injection<NodeData = ElementData, EdgeData = ElementData> = UseVueFlow<NodeData, EdgeData> | null | undefined
type Scope = (EffectScope & { vueFlowId: string }) | undefined

export default <NodeData = ElementData, EdgeData = ElementData>(
  options?: Partial<FlowOptions>,
): UseVueFlow<NodeData, EdgeData> => {
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
      scope.vueFlowId = name

      onScopeDispose(() => {
        storage.remove(name)
        vueFlow = null
      })
    }
  } else {
    if (options) vueFlow.setState(options)
  }

  if (!vueFlow) throw new Error('[vueflow]: store instance not found.')

  if (scope) provide(VueFlow, vueFlow)

  return vueFlow
}
