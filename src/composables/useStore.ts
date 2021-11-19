import { FlowExportObject, FlowOptions } from '~/types'
import { useStateStore, initialState } from '~/store'
import { Store } from '~/context'
import { onLoadToObject } from '~/utils'

let id = 0
export default (options?: Partial<FlowOptions>) => {
  let store = inject(Store, null)

  if (!store) {
    const withStorage = options?.storageKey ?? false
    if (import.meta.env.DEV) console.warn('store context not found; creating default store')
    let storedState = ref<FlowExportObject>()
    const initial = initialState()
    const storageKey = typeof options?.storageKey === 'string' ? options.storageKey : options?.id ?? `vue-flow-${id++}`
    const preloadedState = {
      ...initial,
      ...options,
    }
    if (withStorage) {
      storedState = useStorage(storageKey, {} as FlowExportObject)
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
