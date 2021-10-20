import { ElementId, UpdateNodeInternals } from '~/types'
import { Store } from '~/context'

export default function (): UpdateNodeInternals {
  const store = inject(Store)!

  return (id: ElementId) => {
    const nodeElement: HTMLDivElement | null = document.querySelector(`.revue-flow__node[data-id="${id}"]`)

    if (nodeElement) {
      store.updateNodeDimensions([{ id, nodeElement, forceUpdate: true }])
    }
  }
}
