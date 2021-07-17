import useKeyPress from './useKeyPress';
import { isNode, getConnectedEdges } from '../utils/graph';
import { Elements, KeyCode, ElementId, FlowElement, RevueFlowStore, Edge } from '../types';
import { computed, inject, watch } from 'vue';

interface HookParams {
  deleteKeyCode: KeyCode;
  multiSelectionKeyCode: KeyCode;
  onElementsRemove?: (elements: Elements) => void;
}

export default ({ deleteKeyCode, multiSelectionKeyCode, onElementsRemove }: HookParams): void => {
  const store = inject<RevueFlowStore>('store');

  const deleteKeyPressed = useKeyPress(deleteKeyCode);
  const multiSelectionKeyPressed = useKeyPress(multiSelectionKeyCode);
  const selectedElements = computed(() => store?.selectedElements || []);
  const edges = computed(() => store?.edges);

  watch(selectedElements, () => {
    if (onElementsRemove && deleteKeyPressed.value && selectedElements.value.length > 0) {
      const selectedNodes = selectedElements.value.filter(isNode);
      const connectedEdges = getConnectedEdges(selectedNodes, edges.value as Edge[]);
      const elementsToRemove = [...selectedElements.value, ...connectedEdges].reduce(
        (res, item) => res.set(item.id, item),
        new Map<ElementId, FlowElement>()
      );

      onElementsRemove(Array.from(elementsToRemove.values()));
      store?.unsetNodesSelection();
      store?.resetSelectedElements();
    }
  });

  watch(multiSelectionKeyPressed, () => {
    store?.setMultiSelectionActive(multiSelectionKeyPressed.value);
  });
};
