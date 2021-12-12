import useState from './state'
import useActions from './actions'
import useGetters from './getters'
import { FlowExportObject, FlowHooksOn, FlowOptions, FlowState, Store } from '~/types'
import { onLoadToObject } from '~/utils'

const useFlowStore = (id: string, preloadedState: FlowState): Store => {
  const state = reactive(useState())
  const getters = useGetters(state)
  const actions = useActions(state, getters)
  const hooksOn: FlowHooksOn = <any>{}
  Object.entries(state.hooks).forEach(([n, h]) => {
    const name = `On${n.charAt(0).toUpperCase() + n.slice(1)}`
    hooksOn[<keyof FlowHooksOn>name] = h.on as any
  })
  actions.setState(preloadedState)
  return {
    id,
    state,
    hooksOn,
    ...toRefs(state),
    ...getters,
    ...actions,
  }
}

let id = 0
export default (options?: FlowOptions) => {
  const withStorage = options?.storageKey ?? false
  let storedState = ref<FlowExportObject>()
  const initial = useState()
  const storageKey = options?.id ?? `vue-flow-${id++}`
  delete options?.id
  const preloadedState = {
    ...initial,
    ...(options as FlowState),
  }
  if (withStorage) {
    storedState = useStorage<FlowExportObject>(storageKey, { edges: [], nodes: [], position: [0, 0], zoom: 0 })
    if (storedState.value) {
      preloadedState.elements =
        storedState.value.nodes || storedState.value.edges
          ? [...storedState.value.nodes, ...storedState.value.edges]
          : options?.elements ?? []
      if (storedState.value.position && storedState.value.zoom)
        preloadedState.transform = [storedState.value.position[0], storedState.value.position[1], storedState.value.zoom]
    }
  }
  const store = useFlowStore(storageKey, preloadedState)
  if (withStorage && storageKey === store.id) {
    const toObject = onLoadToObject(store.state)
    watch(
      store.state,
      () => {
        storedState.value = toObject()
      },
      { deep: true },
    )
  }
  return store
}
