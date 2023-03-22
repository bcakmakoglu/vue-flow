import type { MaybeRefOrGetter } from '@vueuse/core'
import { computed, inject } from 'vue'
import { toValue } from '@vueuse/core'
import { useVueFlow } from './useVueFlow'
import type { GraphEdge } from '~/types'
import { ErrorCode, VueFlowError } from '~/utils'
import { EdgeId, EdgeRef } from '~/context'

/**
 * Get an edge with the given id
 *
 * If no edge id is provided, the edge id is injected from context,
 * meaning if you do not provide an id, this composable has to be called in a child of your custom edge component, or it will throw!
 *
 * @param id The id of the edge to get
 */
export function useEdge<T extends GraphEdge = GraphEdge>(id?: MaybeRefOrGetter<string>) {
  const { findEdge, emits } = useVueFlow()

  const edgeRef = inject(EdgeRef, null)

  const edgeIdInjection = inject(EdgeId, '')

  const edgeId = computed(() => {
    const nextId = toValue(id) ?? edgeIdInjection

    if (!nextId) {
      emits.error(new VueFlowError(ErrorCode.EDGE_NOT_FOUND, nextId))
    }

    return nextId
  })

  const edgeEl = computed(() => toValue(edgeRef) ?? document.querySelector(`[data-id="${edgeId.value}"]`))

  const edge = computed(() => findEdge<T>(edgeId.value)!)

  return {
    id: edgeId,
    edge,
    edgeEl,
  }
}
