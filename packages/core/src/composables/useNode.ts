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

  const parentNode = computed(() => findNode(node.value?.parentNode))

  const connectedEdges = computed(() => (node.value ? getConnectedEdges([node.value], edges.value) : []))

  // todo: throw in computed
  watch(
    [() => node.value?.id, nodeId],
    ([nextNode, nextId]) => {
      if (!nextId || nextId === '') {
        throw new VueFlowError(`No node id provided and no injection could be found!`, 'useNode')
      }

      nextTick(() => {
        if (!nextNode) {
          throw new VueFlowError(`Node with id ${nodeId.value} not found!`, 'useNode')
        }
      })
    },
    { immediate: true, flush: 'post' },
  )

  return {
    id: nodeId,
    nodeEl,
    node,
    parentNode,
    connectedEdges,
  }
}
