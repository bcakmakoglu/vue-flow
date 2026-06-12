import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { ConnectionState, GraphNode, Node } from '../types'
import { useVueFlow } from './useVueFlow'

const NO_CONNECTION = {
  inProgress: false,
  isValid: null,
  from: null,
  fromHandle: null,
  fromPosition: null,
  fromNode: null,
  to: null,
  toHandle: null,
  toPosition: null,
  toNode: null,
  pointer: null,
} as const

/**
 * Access the currently ongoing connection, composed from the store's split connection fields into a
 * single {@link ConnectionState}.
 *
 * @public
 * @returns a `ComputedRef<ConnectionState>` — `inProgress: false` (all-null fields) when idle
 */
export function useConnection<NodeType extends Node = Node>(): ComputedRef<ConnectionState<NodeType>> {
  const { connectionStartHandle, connectionEndHandle, connectionPosition, connectionStatus, getInternalNode } = useVueFlow()

  return computed<ConnectionState<NodeType>>(() => {
    const fromHandle = connectionStartHandle.value
    const fromNode = fromHandle ? getInternalNode(fromHandle.nodeId) : undefined

    // no connection (or its source node vanished) → the resting state
    if (!fromHandle || !fromNode) {
      return NO_CONNECTION
    }

    const toHandle = connectionEndHandle.value
    const to = connectionPosition.value

    return {
      inProgress: true,
      isValid: connectionStatus.value === null ? null : connectionStatus.value === 'valid',
      from: { x: fromHandle.x, y: fromHandle.y },
      fromHandle,
      fromPosition: fromHandle.position,
      fromNode: fromNode as GraphNode<NodeType>,
      to,
      toHandle: toHandle ?? null,
      toPosition: toHandle?.position ?? null,
      toNode: ((toHandle ? getInternalNode(toHandle.nodeId) : undefined) ?? null) as GraphNode<NodeType> | null,
      pointer: to,
    }
  })
}
