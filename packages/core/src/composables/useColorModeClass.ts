import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import type { ColorModeClass } from '@xyflow/system'
import type { Edge, Node, VueFlowStore } from '../types'
import { useVueFlow } from './useVueFlow'

/**
 * Resolves the `colorMode` prop to the `light`/`dark` class applied to the flow container, tracking
 * `prefers-color-scheme` reactively when `colorMode` is `system` (matching xyflow/react+svelte).
 *
 * Takes the store explicitly because it runs inside `<VueFlow>`'s own setup; defaults to `useVueFlow()`.
 *
 * @internal
 */
export function useColorModeClass<NodeType extends Node = Node, EdgeType extends Edge = Edge>(
  vfInstance: VueFlowStore<NodeType, EdgeType> = useVueFlow<NodeType, EdgeType>(),
): ComputedRef<ColorModeClass> {
  const { colorMode } = vfInstance

  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  return computed(() => {
    if (colorMode.value === 'system') {
      return prefersDark.value ? 'dark' : 'light'
    }

    return colorMode.value
  })
}
