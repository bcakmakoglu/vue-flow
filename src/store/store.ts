import useState from './state'
import useActions from './actions'
import useGetters from './getters'
import { FlowState, FlowStore } from '~/types'

export default (id: string, preloadedState: FlowState): FlowStore => {
  const state = reactive(useState(preloadedState))
  const getters = useGetters(state)
  const actions = useActions(state, getters)
  return {
    state,
    ...toRefs(state),
    ...getters,
    ...actions,
  }
}
