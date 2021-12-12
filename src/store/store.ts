import useState from './state'
import useActions from './actions'
import useGetters from './getters'
import { FlowExportObject, FlowHooksOn, FlowOptions, FlowState, GraphEdge, GraphNode, Store } from '~/types'
import { isEdge, isNode, onLoadToObject } from '~/utils'

const useFlowStore = (preloadedState: FlowState): Store => {
  const state = reactive(useState(preloadedState))
  const getters = useGetters(state)
  const actions = useActions(state, getters)
  const hooksOn: FlowHooksOn = <any>{}
  Object.entries(state.hooks).forEach(([n, h]) => {
    const name = `On${n.charAt(0).toUpperCase() + n.slice(1)}`
    hooksOn[<keyof FlowHooksOn>name] = h.on as any
  })
  actions.setState(preloadedState)
  return {
    state,
    hooksOn,
    ...toRefs(state),
    ...getters,
    ...actions,
  }
}

export default (id: string, options?: FlowOptions) => {
  const withStorage = options?.storageKey ?? false
  let storedState = ref<FlowExportObject>()
  const storageKey = id ?? options?.id
  const preloadedState = {
    ...(options as FlowState),
  }
  if (withStorage) {
    storedState = useStorage<FlowExportObject>(storageKey, { edges: [], nodes: [], position: [0, 0], zoom: 0 })
    if (storedState.value) {
      preloadedState.nodes = (
        storedState.value.nodes
          ? storedState.value.nodes
          : options?.nodes
          ? options.nodes
          : options?.elements
          ? options?.elements.filter((el) => isNode(el))
          : []
      ) as GraphNode[]
      preloadedState.edges = (
        storedState.value.edges
          ? storedState.value.edges
          : options?.edges
          ? options.edges
          : options?.elements
          ? options?.elements.filter((el) => isEdge(el))
          : []
      ) as GraphEdge[]
      if (storedState.value.position && storedState.value.zoom)
        preloadedState.transform = [storedState.value.position[0], storedState.value.position[1], storedState.value.zoom]
    }
  }
  const store = useFlowStore(preloadedState)
  if (withStorage && storageKey === id) {
    const toObject = onLoadToObject(store.state)
    watch(
      store.state,
      () => {
        storedState.value = toObject()
      },
      { deep: true },
    )
  }
  return store
}
