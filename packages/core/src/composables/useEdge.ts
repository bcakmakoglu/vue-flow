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

  // todo: throw in computed instead
  watch(
    [() => edge.value?.id, edgeId],
    ([nextEdge, nextId]) => {
      if (!nextId || nextId === '') {
        throw new VueFlowError('useEdge', `No node id provided and no injection could be found!`)
      }

      nextTick(() => {
        if (!nextEdge) {
          throw new VueFlowError('useEdge', `Node with id ${edgeId.value} not found!`)
        }
      })
    },
    { immediate: true, flush: 'post' },
  )

  return {
    id: edgeId,
    edge,
    edgeEl,
  }
}
