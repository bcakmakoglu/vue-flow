import { defaultEdgeTypes, defaultNodeTypes } from './state'
import { Getters, State, GraphEdge, GraphNode } from '~/types'
import { getNodesInside, isEdgeVisible } from '~/utils'

export default (state: State): Getters => {
  const getEdgeTypes = computed(() => {
    const edgeTypes: Record<string, any> = {
      ...defaultEdgeTypes,
    }
    const keys = Object.keys(edgeTypes)
    state.edges?.forEach((e) => e.type && !keys.includes(e.type) && (edgeTypes[e.type] = e.type))
    return edgeTypes
  })

  const getNodeTypes = computed(() => {
    const nodeTypes: Record<string, any> = {
      ...defaultNodeTypes,
    }
    const keys = Object.keys(nodeTypes)
    state.nodes?.forEach((n) => n.type && !keys.includes(n.type) && (nodeTypes[n.type] = n.type))
    return nodeTypes
  })

  const getNodes = computed<GraphNode[]>(() => {
    if (state.paneReady && state.dimensions.width && state.dimensions.height) {
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
    if (state.paneReady && state.dimensions.width && state.dimensions.height) {
      if (!state.onlyRenderVisibleElements) return state.edges.filter((e) => !e.hidden)
      else
        return state.edges.filter(
          (e) =>
            !e.hidden &&
            e.sourceNode.dimensions.width &&
            e.sourceNode.dimensions.height &&
            e.targetNode.dimensions.width &&
            e.targetNode.dimensions.height &&
            isEdgeVisible({
              sourcePos: e.sourceNode.computedPosition || { x: 0, y: 0 },
              targetPos: e.targetNode.computedPosition || { x: 0, y: 0 },
              sourceWidth: e.sourceNode.dimensions.width,
              sourceHeight: e.sourceNode.dimensions.height,
              targetWidth: e.targetNode.dimensions.width,
              targetHeight: e.targetNode.dimensions.height,
              width: state.dimensions.width,
              height: state.dimensions.height,
              transform: state.transform,
            }),
        )
    }
    return []
  })

  const getSelectedNodes: Getters['getSelectedNodes'] = computed(() => state.nodes.filter((n) => n.selected))
  const getSelectedEdges: Getters['getSelectedEdges'] = computed(() => state.edges.filter((e) => e.selected))
  const getSelectedElements: Getters['getSelectedElements'] = computed(() => [
    ...(getSelectedNodes.value ?? []),
    ...(getSelectedEdges.value ?? []),
  ])

  const nodeIds = computed(() => state.nodes.map((n) => n.id))
  const edgeIds = computed(() => state.edges.map((e) => e.id))
  const getNode: Getters['getNode'] = computed(() => (id: string) => state.nodes[nodeIds.value.indexOf(id)])
  const getEdge: Getters['getEdge'] = computed(() => (id: string) => state.edges[edgeIds.value.indexOf(id)])

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
