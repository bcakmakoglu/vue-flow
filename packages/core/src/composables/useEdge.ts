import { inject, ref } from 'vue'
import type { ElementData } from '../types'
import { ErrorCode, VueFlowError } from '../utils'
import { EdgeId, EdgeRef } from '../context'
import { useVueFlow } from './useVueFlow'

/**
 * Composable that provides access to an edge object and it's dom element
 *
 * If no edge id is provided, the edge id is injected from context
 *
 * If you do not provide an id, this composable has to be called in a child of your custom edge component, or it will throw
 *
 * @public
 * @param id - The id of the edge to access
 * @returns the edge id, the edge and the edge dom element
 */
export function useEdge<Data = ElementData>(id?: string) {
  const edgeId = id ?? inject(EdgeId, '')
  const edgeEl = inject(EdgeRef, ref(null))

  const { getEdge, emits } = useVueFlow()

  const edge = getEdge<Data>(edgeId)!

  if (!edge) {
    emits.error(new VueFlowError(ErrorCode.EDGE_NOT_FOUND, edgeId))
  }

  return {
    id: edgeId,
    edge,
    edgeEl,
  }
}
