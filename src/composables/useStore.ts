import { FlowExportObject, FlowOptions } from '~/types'
import { useFlowStore, initialState } from '~/store'
import { Store } from '~/context'
import { onLoadToObject } from '~/utils'

let id = 0
export default (options?: Partial<FlowOptions>) => {
  let store = inject(Store)!
  const withStorage = options?.storageKey ?? false

  if (!store) {
    if (import.meta.env.DEV) console.warn('store context not found; creating default store')
    let storedState = ref<FlowExportObject>()
    const initial = initialState()
    const storageKey = typeof options?.storageKey === 'string' ? options.storageKey : options?.id ?? `vue-flow-${id++}`
    if (withStorage) {
      storedState = useStorage(storageKey, {} as FlowExportObject)
      if (storedState.value) {
        initial.elements = storedState.value.elements ?? options?.elements ?? []
        if (storedState.value.position && storedState.value.zoom)
          initial.transform = [storedState.value.position[0], storedState.value.position[1], storedState.value.zoom]
      }
    }
    const preloadedState = {
      ...initial,
      ...options,
    }
    store = useFlowStore(storageKey, preloadedState)()
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
