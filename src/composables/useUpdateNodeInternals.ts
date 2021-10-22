import { ElementId, UpdateNodeInternals } from '../types'
import useStore from './useStore'

export default (store = useStore()): UpdateNodeInternals =>
  (id: ElementId) => {
    const nodeElement: HTMLDivElement | null = document.querySelector(`.vue-flow__node[data-id="${id}"]`)

    if (nodeElement) {
      store.updateNodeDimensions({ id, nodeElement, forceUpdate: true })
    }
  }
