import { inject } from 'vue'
import { NodeId } from '../context'

export function useNodeId() {
  const nodeId = inject(NodeId, null)

  if (!nodeId) {
    // todo: emit error through hook
    throw new Error('useNodeId must be called inside a Node component')
  }

  return nodeId
}
