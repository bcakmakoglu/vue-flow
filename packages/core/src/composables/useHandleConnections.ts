import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, ref, toRef, toValue, watch } from 'vue'
import type { HandleConnection, HandleType } from '../types'
import { areConnectionMapsEqual, handleConnectionChange } from '../utils'
import { useNodeId } from './useNodeId'
import { useVueFlow } from './useVueFlow'

export interface UseHandleConnectionsParams {
  type: MaybeRefOrGetter<HandleType>
  id?: MaybeRefOrGetter<string | null>
  nodeId?: MaybeRefOrGetter<string | null>
  onConnect?: (connections: HandleConnection[]) => void
  onDisconnect?: (connections: HandleConnection[]) => void
}

/**
 * Composable that returns existing connections of a `<Handle />`.
 *
 * @deprecated use `useNodeConnections` instead
 * @public
 * @param params
 * @param params.type - handle type `source` or `target`
 * @param params.nodeId - node id - if not provided, the node id from the `useNodeId` (meaning, the context-based injection) is used
 * @param params.id - the handle id (this is required if the node has multiple handles of the same type)
 * @param params.onConnect - gets called when a connection is created
 * @param params.onDisconnect - gets called when a connection is removed
 *
 * @returns An array of connections
 */
export function useHandleConnections(params: UseHandleConnectionsParams): ComputedRef<HandleConnection[]> {
  const { type, id, nodeId, onConnect, onDisconnect } = params

  const { connectionLookup } = useVueFlow()

  const _nodeId = useNodeId()

  const currentNodeId = toRef(() => toValue(nodeId) ?? _nodeId)

  const handleType = toRef(() => toValue(type))

  const handleId = toRef(() => toValue(id) ?? null)

  const prevConnections = ref<Map<string, HandleConnection> | null>(null)

  const connections = ref<Map<string, HandleConnection>>()

  watch(
    () => connectionLookup.value.get(`${currentNodeId.value}-${handleType.value}-${handleId.value}`),
    (nextConnections) => {
      if (areConnectionMapsEqual(connections.value, nextConnections)) {
        return
      }

      connections.value = nextConnections
    },
    { immediate: true },
  )

  watch(
    [connections, () => typeof onConnect !== 'undefined', () => typeof onDisconnect !== 'undefined'],
    ([currentConnections = new Map<string, HandleConnection>()]) => {
      if (prevConnections.value && prevConnections.value !== currentConnections) {
        handleConnectionChange(prevConnections.value, currentConnections, onDisconnect)
        handleConnectionChange(currentConnections, prevConnections.value, onConnect)
      }

      prevConnections.value = currentConnections
    },
    { immediate: true },
  )

  return computed(() => {
    if (!connections.value) {
      return []
    }

    return Array.from(connections.value.values())
  })
}
