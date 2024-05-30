import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, ref, toRef, toValue, watch } from 'vue'
import type { Connection, HandleType } from '../types'
import { areConnectionMapsEqual, handleConnectionChange } from '../utils'
import { useNodeId } from './useNodeId'
import { useVueFlow } from './useVueFlow'

export interface UseHandleConnectionsParams {
  type: MaybeRefOrGetter<HandleType>
  id?: MaybeRefOrGetter<string | null>
  nodeId?: MaybeRefOrGetter<string | null>
  onConnect?: (connections: Connection[]) => void
  onDisconnect?: (connections: Connection[]) => void
}

// todo: add edge id to connection params

/**
 * Composable that returns existing connections of a handle
 *
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
export function useHandleConnections(params: UseHandleConnectionsParams): ComputedRef<Connection[]> {
  const { type, id, nodeId, onConnect, onDisconnect } = params

  const { connectionLookup } = useVueFlow()

  const _nodeId = useNodeId()

  const currentNodeId = toRef(() => toValue(nodeId) ?? _nodeId)

  const handleType = toRef(() => toValue(type))

  const handleId = toRef(() => toValue(id) ?? null)

  const prevConnections = ref<Map<string, Connection> | null>(null)

  const connections = ref<Map<string, Connection>>()

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
    ([currentConnections]) => {
      if (prevConnections.value && prevConnections.value !== currentConnections) {
        const _connections = currentConnections ?? new Map()
        handleConnectionChange(prevConnections.value, _connections, onDisconnect)
        handleConnectionChange(_connections, prevConnections.value, onConnect)
      }

      prevConnections.value = currentConnections ?? new Map()
    },
    { immediate: true },
  )

  return computed(() => Array.from(connections.value?.values() ?? []))
}
