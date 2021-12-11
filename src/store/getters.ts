import { FlowGetters, FlowState, GraphEdge, GraphNode } from '~/types'
import { defaultEdgeTypes, defaultNodeTypes, getNodesInside, isGraphNode } from '~/utils'

export default (state: FlowState): FlowGetters => {
  const getEdgeTypes = computed(() => {
    const edgeTypes: Record<string, any> = {
      ...defaultEdgeTypes,
    }
    state.edgeTypes?.forEach((n) => (edgeTypes[n] = n))
    return edgeTypes
  })

  const getNodeTypes = computed(() => {
    const nodeTypes: Record<string, any> = {
      ...defaultNodeTypes,
    }
    state.nodeTypes?.forEach((n) => (nodeTypes[n] = n))
    return nodeTypes
  })

  const getNodes = computed<GraphNode[]>(() => {
    if (state.isReady && state.dimensions.width && state.dimensions.height) {
      const nodes = state.nodes.filter((n) => !n.hidden)
      return state.onlyRenderVisibleElements
        ? nodes &&
            getNodesInside(
              nodes,
              {
                x: 0,
                y: 0,
                width: state.dimensions.width,
                height: state.dimensions.height,
              },
              state.transform,
              true,
            )
        : nodes ?? []
    }
    return []
  })

  const getEdges = computed<GraphEdge[]>(() => {
    if (state.isReady && state.dimensions.width && state.dimensions.height) {
      return state.edges.filter((e) => !e.hidden)
    }
    return []
  })

  const getSelectedNodes = computed<GraphNode[]>(() => state.selectedElements?.filter(isGraphNode) ?? [])

  const getNode: FlowGetters['getNode'] = computed(() => (id: string) => state.nodes.find((node) => node.id === id))
  const getEdge: FlowGetters['getEdge'] = computed(() => (id: string) => state.edges.find((edge) => edge.id === id))

  return {
    getNode,
    getEdge,
    getEdgeTypes,
    getNodeTypes,
    getEdges,
    getNodes,
    getSelectedNodes,
  }
}
