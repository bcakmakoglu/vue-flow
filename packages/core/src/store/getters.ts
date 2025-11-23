import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { ComputedGetters, EdgeLookup, GraphEdge, GraphNode, Node, NodeLookup, State } from '../types'
import { getNodesInside, isEdgeVisible } from '../utils'
import { defaultEdgeTypes, defaultNodeTypes } from '../utils/defaultNodesEdges'

export function useGetters<NodeType extends Node = Node>(
  state: State<NodeType>,
  nodeLookup: ComputedRef<NodeLookup<NodeType>>,
  edgeLookup: ComputedRef<EdgeLookup>,
): ComputedGetters<NodeType> {
  /**
   * @deprecated will be removed in next major version; use findNode instead
   */
  const getNode: ComputedGetters<NodeType>['getNode'] = computed(() => (id) => nodeLookup.value.get(id))

  /**
   * @deprecated will be removed in next major version; use findEdge instead
   */
  const getEdge: ComputedGetters<NodeType>['getEdge'] = computed(() => (id) => edgeLookup.value.get(id))

  const getEdgeTypes: ComputedGetters<NodeType>['getEdgeTypes'] = computed(() => {
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

  const getNodeTypes: ComputedGetters<NodeType>['getNodeTypes'] = computed(() => {
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

  const getNodes: ComputedGetters<NodeType>['getNodes'] = computed(() => {
    if (state.onlyRenderVisibleElements) {
      return getNodesInside(
        state.nodes,
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

    return state.nodes
  })

  const getEdges: ComputedGetters<NodeType>['getEdges'] = computed(() => {
    if (state.onlyRenderVisibleElements) {
      const visibleEdges: GraphEdge[] = []

      for (const edge of state.edges) {
        const source = nodeLookup.value.get(edge.source)!
        const target = nodeLookup.value.get(edge.target)!

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

    return state.edges
  })

  const getSelectedNodes: ComputedGetters<NodeType>['getSelectedNodes'] = computed(() => {
    const selectedNodes: GraphNode<NodeType>[] = []
    for (const node of state.nodes) {
      if (node.selected) {
        selectedNodes.push(node)
      }
    }

    return selectedNodes
  })

  const getSelectedEdges: ComputedGetters<NodeType>['getSelectedEdges'] = computed(() => {
    const selectedEdges: GraphEdge[] = []
    for (const edge of state.edges) {
      if (edge.selected) {
        selectedEdges.push(edge)
      }
    }

    return selectedEdges
  })

  return {
    getNode,
    getEdge,
    getEdgeTypes,
    getNodeTypes,
    getEdges,
    getNodes,
    getSelectedNodes,
    getSelectedEdges,
  }
}
