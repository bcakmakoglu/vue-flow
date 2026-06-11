import { computed } from 'vue'
import type { DeepReadonly } from 'vue'
import { getNodesInside, isEdgeVisible } from '@xyflow/system'
import type { ComputedGetters, Edge, GraphEdge, Node, NodeLookup, State } from '../types'
import { defaultEdgeTypes, defaultNodeTypes } from '../utils/defaultNodesEdges'

export function useGetters<NodeType extends Node = Node, EdgeType extends Edge = Edge>(
  state: State<NodeType, EdgeType>,
  nodeLookup: NodeLookup<NodeType>,
): ComputedGetters<NodeType, EdgeType> {
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
    getEdgeTypes,
    getNodeTypes,
    getEdges,
    getNodes,
    getSelectedNodes,
    getSelectedEdges,
  }
}
