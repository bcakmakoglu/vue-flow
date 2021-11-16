import { FlowOptions } from '~/types'
import { useFlowStore, initialState } from '~/store'
import { Store } from '~/context'

export default (options?: Partial<FlowOptions>) => {
  let store = inject(Store)!
  if (!store) {
    if (import.meta.env.DEV) console.warn('store context not found; creating default store')
    store = useFlowStore({
      ...initialState(),
      ...options,
    })()
    provide(Store, store)
  }

  return store
}
