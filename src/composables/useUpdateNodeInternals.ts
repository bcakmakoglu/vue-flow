import useStore from './useStore'
import { ElementId, UpdateNodeInternals } from '~/types'

export default (store = useStore()): UpdateNodeInternals =>
  (id: ElementId) => {
    const nodeElement: HTMLDivElement | null = document.querySelector(`.vue-flow__node[data-id="${id}"]`)

    if (nodeElement) {
      store.updateNodeDimensions({ id, nodeElement, forceUpdate: true })
    }
  }
