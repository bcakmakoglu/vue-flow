import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import type { GraphNode, Node } from '../types'
import { warn } from '../utils'
import { useVueFlow } from './useVueFlow'

type NodeData<NodeType extends Node = GraphNode> = NonNullable<NodeType['data']> & { id: string; type: NodeType['type'] }

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
        const node = findNode(nodeIds)

        if (node) {
          return {
            id: node.id,
            type: node.type,
            data: node.data,
          }
        }

        return null
      }

      const data = []

      for (const nodeId of nodeIds) {
        const node = findNode(nodeId)

        if (node) {
          data.push({
            id: node.id,
            type: node.type,
            data: node.data,
          })
        }
      }

      return data
    },
    set() {
      // noop
      warn('You are trying to set node data via useNodesData. This is not supported.')
    },
  })
}
