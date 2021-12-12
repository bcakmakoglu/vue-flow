import { defaultEdgeTypes, defaultNodeTypes } from './state'
import { FlowGetters, FlowState, GraphEdge, GraphNode } from '~/types'
import { getNodesInside, isEdgeVisible } from '~/utils'

export default (state: FlowState): FlowGetters => {
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
      if (!state.onlyRenderVisibleElements) return state.edges
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

  const getSelectedElements: FlowGetters['getSelectedElements'] = computed(() => [
    ...(state.selectedNodes ?? []),
    ...(state.selectedEdges ?? []),
  ])
  const getSelectedNodes: FlowGetters['getSelectedNodes'] = computed(() => state.nodes.filter((n) => n.selected))
  const getSelectedEdges: FlowGetters['getSelectedEdges'] = computed(() => state.edges.filter((e) => e.selected))

  const nodeIds = computed(() => state.nodes.map((n) => n.id))
  const edgeIds = computed(() => state.edges.map((e) => e.id))
  const getNode: FlowGetters['getNode'] = computed(() => (id: string) => state.nodes[nodeIds.value.indexOf(id)])
  const getEdge: FlowGetters['getEdge'] = computed(() => (id: string) => state.edges[edgeIds.value.indexOf(id)])

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
