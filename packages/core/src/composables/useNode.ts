import { computed, inject } from 'vue'
import { useVueFlow } from './useVueFlow'
import type { MaybeRef } from '@vueuse/core'
import type { GraphNode } from '~/types'
import { NodeId, NodeRef } from '~/context'
import { ErrorCode, VueFlowError, getConnectedEdges } from '~/utils'

/**
 * Access a node, it's parent (if one exists) and connected edges
 *
 * If no node id is provided, the node id is injected from context
 *
 * Meaning if you do not provide an id, this composable has to be called in a child of your custom node component, or it will throw
 */
export function useNode<T extends GraphNode = GraphNode>(
  id?: MaybeRef<string>,
) {
  const { findNode, edges, emits } = useVueFlow()

  const nodeIdInjection = inject(NodeId, '')

  const nodeId = computed(() => unref(id) ?? nodeIdInjection)

  const nodeRef = inject(NodeRef, null)

  const nodeEl = computed(() => unref(nodeRef) ?? document.querySelector(`[data-id="${nodeId.value}"]`))!

  const node = computed(() => findNode<T>(nodeId.value)!)

  // todo: use watcher or computed to throw
  if (!nodeId.value || nodeId.value === '') {
    throw new VueFlowError(`useNode - No node id provided and no injection could be found!`, 'useNode')
  } else if (!node.value) {
    emits.error(new VueFlowError(ErrorCode.NODE_NOT_FOUND, nodeId))
  }

  return {
    id: nodeId,
    nodeEl,
    node,
    parentNode: computed(() => findNode(node.parentNode)),
    connectedEdges: computed(() => getConnectedEdges([node], edges.value)),
  }
}
