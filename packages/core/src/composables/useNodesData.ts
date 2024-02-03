import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { MaybeRefOrGetter } from '@vueuse/core'
import { toValue } from '@vueuse/core'
import type { GraphNode, Node } from '../types'
import { useVueFlow } from './useVueFlow'

type NodeData<NodeType extends Node = GraphNode> = NonNullable<NodeType['data']>

/**
 * Composable for receiving data of one or multiple nodes
 *
 * @public
 * @param nodeId - The id (or ids) of the node to get the data from
 * @param guard - Optional guard function to narrow down the node type
 * @returns An array of data objects
 */
export function useNodesData<NodeType extends Node = GraphNode>(
  nodeId: MaybeRefOrGetter<string>,
): ComputedRef<NodeData<NodeType> | null>
export function useNodesData<NodeType extends Node = GraphNode>(
  nodeIds: MaybeRefOrGetter<string[]>,
): ComputedRef<NodeData<NodeType>[]>
export function useNodesData<NodeType extends Node = GraphNode>(
  nodeIds: MaybeRefOrGetter<string[]>,
  guard: (node: Node) => node is NodeType,
): ComputedRef<NodeData<NodeType>[]>
export function useNodesData(_nodeIds: any): any {
  const { findNode } = useVueFlow()

  return computed({
    get() {
      const nodeIds = toValue(_nodeIds)

      if (!Array.isArray(nodeIds)) {
        return findNode(nodeIds)?.data || null
      }

      const data = []

      for (const nodeId of nodeIds) {
        const nodeData = findNode(nodeId)?.data

        if (nodeData) {
          data.push(nodeData)
        }
      }

      return data
    },
    set() {
      console.warn('You are trying to set node data via useNodesData. This is not supported.')
    },
  })
}
