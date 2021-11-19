import useStore from './useStore'
import useHooks from './useHooks'
import { EmitFunc, FlowOptions, FlowStore } from '~/types'

export const initFlow = (emit: EmitFunc, store = useStore()) => {
  useHooks(store, emit)
  return store
}

export default (options?: Partial<FlowOptions>): FlowStore => useStore(options)
