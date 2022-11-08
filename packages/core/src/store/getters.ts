import { defaultEdgeTypes, defaultNodeTypes } from './state'
import type { ComputedGetters, GraphEdge, GraphNode, State } from '~/types'

export default (state: State): ComputedGetters => {
  const nodeIds = computed(() => state.nodes.map((n) => n.id))
  const edgeIds = computed(() => state.edges.map((e) => e.id))

  const getNode: ComputedGetters['getNode'] = computed(() => (id: string) => {
    if (state.nodes && !nodeIds.value.length) return state.nodes.find((node) => node.id === id)
    return state.nodes[nodeIds.value.indexOf(id)]
  })

  const getEdge: ComputedGetters['getEdge'] = computed(() => (id: string) => {
    if (state.edges && !edgeIds.value.length) return state.edges.find((edge) => edge.id === id)
    return state.edges[edgeIds.value.indexOf(id)]
  })

  const getEdgeTypes = computed(() => {
    const edgeTypes: Record<string, any> = {
      ...defaultEdgeTypes,
      ...state.edgeTypes,
    }
    const keys = Object.keys(edgeTypes)
    state.edges?.forEach((e) => e.type && !keys.includes(e.type) && (edgeTypes[e.type] = e.type))
    return edgeTypes
  })

  const getNodeTypes = computed(() => {
    const nodeTypes: Record<string, any> = {
      ...defaultNodeTypes,
      ...state.nodeTypes,
    }
    const keys = Object.keys(nodeTypes)
    state.nodes?.forEach((n) => n.type && !keys.includes(n.type) && (nodeTypes[n.type] = n.type))
    return nodeTypes
  })

  const getNodes = computed<GraphNode[]>(() => {
    const nodes = state.nodes.filter((n) => !n.hidden)

    if (!state.onlyRenderVisibleElements) return nodes

    return (
      getNodesInside(
        nodes,
        {
          x: 0,
          y: 0,
          width: state.dimensions.width,
          height: state.dimensions.height,
        },
        state.viewport,
        true,
      ) || []
    )
  })

  const edgeHidden = (e: GraphEdge) => {
    const source = e.sourceNode ?? getNode.value(e.source)
    const target = e.targetNode ?? getNode.value(e.target)

    if (!source || !target) {
      state.edges = state.edges.filter((edge) => edge.id !== e.id)

      warn(`Orphaned edge ${e.id} removed.`)
      return
    }

    return !e.hidden && !target.hidden && !source.hidden
  }

  const getEdges = computed<GraphEdge[]>(() => state.edges.filter(edgeHidden))

  const getElements: ComputedGetters['getElements'] = computed(() => [...getNodes.value, ...getEdges.value])

  const getSelectedNodes: ComputedGetters['getSelectedNodes'] = computed(() => state.nodes.filter((n) => n.selected))

  const getSelectedEdges: ComputedGetters['getSelectedEdges'] = computed(() => state.edges.filter((e) => e.selected))

  const getSelectedElements: ComputedGetters['getSelectedElements'] = computed(() => [
    ...(getSelectedNodes.value ?? []),
    ...(getSelectedEdges.value ?? []),
  ])

  return {
    getNode,
    getEdge,
    getElements,
    getEdgeTypes,
    getNodeTypes,
    getEdges,
    getNodes,
    getSelectedElements,
    getSelectedNodes,
    getSelectedEdges,
  }
}
