import useStore from './useStore'
import useHooks from './useHooks'
import { EmitFunc, FlowStore } from '~/types'

export const initFlow = (emit: EmitFunc, id?: string): FlowStore => {
  const store = useStore({ id })
  useHooks(store, emit)
  return store
}

export default useStore
