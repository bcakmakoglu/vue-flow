import { computed, inject, ref } from 'vue'
import type { GraphNode, Node } from '../types'
import { ErrorCode, VueFlowError, getConnectedEdges } from '../utils'
import { NodeRef } from '../context'
import { useVueFlow } from './useVueFlow'
import { useNodeId } from './useNodeId'

/**
 * Composable that provides access to a node object, parent node object, connected edges and it's dom element
 *
 * If no node id is provided, the node id is injected from context
 *
 * If you do not provide an id, this composable has to be called in a child of your custom node component, or it will throw
 *
 * @public
 * @param id - The id of the node to access
 * @returns the node id, the node (a `ComputedRef`), the node dom element, it's parent and connected edges
 */
export function useNode<NodeType extends Node = Node>(id?: string) {
  const nodeId = id ?? useNodeId() ?? ''
  const nodeEl = inject(NodeRef, ref(null))

  const { getInternalNode, edges, emits } = useVueFlow()

  // `node` is the enriched `InternalNode` (it carries `internals`/`measured`, which NodeWrapper + custom
  // nodes read) and a `computed` (not a one-time read) so it re-resolves whenever the store replaces this
  // node's lookup entry — required for the immutable re-adopt model where a changed node is a NEW object.
  const node = computed(() => getInternalNode(nodeId) as GraphNode<NodeType> | undefined)

  if (!node.value) {
    emits.error(new VueFlowError(ErrorCode.NODE_NOT_FOUND, nodeId))
  }

  return {
    id: nodeId,
    nodeEl,
    node,
    parentNode: computed(() => (node.value ? getInternalNode(node.value.parentId) : undefined)),
    connectedEdges: computed(() => (node.value ? getConnectedEdges([node.value], edges.value) : [])),
  }
}
