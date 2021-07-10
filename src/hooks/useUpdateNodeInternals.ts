import { ElementId, UpdateNodeInternals } from '../types';
import store from '../store';

function useUpdateNodeInternals(): UpdateNodeInternals {
  const pinia = store();

  return (id: ElementId) => {
    const nodeElement: HTMLDivElement | null = document.querySelector(`.revue-flow__node[data-id="${id}"]`);

    if (nodeElement) {
      pinia.updateNodeDimensions([{ id, nodeElement, forceUpdate: true }]);
    }
  };
}

export default useUpdateNodeInternals;
