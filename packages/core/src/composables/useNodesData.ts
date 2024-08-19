import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import type { GraphNode, Node } from '../types'
import { warn } from '../utils'
import { useVueFlow } from './useVueFlow'

interface NodeData<NodeType extends Node = GraphNode> {
  id: string
  type: NodeType['type']
  data: NonNullable<NodeType['data']> | null
}

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
  const { getNode } = useVueFlow()

  return computed({
    get() {
      const nodeIds = toValue(_nodeIds)

      if (!Array.isArray(nodeIds)) {
        const node = getNode(nodeIds)

        if (node) {
          return {
            id: node.id,
            type: node.type,
            data: node.data ?? null,
          }
        }

        return null
      }

      const data: NodeData<Node>[] = []

      for (const nodeId of nodeIds) {
        const node = getNode(nodeId)

        if (node) {
          data.push({
            id: node.id,
            type: node.type,
            data: node.data ?? null,
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
