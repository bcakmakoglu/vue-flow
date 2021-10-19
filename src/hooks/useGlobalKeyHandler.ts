import useKeyPress from './useKeyPress'
import { isNode, getConnectedEdges } from '~/utils/graph'
import { Elements, KeyCode, ElementId, FlowElement } from '~/types'
import { Store } from '~/context/symbols'

interface HookParams {
  deleteKeyCode: KeyCode
  multiSelectionKeyCode: KeyCode
  onElementsRemove?: (elements: Elements) => void
}

export default ({ deleteKeyCode, multiSelectionKeyCode, onElementsRemove = () => {} }: HookParams): void => {
  const store = inject(Store)!

  useKeyPress(deleteKeyCode, (keyPressed) => {
    if (keyPressed && store.selectedElements) {
      const selectedNodes = store.selectedElements.filter(isNode)
      const connectedEdges = getConnectedEdges(selectedNodes, store.edges)
      const elementsToRemove = [...store.selectedElements, ...connectedEdges].reduce(
        (res, item) => res.set(item.id, item),
        new Map<ElementId, FlowElement>(),
      )

      onElementsRemove(Array.from(elementsToRemove.values()))
      store.unsetNodesSelection()
      store.resetSelectedElements()
    }
  })

  useKeyPress(multiSelectionKeyCode, (keyPressed) => (store.multiSelectionActive = keyPressed))
}
