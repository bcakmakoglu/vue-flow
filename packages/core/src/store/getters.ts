import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { NodeBase } from '@xyflow/system'
import { getNodesInside, isEdgeVisible } from '@xyflow/system'
import { defaultEdgeTypes, defaultNodeTypes } from './state'
import type { ComputedGetters, GraphEdge, GraphNode, State } from '~/types'
import { ErrorCode, VueFlowError } from '~/utils'

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

    state.edges?.forEach((e) => e.type && !keys.includes(e.type) && (edgeTypes[e.type] = e.type))

    return edgeTypes
  })

  const getNodeTypes: ComputedGetters['getNodeTypes'] = computed(() => {
    const nodeTypes: Record<string, any> = {
      ...defaultNodeTypes,
      ...state.nodeTypes,
    }

    const keys = Object.keys(nodeTypes)

    state.nodes?.forEach((n) => n.type && !keys.includes(n.type) && (nodeTypes[n.type] = n.type))

    return nodeTypes
  })

  const getNodes: ComputedGetters['getNodes'] = computed(() => {
    const nodes = state.nodes.filter((n) => !n.hidden)

    return (
      state.onlyRenderVisibleElements
        ? nodes &&
          getNodesInside(
            nodes as NodeBase[],
            {
              x: 0,
              y: 0,
              width: state.dimensions.width,
              height: state.dimensions.height,
            },
            [state.viewport.x, state.viewport.y, state.viewport.zoom],
            true,
          )
        : nodes ?? []
    ) as GraphNode[]
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
    if (!state.onlyRenderVisibleElements) {
      return state.edges.filter((edge) => edgeHidden(edge))
    }

    return state.edges.filter((e) => {
      const source = getNode.value(e.source)!
      const target = getNode.value(e.target)!

      return (
        edgeHidden(e, source, target) &&
        isEdgeVisible({
          sourceNode: source as NodeBase,
          targetNode: target as NodeBase,
          width: state.dimensions.width,
          height: state.dimensions.height,
          transform: [state.viewport.x, state.viewport.y, state.viewport.zoom],
        })
      )
    })
  })

  const getElements: ComputedGetters['getElements'] = computed(() => [...getNodes.value, ...getEdges.value])

  const getSelectedNodes: ComputedGetters['getSelectedNodes'] = computed(() => state.nodes.filter((n) => n.selected))

  const getSelectedEdges: ComputedGetters['getSelectedEdges'] = computed(() => state.edges.filter((e) => e.selected))

  const getSelectedElements: ComputedGetters['getSelectedElements'] = computed(() => [
    ...(getSelectedNodes.value ?? []),
    ...(getSelectedEdges.value ?? []),
  ])

  const getNodesInitialized: ComputedGetters['getNodesInitialized'] = computed(() =>
    getNodes.value.filter((n) => n.initialized && n.handleBounds !== undefined),
  )

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
