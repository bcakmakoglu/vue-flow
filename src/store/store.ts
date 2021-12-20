import useState from './state'
import useActions from './actions'
import useGetters from './getters'
import { FlowHooksOn, FlowOptions, Store } from '~/types'

export default (preloadedState?: FlowOptions): Store => {
  const state = reactive(useState(preloadedState))
  const getters = useGetters(state)
  const actions = useActions(state, getters)
  const hooksOn: FlowHooksOn = <any>{}
  Object.entries(state.hooks).forEach(([n, h]) => {
    const name = `on${n.charAt(0).toUpperCase() + n.slice(1)}`
    hooksOn[<keyof FlowHooksOn>name] = h.on as any
  })
  actions.setState(state)
  if (preloadedState) {
    if (preloadedState.modelValue) actions.setElements(preloadedState.modelValue)
    if (preloadedState.nodes) actions.setNodes(preloadedState.nodes)
    if (preloadedState.edges) actions.setEdges(preloadedState.edges)
  }

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
