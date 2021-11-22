import { FlowExportObject, FlowOptions, FlowState } from '~/types'
import { useStateStore } from '~/store'
import { Store } from '~/context'
import { onLoadToObject, initialState } from '~/utils'

let id = 0
export default (options?: Partial<FlowOptions>, key?: string) => {
  let store = inject(Store, undefined)
  if (!store) {
    const withStorage = options?.storageKey ?? key ?? false
    if (import.meta.env.DEV) console.warn('store context not found; creating default store')
    let storedState = ref<FlowExportObject>()
    const initial = initialState()
    const storageKey = key ?? `vue-flow-${id++}`
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
    store = useStateStore(storageKey, preloadedState)()
    if (withStorage && storageKey === store.$id) {
      const toObject = onLoadToObject(store)
      store.$subscribe(() => {
        storedState.value = toObject()
      })
    }
    provide(Store, store)
  }

  return store
}
