import { watch } from 'vue'
import type { Edge, Node, VueFlowStore } from '../types'
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
  vfInstance: VueFlowStore<NodeType, EdgeType> = useVueFlow<NodeType, EdgeType>(),
) {
  watch(
    () => vfInstance.viewportHelper.value.viewportInitialized,
    (isInitialized) => {
      if (isInitialized) {
        setTimeout(() => {
          // `init` hook payload is the non-generic `VueFlowStore`; erase the `NodeType` generic here.
          vfInstance.emits.init(vfInstance)
        }, 1)
      }
    },
  )
}
