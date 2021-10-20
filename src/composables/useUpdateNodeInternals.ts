import { ElementId, UpdateNodeInternals } from '~/types'
import useStore from '~/composables/useStore'

export default (): UpdateNodeInternals => {
  const store = useStore()

  return (id: ElementId) => {
    const nodeElement: HTMLDivElement | null = document.querySelector(`.vue-flow__node[data-id="${id}"]`)

    if (nodeElement) {
      store.updateNodeDimensions([{ id, nodeElement, forceUpdate: true }])
    }
  }
}
