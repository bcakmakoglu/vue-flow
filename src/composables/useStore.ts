import { getCurrentInstance } from 'vue'
import { FlowExportObject, FlowOptions, FlowState, FlowStore } from '~/types'
import { useNewStore } from '~/store'
import { StoreSymbol } from '~/context'
import { onLoadToObject, initialState } from '~/utils'

let id = 0
export const createStore = (options?: FlowOptions) => {
  const withStorage = options?.storageKey ?? false
  let storedState = ref<FlowExportObject>()
  const initial = initialState()
  const storageKey = options?.id ?? `vue-flow-${id++}`
  const preloadedState = {
    ...initial,
    ...(options as FlowState),
  }
  if (withStorage) {
    storedState = useStorage<FlowExportObject>(storageKey, { elements: [], position: [0, 0], zoom: 0 })
    if (storedState.value) {
      preloadedState.elements = storedState.value.elements ?? options?.elements ?? []
      if (storedState.value.position && storedState.value.zoom)
        preloadedState.transform = [storedState.value.position[0], storedState.value.position[1], storedState.value.zoom]
    }
  }
  const store = useNewStore(storageKey, preloadedState)
  if (withStorage && storageKey === store.id?.value) {
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
  if (!store || (store && options?.id && options.id !== store.id?.value)) {
    store = createStore(options)
  }
  if (currentInstance) provide(StoreSymbol, store)

  return reactive(store)
}
