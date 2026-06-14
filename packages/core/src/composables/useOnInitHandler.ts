import { watch } from 'vue'
import type { Edge, Node } from '../types'
import { useVueFlow } from './useVueFlow'

/**
 * Composable that handles the initialization of the viewport.
 *
 * Takes the store explicitly because it runs inside `<VueFlow>`'s own setup, where `inject` can't see
 * `<VueFlow>`'s own `provide` (provide reaches descendants only). Defaults to `useVueFlow()` for
 * descendant callers.
 *
 * @internal
 */
export function useOnInitHandler<NodeType extends Node = Node, EdgeType extends Edge = Edge>(
  vfInstance = useVueFlow<NodeType, EdgeType>(),
) {
  watch(
    () => vfInstance.viewportHelper.value.viewportInitialized,
    (isInitialized) => {
      if (isInitialized) {
        setTimeout(() => {
          vfInstance.emits.init(vfInstance)
        }, 1)
      }
    },
  )
}
