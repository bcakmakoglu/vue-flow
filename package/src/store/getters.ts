import { defaultEdgeTypes, defaultNodeTypes } from './state'
import { State, GraphEdge, GraphNode, ComputedGetters } from '~/types'
import { getNodesInside, isEdgeVisible } from '~/utils'

export default (state: State): ComputedGetters => {
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
            state.transform,
            true,
          )
      : nodes ?? []
  })

  const getEdges = computed<GraphEdge[]>(() => {
    if (!state.onlyRenderVisibleElements)
      return state.edges.filter((e) => !e.hidden && e.targetNode && !e.targetNode.hidden && e.sourceNode && !e.sourceNode.hidden)
    else
      return state.edges.filter(
        (e) =>
          !e.hidden &&
          e.sourceNode.dimensions.width &&
          e.sourceNode.dimensions.height &&
          e.targetNode.dimensions.width &&
          e.targetNode.dimensions.height &&
          !e.targetNode.hidden &&
          !e.sourceNode.hidden &&
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
  })

  const getSelectedNodes: ComputedGetters['getSelectedNodes'] = computed(() => state.nodes.filter((n) => n.selected))
  const getSelectedEdges: ComputedGetters['getSelectedEdges'] = computed(() => state.edges.filter((e) => e.selected))
  const getSelectedElements: ComputedGetters['getSelectedElements'] = computed(() => [
    ...(getSelectedNodes.value ?? []),
    ...(getSelectedEdges.value ?? []),
  ])

  const nodeIds = computed(() => state.nodes.map((n) => n.id))
  const edgeIds = computed(() => state.edges.map((e) => e.id))
  const getNode: ComputedGetters['getNode'] = computed(() => (id: string) => state.nodes[nodeIds.value.indexOf(id)])
  const getEdge: ComputedGetters['getEdge'] = computed(() => (id: string) => state.edges[edgeIds.value.indexOf(id)])

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
