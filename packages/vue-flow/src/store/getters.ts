import { defaultEdgeTypes, defaultNodeTypes } from './state'
import type { ComputedGetters, GraphEdge, GraphNode, State } from '~/types'
import { getNodesInside, isEdgeVisible } from '~/utils'

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
            state.viewport,
            true,
          )
      : nodes ?? []
  })

  const edgeHidden = (e: GraphEdge, source?: GraphNode, target?: GraphNode) => {
    source = source ?? getNode.value(e.source)
    target = target ?? getNode.value(e.target)

    if (!source || !target) {
      console.warn(`[vue-flow]: Orphaned edge ${e.id} will be removed.`)
      state.edges.splice(state.edges.indexOf(e), 1)
      return true
    }

    return (
      !e.hidden &&
      target &&
      !target.hidden &&
      source &&
      !source.hidden &&
      source.dimensions.width &&
      source.dimensions.height &&
      target.dimensions.width &&
      target.dimensions.height
    )
  }
  const getEdges = computed<GraphEdge[]>(() => {
    if (!state.onlyRenderVisibleElements) return state.edges.filter((edge) => edgeHidden(edge))

    return state.edges.filter((e) => {
      const source = getNode.value(e.source)!
      const target = getNode.value(e.target)!

      return (
        edgeHidden(e, source, target) &&
        isEdgeVisible({
          sourcePos: source.computedPosition || { x: 0, y: 0 },
          targetPos: target.computedPosition || { x: 0, y: 0 },
          sourceWidth: source.dimensions.width,
          sourceHeight: source.dimensions.height,
          targetWidth: target.dimensions.width,
          targetHeight: target.dimensions.height,
          width: state.dimensions.width,
          height: state.dimensions.height,
          viewport: state.viewport,
        })
      )
    })
  })

  const getSelectedNodes: ComputedGetters['getSelectedNodes'] = computed(() => state.nodes.filter((n) => n.selected))
  const getSelectedEdges: ComputedGetters['getSelectedEdges'] = computed(() => state.edges.filter((e) => e.selected))
  const getSelectedElements: ComputedGetters['getSelectedElements'] = computed(() => [
    ...(getSelectedNodes.value ?? []),
    ...(getSelectedEdges.value ?? []),
  ])

  return {
    getNode,
    getEdge,
    getEdgeTypes,
    getNodeTypes,
    getEdges,
    getNodes,
    getSelectedElements,
    getSelectedNodes,
    getSelectedEdges,
  }
}
