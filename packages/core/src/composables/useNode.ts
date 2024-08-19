import { computed, inject, ref } from 'vue'
import type { ElementData } from '../types'
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
 * @returns the node id, the node, the node dom element, it's parent and connected edges
 */
export function useNode<Data = ElementData>(id?: string) {
  const nodeId = id ?? useNodeId() ?? ''
  const nodeEl = inject(NodeRef, ref(null))

  const { getNode, edges, emits } = useVueFlow()

  const node = getNode<Data>(nodeId)!

  if (!node) {
    emits.error(new VueFlowError(ErrorCode.NODE_NOT_FOUND, nodeId))
  }

  return {
    id: nodeId,
    nodeEl,
    node,
    parentNode: computed(() => (node.parentNode ? getNode(node.parentNode) : undefined)),
    connectedEdges: computed(() => getConnectedEdges([node], edges.value)),
  }
}
