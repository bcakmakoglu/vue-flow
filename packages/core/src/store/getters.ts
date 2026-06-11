import { computed } from 'vue'
import type { DeepReadonly } from 'vue'
import type { ComputedGetters, Edge, EdgeLookup, GraphEdge, Node, NodeLookup, State } from '../types'
import { getNodesInside, isEdgeVisible } from '../utils'
import { defaultEdgeTypes, defaultNodeTypes } from '../utils/defaultNodesEdges'

export function useGetters<NodeType extends Node = Node, EdgeType extends Edge = Edge>(
  state: State<NodeType, EdgeType>,
  nodeLookup: NodeLookup<NodeType>,
  edgeLookup: EdgeLookup<EdgeType>,
): ComputedGetters<NodeType, EdgeType> {
  /**
   * @deprecated will be removed in next major version; use findNode instead
   */
  const getNode: ComputedGetters<NodeType>['getNode'] = computed(
    () => (id) => nodeLookup.get(id)?.internals.userNode as DeepReadonly<NodeType> | undefined,
  )

  /**
   * @deprecated will be removed in next major version; use findEdge instead
   */
  const getEdge: ComputedGetters<NodeType, EdgeType>['getEdge'] = computed(() => (id) => edgeLookup.get(id))

  const getEdgeTypes: ComputedGetters<NodeType, EdgeType>['getEdgeTypes'] = computed(() => {
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
      // `getNodesInside` works on the InternalNode lookup; surface the user nodes (the public contract)
      return getNodesInside(
        nodeLookup,
        {
          x: 0,
          y: 0,
          width: state.dimensions.width,
          height: state.dimensions.height,
        },
        [state.viewport.x, state.viewport.y, state.viewport.zoom],
        true,
      ).map((node) => node.internals.userNode) as unknown as DeepReadonly<NodeType[]>
    }

    return state.nodes as unknown as DeepReadonly<NodeType[]>
  })

  const getEdges: ComputedGetters<NodeType, EdgeType>['getEdges'] = computed(() => {
    if (state.onlyRenderVisibleElements) {
      const visibleEdges: GraphEdge<EdgeType>[] = []

      for (const edge of state.edges) {
        const source = nodeLookup.get(edge.source)!
        const target = nodeLookup.get(edge.target)!

        if (
          isEdgeVisible({
            sourceNode: source,
            targetNode: target,
            width: state.dimensions.width,
            height: state.dimensions.height,
            transform: [state.viewport.x, state.viewport.y, state.viewport.zoom],
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
    const selectedNodes: NodeType[] = []
    for (const node of state.nodes) {
      if (node.selected) {
        selectedNodes.push(node)
      }
    }

    return selectedNodes as unknown as DeepReadonly<NodeType[]>
  })

  const getSelectedEdges: ComputedGetters<NodeType, EdgeType>['getSelectedEdges'] = computed(() => {
    const selectedEdges: GraphEdge<EdgeType>[] = []
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
