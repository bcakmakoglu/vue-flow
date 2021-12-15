import useState from './state'
import useActions from './actions'
import useGetters from './getters'
import { FlowHooksOn, State, Store } from '~/types'

export default (preloadedState: State): Store => {
  const state = reactive(useState(preloadedState))
  const getters = useGetters(state)
  const actions = useActions(state, getters)
  const hooksOn: FlowHooksOn = <any>{}
  Object.entries(state.hooks).forEach(([n, h]) => {
    const name = `on${n.charAt(0).toUpperCase() + n.slice(1)}`
    hooksOn[<keyof FlowHooksOn>name] = h.on as any
  })
  actions.setState(state)

  return {
    state,
    actions,
    getters,
    hooksOn,
    ...toRefs(state),
    ...getters,
    ...actions,
  }
}
