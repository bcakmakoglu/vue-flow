import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { ComputedGetters, GraphEdge, GraphNode, State } from '../types'
import { ErrorCode, VueFlowError, getNodesInside, isEdgeVisible } from '../utils'
import { defaultEdgeTypes, defaultNodeTypes } from '../utils/defaultNodesEdges'

export function useGetters(state: State, nodeIds: ComputedRef<string[]>, edgeIds: ComputedRef<string[]>): ComputedGetters {
  /**
   * @deprecated will be removed in next major version; use findNode instead
   */
  const getNode: ComputedGetters['getNode'] = computed(() => (id: string) => {
    if (state.nodes && !nodeIds.value.length) {
      return state.nodes.find((node) => node.id === id)
    }

    return state.nodes[nodeIds.value.indexOf(id)]
  })

  /**
   * @deprecated will be removed in next major version; use findEdge instead
   */
  const getEdge: ComputedGetters['getEdge'] = computed(() => (id: string) => {
    if (state.edges && !edgeIds.value.length) {
      return state.edges.find((edge) => edge.id === id)
    }

    return state.edges[edgeIds.value.indexOf(id)]
  })

  const getEdgeTypes: ComputedGetters['getEdgeTypes'] = computed(() => {
    const edgeTypes: Record<string, any> = {
      ...defaultEdgeTypes,
      ...state.edgeTypes,
    }

    const keys = Object.keys(edgeTypes)

    for (const e of state.edges) {
      e.type && !keys.includes(e.type) && (edgeTypes[e.type] = e.type)
    }

    return edgeTypes
  })

  const getNodeTypes: ComputedGetters['getNodeTypes'] = computed(() => {
    const nodeTypes: Record<string, any> = {
      ...defaultNodeTypes,
      ...state.nodeTypes,
    }

    const keys = Object.keys(nodeTypes)

    for (const n of state.nodes) {
      n.type && !keys.includes(n.type) && (nodeTypes[n.type] = n.type)
    }

    return nodeTypes
  })

  const getNodes: ComputedGetters['getNodes'] = computed(() => {
    const nodes: GraphNode[] = []

    for (const node of state.nodes) {
      if (!node.hidden) {
        nodes.push(node)
      }
    }

    if (state.onlyRenderVisibleElements) {
      return getNodesInside(
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
    }

    return nodes
  })

  const edgeHidden = (e: GraphEdge, source?: GraphNode, target?: GraphNode) => {
    source = source ?? getNode.value(e.source)
    target = target ?? getNode.value(e.target)

    if (!source || !target) {
      state.hooks.error.trigger(new VueFlowError(ErrorCode.EDGE_ORPHANED, e.id))
      return
    }

    return !e.hidden && !target.hidden && !source.hidden
  }

  const getEdges: ComputedGetters['getEdges'] = computed(() => {
    const edges: GraphEdge[] = []

    for (const edge of state.edges) {
      if (!edgeHidden(edge)) {
        edges.push(edge)
      }
    }

    if (state.onlyRenderVisibleElements) {
      const visibleEdges: GraphEdge[] = []

      for (const edge of edges) {
        const source = getNode.value(edge.source)!
        const target = getNode.value(edge.target)!

        if (
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
        ) {
          visibleEdges.push(edge)
        }
      }

      return visibleEdges
    }

    return edges
  })

  const getElements: ComputedGetters['getElements'] = computed(() => [...getNodes.value, ...getEdges.value])

  const getSelectedNodes: ComputedGetters['getSelectedNodes'] = computed(() => {
    const selectedNodes: GraphNode[] = []
    for (const node of state.nodes) {
      if (node.selected) {
        selectedNodes.push(node)
      }
    }

    return selectedNodes
  })

  const getSelectedEdges: ComputedGetters['getSelectedEdges'] = computed(() => {
    const selectedEdges: GraphEdge[] = []
    for (const edge of state.edges) {
      if (edge.selected) {
        selectedEdges.push(edge)
      }
    }

    return selectedEdges
  })

  const getSelectedElements: ComputedGetters['getSelectedElements'] = computed(() => [
    ...getSelectedNodes.value,
    ...getSelectedEdges.value,
  ])

  /**
   * @deprecated will be removed in next major version; use `useNodesInitialized` instead
   */
  const getNodesInitialized: ComputedGetters['getNodesInitialized'] = computed(() => {
    const initializedNodes: GraphNode[] = []

    for (const node of state.nodes) {
      if (node.initialized && node.handleBounds !== undefined) {
        initializedNodes.push(node)
      }
    }

    return initializedNodes
  })

  /**
   * @deprecated will be removed in next major version; use `useNodesInitialized` instead
   */
  const areNodesInitialized: ComputedGetters['areNodesInitialized'] = computed(
    () => getNodes.value.length > 0 && getNodesInitialized.value.length === getNodes.value.length,
  )

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
    getNodesInitialized,
    areNodesInitialized,
  }
}
