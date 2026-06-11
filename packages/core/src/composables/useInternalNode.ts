import { computed } from 'vue'
import type { InternalNode, Node } from '../types'
import { useVueFlow } from './useVueFlow'
import { useNodeId } from './useNodeId'

/**
 * Access the enriched {@link InternalNode} (store-computed `internals.{positionAbsolute, z, handleBounds}` +
 * authoritative `measured`) for an id, as a `computed` that re-resolves whenever the store re-adopts the node.
 *
 * Mirrors xyflow/react's `useInternalNode`. If no id is given it is read from node context (call inside a
 * custom node). Use {@link useNode} for the user-facing node + dom element + connected edges.
 *
 * @public
 * @param id - The id of the node to access (defaults to the node context id)
 */
export function useInternalNode<NodeType extends Node = Node>(id?: string) {
  const nodeId = id ?? useNodeId() ?? ''

  const { getInternalNode } = useVueFlow()

  return computed(() => getInternalNode(nodeId) as InternalNode<NodeType> | undefined)
}
