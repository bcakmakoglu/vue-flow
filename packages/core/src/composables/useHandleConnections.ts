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
  id?: MaybeRefOrGetter<string | null>
  nodeId?: MaybeRefOrGetter<string>
  onConnect?: (connections: Connection[]) => void
  onDisconnect?: (connections: Connection[]) => void
}

/**
 * Hook to check if a <Handle /> is connected to another <Handle /> and get the connections.
 *
 * @public
 * @param param.type - handle type 'source' or 'target'
 * @param param.nodeId - node id - if not provided, the node id from the NodeIdContext is used
 * @param param.id - the handle id (this is only needed if the node has multiple handles of the same type)
 * @param param.onConnect - gets called when a connection is established
 * @param param.onDisconnect - gets called when a connection is removed
 * @returns an array with connections
 */
export function useHandleConnections({
  type,
  id = null,
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
