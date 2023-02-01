import type { MaybeRef } from '@vueuse/core'
import { computed, inject } from 'vue'
import { useVueFlow } from './useVueFlow'
import type { GraphEdge } from '~/types'
import { ErrorCode, VueFlowError } from '~/utils'
import { EdgeId, EdgeRef } from '~/context'

/**
 * Access an edge
 *
 * If no edge id is provided, the edge id is injected from context
 *
 * Meaning if you do not provide an id, this composable has to be called in a child of your custom edge component, or it will throw
 */
export function useEdge<T extends GraphEdge = GraphEdge>(
  id?: MaybeRef<string>,
) {
  const { findEdge, emits } = useVueFlow()

  const edgeRef = inject(EdgeRef, null)

  const edgeIdInjection = inject(EdgeId, '')

  const edgeId = computed(() => unref(id) ?? edgeIdInjection)

  const edgeEl = computed(() => unref(edgeRef) ?? document.querySelector(`[data-id="${edgeId.value}"]`))

  const edge = computed(() => findEdge<T>(edgeId.value)!)

  // todo: use watcher to throw or throw in computed
  if (!edgeId.value || edgeId.value === '') {
    throw new VueFlowError(`No edge id provided and no injection could be found!`, 'useEdge')
  } else if (!edge.value) {
    emits.error(new VueFlowError(ErrorCode.EDGE_NOT_FOUND, edgeId))
  }

  return {
    id: edgeId,
    edge,
    edgeEl,
  }
}
