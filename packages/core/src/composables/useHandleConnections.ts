import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'
import type { MaybeRefOrGetter } from '@vueuse/core'
import { toRef, toValue } from '@vueuse/core'
import type { Connection, HandleType } from '../types'
import { areConnectionMapsEqual, handleConnectionChange } from '../utils'
import { useNodeId } from './useNodeId'
import { useVueFlow } from './useVueFlow'

interface UseHandleConnectionsParams {
  type: MaybeRefOrGetter<HandleType>
  id?: MaybeRefOrGetter<string | undefined>
  nodeId?: MaybeRefOrGetter<string | undefined>
  onConnect?: (connections: Connection[]) => void
  onDisconnect?: (connections: Connection[]) => void
}

/**
 * Composable that returns existing connections of a handle
 *
 * @public
 * @param UseHandleConnectionsParams
 * @param UseHandleConnectionsParams.type - handle type `source` or `target`
 * @param UseHandleConnectionsParams.nodeId - node id - if not provided, the node id from the `useNodeId` (meaning, the context-based injection) is used
 * @param UseHandleConnectionsParams.id - the handle id (this is required if the node has multiple handles of the same type)
 * @param UseHandleConnectionsParams.onConnect - gets called when a connection is created
 * @param UseHandleConnectionsParams.onDisconnect - gets called when a connection is removed
 * @returns An array of connections
 */
export function useHandleConnections({
  type,
  id,
  nodeId,
  onConnect,
  onDisconnect,
}: UseHandleConnectionsParams): ComputedRef<Connection[]> {
  const { connectionLookup } = useVueFlow()
  const _nodeId = useNodeId()
  const currentNodeId = toRef(() => toValue(nodeId) || _nodeId)

  const connections = ref<Map<string, Connection>>()

  watch(
    () => connectionLookup.value.get(`${currentNodeId.value}-${toValue(type)}-${toValue(id)}`),
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
    ([currentConnections], [prevConnections]) => {
      if (prevConnections && prevConnections !== currentConnections) {
        const _connections = currentConnections ?? new Map()
        handleConnectionChange(prevConnections, _connections, onDisconnect)
        handleConnectionChange(_connections, prevConnections, onConnect)
      }
    },
    { immediate: true },
  )

  return computed(() => Array.from(connections.value?.values() ?? []))
}
