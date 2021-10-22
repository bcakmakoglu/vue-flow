import { ElementId, FlowStore, UpdateNodeInternals } from '~/types'

export default (store: FlowStore): UpdateNodeInternals =>
  (id: ElementId) => {
    const nodeElement: HTMLDivElement | null = document.querySelector(`.vue-flow__node[data-id="${id}"]`)

    if (nodeElement) {
      store.updateNodeDimensions({ id, nodeElement, forceUpdate: true })
    }
  }
