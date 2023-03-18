import type { MaybeRef } from '@vueuse/core'
import { computed, inject } from 'vue'
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
export function useEdge<T extends GraphEdge = GraphEdge>(id?: MaybeRef<string>) {
  const { findEdge, emits } = useVueFlow()

  const edgeRef = inject(EdgeRef, null)

  const edgeIdInjection = inject(EdgeId, '')

  const edgeId = computed(() => {
    const nextId = unref(id) ?? edgeIdInjection

    if (!nextId || nextId === '') {
      throw new VueFlowError(`No edge id provided and no injection could be found!`, 'useEdge')
    }

    return nextId
  })

  const edgeEl = computed(() => unref(edgeRef) ?? document.querySelector(`[data-id="${edgeId.value}"]`))

  const edge = computed(() => {
    const nextEdge = findEdge<T>(edgeId.value)

    if (!nextEdge) {
      throw new VueFlowError(`Edge with id ${edgeId.value} not found!`, 'useEdge')
    }

    return nextEdge
  })

  return {
    id: edgeId,
    edge,
    edgeEl,
  }
}
