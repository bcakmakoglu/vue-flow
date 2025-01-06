import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, ref, toRef, toValue, watch } from 'vue'
import type { HandleConnection, HandleElement, HandleType } from '../types'
import { useNodeId } from './useNodeId'
import { useVueFlow } from './useVueFlow'

export interface UseNodeConnectionsParams {
  type: MaybeRefOrGetter<HandleType>
  nodeId?: MaybeRefOrGetter<string | null>
  onConnect?: (connections: HandleConnection[]) => void
  onDisconnect?: (connections: HandleConnection[]) => void
}

/**
 * Composable that returns existing connections of a node by handle type.
 * This is useful when you want to get all connections of a node by a specific handle type.
 *
 * @public
 * @param params
 * @param params.type - handle type `source` or `target`
 * @param params.nodeId - node id - if not provided, the node id from the `useNodeId` (meaning, the context-based injection) is used
 * @param params.onConnect - gets called when a connection is created
 * @param params.onDisconnect - gets called when a connection is removed
 *
 * @returns An array of connections
 */
export function useNodeConnections(params: UseNodeConnectionsParams): ComputedRef<HandleConnection[]> {
  const { type, nodeId, onConnect, onDisconnect } = params

  const { connectionLookup, findNode } = useVueFlow()

  const _nodeId = useNodeId()

  const currentNodeId = toRef(() => toValue(nodeId) ?? _nodeId)

  const handleType = toRef(() => toValue(type))

  const node = computed(() => findNode(currentNodeId.value))

  const handleIds = computed(() => {
    if (!node.value) {
      return []
    }

    const handles: HandleElement['id'][] = []
    for (const handle of node.value?.handleBounds?.[handleType.value] ?? []) {
      handles.push(handle.id)
    }

    return handles
  })

  const prevConnections = ref<Map<string, HandleConnection> | null>(null)

  const connectionsFromLookup = computed(() => {
    const nodeConnections = [] as Map<string, HandleConnection>[]

    for (const handleId of handleIds.value) {
      const connectionMap = connectionLookup.value.get(`${currentNodeId.value}-${handleType.value}-${handleId}`)
      if (connectionMap) {
        nodeConnections.push(connectionMap)
      }
    }

    return nodeConnections
  })

  watch(
    [connectionsFromLookup, () => typeof onConnect !== 'undefined', () => typeof onDisconnect !== 'undefined'],
    ([currentConnections]) => {
      if (!currentConnections) {
        return
      }

      const newConnections = new Map<string, HandleConnection>()

      for (const connectionMap of currentConnections) {
        for (const [key, connection] of connectionMap) {
          newConnections.set(key, connection)
        }
      }

      if (!prevConnections.value) {
        prevConnections.value = new Map(newConnections)
        return
      }

      const prevConnectionsValue = prevConnections.value

      const addedConnections = Array.from(newConnections.keys()).filter((key) => !prevConnectionsValue.has(key))

      const removedConnections = Array.from(prevConnectionsValue.keys()).filter((key) => !newConnections.has(key))

      if (addedConnections.length && onConnect) {
        const added = addedConnections.map((key) => newConnections.get(key)!)
        onConnect(added)
      }

      if (removedConnections.length && onDisconnect) {
        const removed = removedConnections.map((key) => prevConnectionsValue.get(key)!)
        onDisconnect(removed)
      }

      prevConnections.value = new Map(newConnections)
    },
    { immediate: true },
  )

  return computed(() => {
    const connections = [] as HandleConnection[]

    for (const connectionMap of connectionsFromLookup.value) {
      for (const connection of connectionMap.values()) {
        connections.push(connection)
      }
    }

    return connections
  })
}
