import type { Ref } from 'vue';
import type { Actions, GraphNode } from '../types';
import { nextTick } from 'vue';

export function handleNodeClick(
  node: GraphNode,
  multiSelectionActive: boolean,
  addSelectedNodes: Actions['addSelectedNodes'],
  removeSelectedNodes: Actions['removeSelectedNodes'],
  nodesSelectionActive: Ref<boolean>,
  unselect = false,
  nodeEl: HTMLDivElement,
) {
  nodesSelectionActive.value = false;

  if (!node.selected) {
    addSelectedNodes([node]);
  }
  else if (unselect || (node.selected && multiSelectionActive)) {
    removeSelectedNodes([node]);

    nextTick(() => {
      nodeEl.blur();
    });
  }
}
