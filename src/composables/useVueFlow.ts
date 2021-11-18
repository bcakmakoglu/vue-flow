import useHooks from './useHooks'
import useStore from './useStore'
import { EmitFunc, FlowOptions, FlowStore } from '~/types'

export const initFlow = (emit: EmitFunc, options: Partial<FlowOptions>) => {
  const store = useStore(options)
  const hooks = useHooks(store, emit)

  return {
    store,
    hooks,
  }
}

export default (options?: Partial<FlowOptions>): FlowStore => useStore(options)
