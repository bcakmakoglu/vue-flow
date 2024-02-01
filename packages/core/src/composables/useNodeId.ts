import { inject } from 'vue'
import { NodeId } from '../context'

export function useNodeId() {
  return inject(NodeId, null)
}
