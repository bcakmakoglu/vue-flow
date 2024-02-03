import { computed } from 'vue'
import { useVueFlow } from './useVueFlow'

export interface UseNodesInitializedOptions {
  includeHiddenNodes?: boolean
}

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
