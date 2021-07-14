import useKeyPress from './useKeyPress';
import { isNode, getConnectedEdges } from '../utils/graph';
import { Elements, KeyCode, ElementId, FlowElement, RevueFlowStore } from '../types';
import { inject, onMounted } from 'vue';

interface HookParams {
  deleteKeyCode: KeyCode;
  multiSelectionKeyCode: KeyCode;
  onElementsRemove?: (elements: Elements) => void;
}

export default ({ deleteKeyCode, multiSelectionKeyCode, onElementsRemove }: HookParams): void => {
  const store = inject<RevueFlowStore>('store');

  const deleteKeyPressed = useKeyPress(deleteKeyCode);
  const multiSelectionKeyPressed = useKeyPress(multiSelectionKeyCode);

  onMounted(() => {
    if (onElementsRemove && deleteKeyPressed.value && store?.selectedElements) {
      const selectedNodes = store?.selectedElements.filter(isNode);
      const connectedEdges = getConnectedEdges(selectedNodes, store?.edges);
      const elementsToRemove = [...store?.selectedElements, ...connectedEdges].reduce(
        (res, item) => res.set(item.id, item),
        new Map<ElementId, FlowElement>()
      );

      onElementsRemove(Array.from(elementsToRemove.values()));
      store?.unsetNodesSelection();
      store?.resetSelectedElements();
    }
  });

  onMounted(() => {
    store?.setMultiSelectionActive(multiSelectionKeyPressed.value);
  });
};
