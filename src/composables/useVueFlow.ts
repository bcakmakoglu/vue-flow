import useStore from './useStore'
import useHooks from './useHooks'
import { EmitFunc, FlowOptions, FlowStore } from '~/types'

export const initFlow = (emit: EmitFunc, key?: string, store = useStore(undefined, key)) => {
  useHooks(store, emit)
  return store
}

export default (options?: Partial<FlowOptions>): FlowStore => useStore(options)
