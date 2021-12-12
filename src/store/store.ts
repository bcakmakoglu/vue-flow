import { getCurrentInstance } from 'vue'
import useState, { initialState } from './state'
import useActions from './actions'
import useGetters from './getters'
import { FlowExportObject, FlowOptions, FlowState, FlowStore, Store } from '~/types'
import { StoreSymbol } from '~/context'
import { onLoadToObject } from '~/utils'

const useFlowStore = (id: string, preloadedState: FlowState): Store => {
  const state = reactive(useState(preloadedState))
  const getters = useGetters(state)
  const actions = useActions(state, getters)
  return {
    id,
    state,
    ...toRefs(state),
    ...getters,
    ...actions,
  }
}

let id = 0
export const createStore = (options?: FlowOptions) => {
  const withStorage = options?.storageKey ?? false
  let storedState = ref<FlowExportObject>()
  const initial = initialState()
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

export default (options?: FlowOptions): FlowStore => {
  const currentInstance = getCurrentInstance()
  let store = currentInstance ? inject(StoreSymbol, undefined) : false
  if (!store || (store && options?.id && options.id !== store.id)) {
    store = createStore(options)
  }
  if (currentInstance) provide(StoreSymbol, store)

  return reactive(store)
}
