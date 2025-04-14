import type { MaybeRefOrGetter } from 'vue'
import { computed, ref, toValue, watch } from 'vue'
import type { HandleType, NodeConnection } from '../types'
import { areConnectionMapsEqual, handleConnectionChange } from '../utils'
import { useNodeId } from './useNodeId'
import { useVueFlow } from './useVueFlow'

export interface UseNodeConnectionsParams {
  handleType?: MaybeRefOrGetter<HandleType | null | undefined>
  handleId?: MaybeRefOrGetter<string | null | undefined>
  nodeId?: MaybeRefOrGetter<string | null | undefined>
  onConnect?: (connections: NodeConnection[]) => void
  onDisconnect?: (connections: NodeConnection[]) => void
}

/**
 * Hook to retrieve all edges connected to a node. Can be filtered by handle type and id.
 *
 * @public
 * @param params
 * @param params.handleType - handle type `source` or `target`
 * @param params.nodeId - node id - if not provided, the node id from the `useNodeId` (meaning, the context-based injection) is used
 * @param params.handleId - the handle id (this is required if the node has multiple handles of the same type)
 * @param params.onConnect - gets called when a connection is created
 * @param params.onDisconnect - gets called when a connection is removed
 *
 * @returns An array of connections
 */
export function useNodeConnections(params: UseNodeConnectionsParams = {}) {
  const { handleType, handleId, nodeId, onConnect, onDisconnect } = params

  const { connectionLookup } = useVueFlow()

  const _nodeId = useNodeId()

  const prevConnections = ref<Map<string, NodeConnection> | null>(null)

  const connections = ref<Map<string, NodeConnection>>()

  const lookupKey = computed(() => {
    const currNodeId = toValue(nodeId) ?? _nodeId
    const currentHandleType = toValue(handleType)
    const currHandleId = toValue(handleId)

    let handleSuffix = ''
    if (currentHandleType) {
      handleSuffix = currHandleId ? `-${currentHandleType}-${currHandleId}` : `-${currentHandleType}`
    }

    return `${currNodeId}${handleSuffix}`
  })

  watch(
    () => connectionLookup.value.get(lookupKey.value),
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
    ([currentConnections = new Map<string, NodeConnection>()]) => {
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
