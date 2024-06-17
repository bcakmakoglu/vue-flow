import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import { useVueFlow } from './useVueFlow'

/**
 * Hook for getting the visible node ids from the store.
 *
 * @internal
 * @param onlyRenderVisible
 * @returns array with visible node ids
 */
export function useVisibleNodeIds(onlyRenderVisible: MaybeRefOrGetter<boolean>) {
  const { getNodes } = useVueFlow()

  return computed(() => {
    if (toValue(onlyRenderVisible)) {
      return getNodes.value.map((node) => node.id)
    }

    return getNodes.value.map((node) => node.id)
  })
}
