import { computed } from 'vue'
import { useVueFlow } from './useVueFlow'

export interface UseNodesInitializedOptions {
  includeHiddenNodes?: boolean
}

/**
 * Composable for getting the initialized state of all nodes.
 *
 * When a new node is added to the graph, it is not immediately initialized.
 * That's because the node's bounds are not yet known.
 * This composable will return false and then true when all nodes are initialized, i.e. when their bounds are known.
 *
 * @public
 * @param options - Options
 * @returns boolean indicating whether all nodes are initialized
 */
export function useNodesInitialized(options: UseNodesInitializedOptions = { includeHiddenNodes: false }) {
  const { nodes } = useVueFlow()

  return computed(() => {
    if (nodes.value.length === 0) {
      return false
    }

    for (const node of nodes.value) {
      if (options.includeHiddenNodes || !node.hidden) {
        if (node?.handleBounds === undefined) {
          return false
        }
      }
    }

    return true
  })
}
