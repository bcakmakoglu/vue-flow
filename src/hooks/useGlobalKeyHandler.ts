import useKeyPress from './useKeyPress';
import { isNode, getConnectedEdges } from '../utils/graph';
import { Elements, KeyCode, ElementId, FlowElement } from '../types';
import store from '../store';
import { onMounted } from 'vue';

interface HookParams {
  deleteKeyCode: KeyCode;
  multiSelectionKeyCode: KeyCode;
  onElementsRemove?: (elements: Elements) => void;
}

export default ({ deleteKeyCode, multiSelectionKeyCode, onElementsRemove }: HookParams): void => {
  const pinia = store();

  const deleteKeyPressed = useKeyPress(deleteKeyCode);
  const multiSelectionKeyPressed = useKeyPress(multiSelectionKeyCode);

  onMounted(() => {
    const { edges, selectedElements } = pinia;

    if (onElementsRemove && deleteKeyPressed && selectedElements) {
      const selectedNodes = selectedElements.filter(isNode);
      const connectedEdges = getConnectedEdges(selectedNodes, edges);
      const elementsToRemove = [...selectedElements, ...connectedEdges].reduce(
        (res, item) => res.set(item.id, item),
        new Map<ElementId, FlowElement>()
      );

      onElementsRemove(Array.from(elementsToRemove.values()));
      pinia.unsetNodesSelection();
      pinia.resetSelectedElements();
    }
  });

  onMounted(() => {
    pinia.setMultiSelectionActive(multiSelectionKeyPressed);
  });
};
