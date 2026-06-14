import { computed } from 'vue';
import { storeToRefs } from './storeToRefs';
import { useStore } from './useStore';
import { useVueFlow } from './useVueFlow';

export interface UseNodesInitializedOptions {
  includeHiddenNodes?: boolean;
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
  const { getInternalNode } = useVueFlow();
  const { nodes } = storeToRefs(useStore());

  return computed(() => {
    if (nodes.value.length === 0) {
      return false;
    }

    for (const node of nodes.value) {
      if (options.includeHiddenNodes || !node.hidden) {
        // `nodes` are user `Node`s; the measured/handleBounds live on the InternalNode. A node is
        // initialized once it has been measured (handleBounds set + non-zero/defined dimensions).
        const internalNode = getInternalNode(node.id);
        if (
          !internalNode
          || internalNode.internals.handleBounds === undefined
          || !internalNode.measured?.width
          || !internalNode.measured?.height
        ) {
          return false;
        }
      }
    }

    return true;
  });
}
