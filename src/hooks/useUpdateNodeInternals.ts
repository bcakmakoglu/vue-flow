import { ElementId, RevueFlowStore, UpdateNodeInternals } from '../types'
import { inject } from 'vue'

function useUpdateNodeInternals(): UpdateNodeInternals {
  const store = inject<RevueFlowStore>('store')!

  return (id: ElementId) => {
    const nodeElement: HTMLDivElement | null = document.querySelector(`.revue-flow__node[data-id="${id}"]`)

    if (nodeElement) {
      store.updateNodeDimensions([{ id, nodeElement, forceUpdate: true }])
    }
  }
}

export default useUpdateNodeInternals
