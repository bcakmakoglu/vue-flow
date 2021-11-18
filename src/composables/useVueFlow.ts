import useHooks from './useHooks'
import useStore from './useStore'
import { EmitFunc } from '~/types'

export const initFlow = (emit: EmitFunc) => {
  const store = useStore()
  const hooks = useHooks(emit)

  return {
    store,
    hooks,
  }
}

export default () => useStore()
