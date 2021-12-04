import useState from './state'
import useActions from './actions'
import useGetters from './getters'
import { FlowState, Store } from '~/types'

export default (id: string, preloadedState: FlowState): Store => {
  const state = reactive(useState(preloadedState))
  const getters = useGetters(state)
  const actions = useActions(state, getters)
  return {
    id,
    state,
    ...toRefs(state),
    ...getters,
    ...actions,
  }
}
